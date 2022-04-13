import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      autoSchemaFile: join(process.cwd(), 'src/schema/schema.gql'),
      sortSchema: true,
      path: 'graphql',
    }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   debug: false,
    //   autoSchemaFile: join(process.cwd(), 'src/schema/users.gql'),
    //   sortSchema: true,
    //   path: 'graphql_users',
    //   include: [UsersModule],
    // }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   debug: false,
    //   autoSchemaFile: join(process.cwd(), 'src/schema/posts.gql'),
    //   sortSchema: true,
    //   path: 'graphql_posts',
    //   include: [PostsModule],
    // }),
    UsersModule,
    PostsModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
