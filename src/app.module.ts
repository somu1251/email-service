import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailProducer } from './email-processor/email-producer';
import { EmailConsumer } from './email-processor/email-consumer';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          transport: {
            host: configService.get('SMTP_HOST'),
            port: configService.get('SMTP_PORT'),
            secure: false,
            auth: {
              user: configService.get('SENDER_USERNAME'),
              pass: configService.get('SENDER_PASSWORD'),
            },
            tls: {
              rejectUnauthorized: false,
            },
          },
          defaults: {
            from: configService.get('SENDER'),
          },
        };
      },
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('QUEUE_HOST'),
          port: configService.get('QUEUE_PORT'),
        },
        defaultJobOptions: {
          attempts: 3,
          removeOnComplete: true,
          removeOnFail: true,
        },
      }),
    }),
    BullModule.registerQueue({
      name: 'email-queue',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, EmailProducer, EmailConsumer],
})
export class AppModule {}
