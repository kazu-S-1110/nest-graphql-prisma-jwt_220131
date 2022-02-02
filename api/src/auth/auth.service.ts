import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/@generated/prisma-nestjs-graphql/user/user.model'
import * as bcript from "bcrypt"
import { UsersService } from 'src/users/users.service'
import { LoginResponse } from './dto/login-response'


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ){}

  async valitedateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findUnique({ where: { email: email } })
    
    if (user && bcript.compareSync(password, user.password)) {
      return user
    }
    return null
  }

  async login(user: User): Promise<LoginResponse>{
    const payload = { email: user.email, sub: user.id }
    
    return {
      access_token: this.jwtService.sign(payload),
      user:user
    }
  }
}
