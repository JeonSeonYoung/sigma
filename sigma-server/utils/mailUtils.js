const nodemailer = require('nodemailer');
const smtpPool = require('nodemailer-smtp-pool');
const config = require('../config');

const defaultOption = {  
    from: `관리자 ${config.mail.account}@gmail.com`,
    to: 'qweasd_147@naver.com',
    subject: 'Nodemailer 테스트',
    text: '내용 테스트'
};

exports.sendMail = (mailOptions)=>{

    const transporter = nodemailer.createTransport(smtpPool({
        service: config.mail.service,
        host: config.mail.host,
        port: config.mail.port,
        auth: {
          user: config.mail.account,
          pass: config.mail.passwd,
        },
        tls: {
          rejectUnauthorize: false,
        },
        maxConnections: 5,
        maxMessages: 10,
      }));
    

    mailOptions         = mailOptions || {};
    mailOptions.from    = mailOptions.from || defaultOption.from;
    mailOptions.to      = mailOptions.to || defaultOption.to;
    mailOptions.subject = mailOptions.subject || defaultOption.subject;
    mailOptions.text    = mailOptions.text || defaultOption.text;

    transporter.sendMail(mailOptions, function(error, response){

        //TODO : log 처리, promise 객체로 결과값 넘겨주게 처리
        if (error) {
            console.log('failed... => ', error);
        } else {
            console.log('succeed... => ', response);
        }

        transporter.close();
    });
};