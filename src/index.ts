import { Post } from './entities/Post';
import { __prod__ } from './constant';
import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from './mikro-orm.config';

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);

  orm.getMigrator().up();
  // const post = orm.em.create(Post, { title: 'my first post' });
  // await orm.em.persistAndFlush(post);

  const post = await orm.em.find(Post, {});
  console.log(post);
};

main().catch(err => {
  console.error(err);
});
