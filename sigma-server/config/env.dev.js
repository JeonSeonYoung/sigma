const secret = {
    mail : {
        service : 'Gmail'
        , host : 'localhost'
        , port : '465'
        , account : "joohyung0531@gmail.com"
        , passwd : "123"
    }
    , passport : {
        google : {
            'clientID': '134200099360-qmhjqlsfpmlfoidvplfj474mm8r5q10n.apps.googleusercontent.com',
            'clientSecret': 'cCiRRHSN5ogIyLDPJKc0AXyH',
            'callbackURL': '/api/authen/login/google/callback',
        }
    }
    , db : {
        host : "localhost"
        , port : 3306
        , dialect : "mysql" //db 종류
        , name : "joo"      //데이터베이스 이름(스키마)
        , userId : "joohyung"
        , password : "joo12345"
    }
    , sessionKey : '!@#sessionSID#!@'
}

module.exports = secret;