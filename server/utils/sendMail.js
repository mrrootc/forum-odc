import nodemailer from "nodemailer";

const sendMail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const message = await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
      // html: 
    });
    

    console.log(message);
  } catch (error) {
    console.log(`Email not send ${error}`);
  }
};

export default sendMail;
