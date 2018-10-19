const nodemailer = require('nodemailer');
const smtpPool = require('nodemailer-smtp-pool');
const config = require('../config');

const defaultOption = {  
    from: `관리자 ${config.mail.account}`
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

    //TODO : error handler
    return transporter.sendMail(mailOptions);
};