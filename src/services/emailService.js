import { reject } from 'lodash';
import nodemailer from 'nodemailer'
require('dotenv').config()
// const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
let sendEmailBooking = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.APP_APP_PASSWORD, // generated ethereal password
        },
    });
    let info = await transporter.sendMail({
        from: '"Booking Health Care 👻" <slbaoquy@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh | Info about booking appointment ✔", // Subject line
        text: "Hello world?", // plain text body
        html: getBodyHTMLemail(dataSend) // html body
    });
}
let getBodyHTMLemail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <b>Xin chào ${dataSend.patientName}?</b>
        <p>Bạn nhận được Email này vì đã đặt lịch khám bệnh online tai Booking health care</p>
        <p> Thông tin đặt lịch khám bệnh </p>
        <div><p>Thời gian : ${dataSend.time} </p></div>
        <div><p>Bác sĩ : ${dataSend.doctorName} </p></div>
        <a href=${dataSend.redirectlink} target="_blank" >Click here<a/>
        <div><b>Chân Thành cảm ơn</b></div>        
        `
    }
    if (dataSend.language === 'en') {
        result =
            `
        <b>Dear ${dataSend.patientName}?</b>
        <p>you receive this Email because you booked our online Medical Appointment</p>
        <p> Infomation about schedule appointment </p>
        <div><p>Time : ${dataSend.time} </p></div>
        <div><p>Doctor : ${dataSend.doctorName} </p></div>
        <a href=${dataSend.redirectlink} target="_blank" >Click here<a/>
        <div><b>Sincerely Thanks !</b></div>        
        `
    }
    return result
}
let getBodyHTMLemailRemedy = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <b>Xin chào ${dataSend.patientName}?</b>
        <p>Càm ơn vì đã đặt lịch khám bệnh online tai Booking health care</p>
        <p> Thông tin hóa đơn đặt lịch khám bệnh </p>
        <div><b>Chân Thành cảm ơn</b></div>        
        `
    }
    if (dataSend.language === 'en') {
        result =
            `
        <b>Dear ${dataSend.patientName}?</b>
        <p>thanks for booked our online Medical Appointment</p>
        <p> Infomation about Remedy appointment </p>
        <div><b>Sincerely Thanks !</b></div>        
        `
    }
    return result
}
let sendAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_APP, // generated ethereal user
                    pass: process.env.APP_APP_PASSWORD, // generated ethereal password
                },
            });
            let info = await transporter.sendMail({
                from: '"Booking Health Care 👻" <slbaoquy@gmail.com>', // sender address
                to: dataSend.email, // list of receivers
                subject: "Kết quả đặt lệnh khám bệnh ✔", // Subject line
                html: getBodyHTMLemailRemedy(dataSend), // html body
                attachments: [
                    {
                        filename: `remedy-${dataSend.patienId}-${new Date().getTime()}.png`,
                        content: dataSend.imgBase64.split("base64,")[1],
                        encoding: 'base64'
                    }
                ]
            });
            resolve(true)

        } catch (error) {
            reject(error)
        }
    })

}




module.exports = {
    sendEmailBooking: sendEmailBooking,
    sendAttachment: sendAttachment
}
// async function main() {
//     // Generate test SMTP service account from ethereal.email
//     // Only needed if you don't have a real mail account for testing
//     let testAccount = await nodemailer.createTestAccount();

//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         host: "smtp.ethereal.email",
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: process.env.EMAIL_APP, // generated ethereal user
//             pass: process.env.APP_APP_PASSWORD, // generated ethereal password
//         },
//     });

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//         from: '"Fred Foo 👻" <foo@example.com>', // sender address
//         to: "bar@example.com, baz@example.com", // list of receivers
//         subject: "Hello ✔", // Subject line
//         text: "Hello world?", // plain text body
//         html: "<b>Hello world?</b>", // html body
//     });

//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     // Preview only available when sending through an Ethereal account
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);