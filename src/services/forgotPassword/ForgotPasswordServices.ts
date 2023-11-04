import { MailDataRequired } from '@sendgrid/mail';
import { randomBytes } from 'crypto';
import Users from '../../entities/Users';
import { sendEmail } from '../../mail/sgMail';
import UserRepository from '../../repositories/UserRepository';
import {
  getResetPasswordEntryByToken,
  insertNewResetPasswordToken,
  updateResetPasswordTokenUsage,
} from '../../repositories/forgotPasswordRepository';
import UserServices from '../user/UserServices';
import { ResetPasswordPayload } from './typings';

export default class ForgotPasswordServices {
  private userRepository = new UserRepository();

  private userServices = new UserServices();

  private insertForgotPasswordToken = async (user: Users) => {
    const token = randomBytes(16).toString('hex');

    const result = await insertNewResetPasswordToken(user, token);

    return result;
  };

  private sendForgotPasswordEmail = async (
    email: string,
    name: string,
    resetPasswordLink: string,
    expiredAt: string,
  ) => {
    const emailMsg: MailDataRequired = {
      personalizations: [{ to: [{ email }] }],
      from: { email: 'yj.artjournal@gmail.com', name: 'YJ Art Journal' },
      templateId: 'd-76de8ebd97e34a549b7cdf1e0f259481',
      dynamicTemplateData: {
        name,
        expiredAt,
        resetPasswordLink,
      },
    };

    await sendEmail(emailMsg);
  };

  performForgotPasswordOperation = async (email: string) => {
    const userDetails = await this.userRepository.getUserByEmail(email);
    const tokenDetails = await this.insertForgotPasswordToken(userDetails);

    const resetPasswordLink = `${process.env.YJARTJOURNAL_LINK}/${tokenDetails.token}`;

    await this.sendForgotPasswordEmail(
      email,
      userDetails.preferredName || userDetails.name,
      resetPasswordLink,
      tokenDetails.expiredAt.toLocaleDateString('en-GB'),
    );
  };

  resetUserPassword = async (payload: ResetPasswordPayload) => {
    const tokenDetails = await getResetPasswordEntryByToken(payload.token);

    await this.userServices.updateUserPassword(
      tokenDetails.user.id,
      payload.password,
    );

    await updateResetPasswordTokenUsage(payload.token);
  };
}
