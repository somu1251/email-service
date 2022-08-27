import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { ISendMailOptions } from '@nestjs-modules/mailer';
import { AppService } from './app.service';
import { EmailPayload } from './schema';
import { EmailProducer } from './email-processor/email-producer';
const email = 'email';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly emailProducer: EmailProducer,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiTags('email')
  @Post('/sendemail')
  @ApiBody({
    required: true,
    schema: EmailPayload,
  })
  getInvokeMsg(@Body() emailContent: ISendMailOptions) {
    this.emailProducer.sendmail(emailContent);
    return 'processing sending an email request successfully ';
  }
}
