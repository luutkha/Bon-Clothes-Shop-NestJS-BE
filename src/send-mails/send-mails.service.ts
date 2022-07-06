import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { EmailEnum } from 'src/common/enum&constants/EmailEnum';

@Injectable()
export class SendMailsService {
  private readonly logger = new Logger(SendMailsService.name);

  constructor(private mailerService: MailerService) {}

  async sendMail(email: string) {
    await this.mailerService.sendMail({
      to: 'luutkha@gmail.com',
      subject: 'Chúng tôi đang thử máy !',
      text: 'ê có mail này a zai!',
    });
    return 'Gửi mail oke rồi đó!';
  }

  //TODO
  async sendMailWithOTP(email: string, otp: string, type: number) {
    try {
      this.logger.log(`Start send mail to ${email}`);
      switch (type) {
        case 1:
          await this.mailerService.sendMail({
            to: email,
            subject: EmailEnum.REGISTER_OTP_TITLE,
            text: `${EmailEnum.REGISTER_OTP_CONTENT} ${otp}`,
          });

          break;

        default:
          this.logger.log(`type = ${type} is not exists on design system!`);

          return false;
      }
    } catch (error) {
      this.logger.log(`Send mail to ${email} have error!`);
      return false;
    }

    this.logger.log(`Send mail to ${email} complete!`);
    return true;
  }
}
