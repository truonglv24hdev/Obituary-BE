import nodeMailer from "nodemailer";

export const sendMail = (email: string, subject: string, html: string) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "truong10032k@gmail.com",
      pass: "kdjc rcuo tawk pnup",
    },
  });

  const mailOptions = {
    from: "truong10032k@gmail.com",
    to: email,
    subject,
    html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
