import { Post } from './entities/Post';
import { __prod__ } from './constant';
import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from './mikro-orm.config';

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);

  orm.em.create(Post, { title: 'my first post' });
  orm.em.persistAndFlush(Post);
  console.log('---sql 2---');
  orm.em.nativeInsert(Post, { title: 'another first post' });
};

main().catch(err => {
  console.error(err);
});
