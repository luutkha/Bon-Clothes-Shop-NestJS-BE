import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendMailsService {
  constructor(private mailerService: MailerService) {}

  async sendMail(email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Chúng tôi đang thử máy !',
      text: 'ê có mail này a zai!',
    });
    return 'Gửi mail oke rồi đó!';
  }
}
