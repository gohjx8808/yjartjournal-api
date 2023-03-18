import { MailDataRequired } from '@sendgrid/mail';
import { randomBytes } from 'crypto';
import Users from '../../entities/Users';
import { sendEmail } from '../../mail/sgMail';
import {
  getResetPasswordEntryByToken,
  insertNewResetPasswordToken,
  updateResetPasswordTokenUsage,
} from '../../repositories/forgotPasswordRepository';
import { getUserByEmail } from '../../repositories/userRepository';
import { updateUserPassword } from '../user/userServices';
import { ResetPasswordPayload } from './typings';

const insertForgotPasswordToken = async (user: Users) => {
  const token = randomBytes(16).toString('hex');

  const result = await insertNewResetPasswordToken(user, token);

  return result;
};

const sendForgotPasswordEmail = async (
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

export const performForgotPasswordOperation = async (email: string) => {
  const userDetails = await getUserByEmail(email);
  const tokenDetails = await insertForgotPasswordToken(userDetails);

  const resetPasswordLink = `${process.env.YJARTJOURNAL_LINK}/${tokenDetails.token}`;

  await sendForgotPasswordEmail(
    email,
    userDetails.preferredName || userDetails.name,
    resetPasswordLink,
    tokenDetails.expiredAt.toLocaleDateString('en-GB'),
  );
};

export const resetUserPassword = async (payload: ResetPasswordPayload) => {
  const tokenDetails = await getResetPasswordEntryByToken(payload.token);

  await updateUserPassword(tokenDetails.user.id, payload.password);

  await updateResetPasswordTokenUsage(payload.token);
};
