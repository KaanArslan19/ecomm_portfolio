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
    template_uuid: "780aa589-019f-452d-964b-86d40602bf23",
    template_variables: {
      subject: "Verify your email!",
      username: profile.name,
      company_name: "Next Ecomm by Kaan Arslan",
      link: linkUrl,
      btn_title: "Click to Verify Your Email",
    },
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
    template_uuid: "780aa589-019f-452d-964b-86d40602bf23",
    template_variables: {
      subject: "Forget Password Link",
      username: profile.name,
      company_name: "Next Ecomm by Kaan Arslan",
      link: linkUrl,
      btn_title: "Click to Reset your password",
    },
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
    text: `<h1>Your password is now changed <a href=${process.env.SIGN_IN_URL}>click here </a>to sign in</h1>`,
    category: "Password Reset",
    template_uuid: "780aa589-019f-452d-964b-86d40602bf23",
    template_variables: {
      subject: "Password Reset Successful",
      username: profile.name,
      company_name: "Next Ecomm by Kaan Arslan",
      link: process.env.SIGN_IN_URL!,
      btn_title: "Sign in",
    },
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
