import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
  const randomAdj = Math.floor(Math.random() * adjectives.length);
  const randomNon = Math.floor(Math.random() * nouns.length);

  return `${adjectives[randomAdj]}${nouns[randomNon]}`;
};

console.log(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORLD);

const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORLD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (username, address, secret) => {
  const email = {
    from: "2myung3@naver.com",
    to: address,
    subject: "Login Secret for Prismagram 🔐",
    html: `Hello ${username} . <br/> Your login secret is '<b>${secret}</b>'. <br/> Copy & Paste on the App/Website to Log in.<br/> enjoy your Pirsmagram. <br/> Thank you. `
  };

  return sendMail(email);
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
