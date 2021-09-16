import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  async findAll() {
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
