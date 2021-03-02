import 'reflect-metadata';
import { PostResolver } from './resolvers/post';
import { HelloResolver } from './resolvers/hello';
import { __prod__, PORT, COOKIE_NAME } from './constant';
import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/user';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { MyContext } from './types';
import cors from 'cors';

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000',
    })
  );
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      secret: 'a very secreto',
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days,
        httpOnly: true,
        secure: __prod__,
        sameSite: 'lax',
      },
      resave: false,
      saveUninitialized: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res, redis }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(PORT, () => {
    console.log(`server is running 🚀 on localhost:${PORT}`);
  });
};

main().catch(err => {
  console.error(err);
});
