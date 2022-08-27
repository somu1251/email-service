import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { AppService } from 'src/app.service';

@Processor('email-queue')
export class EmailConsumer {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(EmailConsumer.name);

  @Process('email-queue')
  readOperationJob(job: Job<unknown>) {
    this.logger.log(`job id: ${job.id}`);
    this.appService.sendEmail(job.data);
  }
}
