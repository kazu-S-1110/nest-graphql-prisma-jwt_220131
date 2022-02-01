import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as bcript from "bcrypt"
import { CreateOneUserArgs } from 'src/@generated/prisma-nestjs-graphql/user/create-one-user.args'
import { FindFirstUserArgs } from 'src/@generated/prisma-nestjs-graphql/user/find-first-user.args'
import { User } from 'src/@generated/prisma-nestjs-graphql/user/user.model'
import { UsersService } from './users.service'


@Resolver( ( )=> User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => User)
  user(
    @Args() args: FindFirstUserArgs
  ) {
    return this.userService.findFirst(args)
  }

  @Mutation(()=> User )
  async createUser(
    @Args() args: CreateOneUserArgs
  ) {
    args.data.password = await bcript.hash(args.data.password, 10)
    return this.userService.createUser(args)
  }

}
