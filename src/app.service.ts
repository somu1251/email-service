import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { MailerService, ISendMailOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(AppService.name);
  getHello(): string {
    return 'Hello World!';
  }

  async sendEmail(payload: ISendMailOptions): Promise<any> {
    try {
      this.logger.log('EMAIL: sending mail');
      payload.from = this.configService.get('SENDER');
      return await this.mailerService.sendMail(payload);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
