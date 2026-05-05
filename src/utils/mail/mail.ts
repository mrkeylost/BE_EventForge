import path from "path";
import nodemailer from "nodemailer";
import ejs from "ejs";
import { env } from "../env";

export interface IsendMail {
  from: string;
  to: string;
  subject: string;
  content: string;
}

const transporter = nodemailer.createTransport({
  service: env.EMAIL_SMTP_SERVICE_NAME,
  host: env.EMAIL_SMTP_HOST,
  port: env.EMAIL_SMTP_PORT,
  auth: {
    user: env.EMAIL_SMTP_USER,
    pass: env.EMAIL_SMTP_PASSWORD,
  },
  requireTLS: true,
});

export const sendMail = async ({ from, to, subject, content }: IsendMail) => {
  const res = await transporter.sendMail({
    from,
    to,
    subject,
    html: content,
  });

  return res;
};

export const renderMailHtml = async (
  template: string,
  data: any,
): Promise<string> => {
  const content = (await ejs.renderFile(
    path.join(__dirname, `template/${template}`),
    data,
  )) as string;

  return content;
};
