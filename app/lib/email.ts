import { profile } from "console";
import nodemailer from "nodemailer";
import { MailtrapClient } from "mailtrap";

type profile = { name: string; email: string };

interface CustomMailtrapClientConfig {
  token: string;
  endpoint?: string;
}
const client = new MailtrapClient({
  endpoint: process.env.MAILTRAP_ENDPOINT,
  token: process.env.MAILTRAP_TOKEN,
} as CustomMailtrapClientConfig);

const sender = {
  email: "verification@nextecommportfoliokaanarslan.xyz",
  name: "Next E-comm Verification",
};

interface EmailOptions {
  profile: profile;
  subject: "verification" | "forget-password" | "password-changed";
  linkUrl?: string;
}

const generateMailTransporter = () => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_AUTH_USER,
      pass: process.env.MAILTRAP_AUTH_PASS,
    },
  });
  return transport;
};
const sendEmailVerificationLink = async (profile: profile, linkUrl: string) => {
  /*   const transport = generateMailTransporter();
  await transport.sendMail({
    from: "verification@nextecom.com",
    to: profile.email,
    html: `<h1> Please verify your email by clicking on <a href=${linkUrl}>this link</a> </h1>`,
  }); */
  const recipients = [
    {
      email: profile.email,
    },
  ];

  await client.send({
    from: sender,
    to: recipients,
    subject: "Verify your email!",
    text: `<h1> Please verify your email by clicking on <a href=${linkUrl}>this link</a> </h1>`,
    category: "Email Verification",
  });
};
const sendForgetPasswordLink = async (profile: profile, linkUrl: string) => {
  /*   const transport = generateMailTransporter();

  await transport.sendMail({
    from: "verification@nextecom.com",
    to: profile.email,
    html: `<h1>Please verify your email by clicking on <a href=${linkUrl}>this link</a> </h1>`,
  }); */
  const recipients = [
    {
      email: profile.email,
    },
  ];

  await client.send({
    from: sender,
    to: recipients,
    subject: "Forget Password Link",
    text: `<h1> Click on <a href=${linkUrl}>this link</a> to reset your password </h1>`,
    category: "Forget Password Link",
  });
};
const sendUpdatePasswordConfirmation = async (profile: profile) => {
  /*   const transport = generateMailTransporter();

  await transport.sendMail({
    from: "verification@nextecom.com",
    to: profile.email,
    html: `<h1>Your password is now changed <a href=${process.env.SIGN_IN_URL}>click here </a>to sign in</h1>`,
  }); */
  const recipients = [
    {
      email: profile.email,
    },
  ];

  await client.send({
    from: sender,
    to: recipients,
    subject: "Password Reset",
    text: `<h1>Your password is now changed <a href=${process.env.SIGN_IN_URL}>click here </a>to sign in</h1>`,
    category: "Password Reset",
  });
};
export const sendEmail = (options: EmailOptions) => {
  const { profile, subject, linkUrl } = options;
  switch (subject) {
    case "verification":
      return sendEmailVerificationLink(profile, linkUrl!);
    case "forget-password":
      return sendForgetPasswordLink(profile, linkUrl!);
    case "password-changed":
      return sendUpdatePasswordConfirmation(profile);
  }
};
