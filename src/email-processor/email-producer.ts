import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { ISendMailOptions } from '@nestjs-modules/mailer';

@Injectable()
export class EmailProducer {
  constructor(@InjectQueue('email-queue') private emailQueue: Queue) {}

  async sendmail(payload: ISendMailOptions) {
    await this.emailQueue.add('email-queue', payload);
  }
}
