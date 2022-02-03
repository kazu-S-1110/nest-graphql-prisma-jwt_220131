import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service'
import { LoginResponse } from './dto/login-response'
import { LoginUserInput } from './dto/login-user.input'
import { GqlAuthGuard } from './guards/gql-auth.guard'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }
  
  @Mutation(()=> LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(
    @Args("loginUserInput") LoginUserInput: LoginUserInput,
    @Context() context
  ) {
    return this.authService.login(context.user)
  }
}
