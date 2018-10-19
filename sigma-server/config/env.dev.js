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
    , sessionKey : '!@#sessionSID#!@'
}

module.exports = secret;