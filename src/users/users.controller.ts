// src/user/user.controller.ts

import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Patch,
  Get,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService, private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return { message: 'User registered successfully' };
  }

  @Post('login')
  @ApiOperation({ summary: 'Authenticate a user and return a JWT token' })
  async login(@Body() loginUserDto: LoginUserDto) {
    const token = await this.authService.login(loginUserDto);
    return { accessToken: token };
  }

  @Patch('change-password')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Change password for authenticated user' })
  async changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
    await this.userService.changePassword(req.user.userId, changePasswordDto);
    return { message: 'Password changed successfully' };
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Initiate password reset process' })
  async forgotPassword(@Body('email') email: string) {
    await this.userService.initiatePasswordReset(email);
    return { message: 'Password reset email sent' };
  }

  @Patch('reset-password')
  @ApiOperation({ summary: 'Reset password using verification code' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.userService.resetPassword(resetPasswordDto);
    return { message: 'Password reset successfully' };
  }
}
