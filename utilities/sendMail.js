const nodemailer = require("nodemailer");

module.exports={

   sendEmailTo:async (userName,otp)=>{
        // async..await is not allowed in global scope, must use a wrapper
       
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();
        console.log("%%%$$$%%%%$$$%%%$$$",userName);
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
        user: process.env.MAILTRAP_AUTH_USER, // generated ethereal user
        pass: process.env.MAILTRAP_AUTH_PASS // generated ethereal password
        }
        });
        var today = new Date();
        today.setHours(today.getHours() + 1);        // send mail with defined transport object
        
        let info = await transporter.sendMail({
        from: 'ashutoshtiwari3309@gmail.com', // sender address
        to: userName, // list of receivers
        subject: "RESET PASSWORD", // Subject line
        
        text: "Hii, Below is the OTP to Reset Password", // plain text body
        html: "YOUR OTP IS  :  "+"<b>"+otp+"</b><br><i>OTP valid for 1 Hour till : </i>"+today.toTimeString() // html body
        });

        console.log("Message sent: %s", info.messageId);

        return{
            email:userName,
            data:info.messageId
        }
    }
}

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        
       
        // return{
        //     error:404,
        //     validator:false,
        //     message:"OTP can't be Sent"
        // }
   