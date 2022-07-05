import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

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
  async sendMailWithOTP(email: string, otp: string) {
    this.logger.log(`Start send mail to ${email}`);

    await this.mailerService.sendMail({
      to: 'luutkha@gmail.com',
      subject: 'Xác nhận đăng ký tai khoản !',
      text: `OTP xác nhận của bạn là: ${otp}`,
    });

    this.logger.log(`Send mail to ${email} complete!`);
    return 'Gửi mail oke rồi đó!';
  }
}
