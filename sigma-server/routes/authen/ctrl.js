const config = require('../../config');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const successRedirect = "/";

/*
TODO : third pary 인증 관련 된 로직을 처리하는데, 인증 요청 시점에 따른 success Redirect 변화가 필요함

case 1 : 회원 가입 절차 상 본인 인증 시 redirect url
case 2 : 회원 가입 후 로그인 목적으로 본인 인증 시 redirect url
*/


/**
 * 로그인 성공시 사용자 정보를 Session에 저장한다
 */
passport.serializeUser((user, done)=>{
  done(null, user)
  return;
}); 
 
 
/**
 * 인증 후, 페이지 접근시 마다 사용자 정보를 Session에서 읽어옴.
 */
passport.deserializeUser((user, done)=>{
  done(null, user);
  return;
}); 

 
/**
 * 로그인 유저 판단 로직
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.isAuthenticated = (req, res, next)=>{
  if(req.isAuthenticated())
    return next();
  res.redirect("/");
};

/**
 * 데이터를 세션에 올린다.
 * TODO : handle user data with DB
 * @param {*} data 세션에 올릴 데이터
 * @param {*} done 
 */
const handleUserData = (data, done)=>{
  //사용자 정보를 DB에서 저장 시, 여기서 관리
  done(null,data);
  return;
}

passport.use(new GoogleStrategy({
      clientID: config.passport.google.clientID,
      clientSecret: config.passport.google.clientSecret,
      callbackURL: config.passport.google.callbackURL,
      passReqToCallback : true
    },
    (req, accessToken, refreshToken, profile, done) => {
      const profileFromGoogle = profile._json;
      
      req.res.cookie('loginProvider', 'google');
      
      let sessionData = {
        'userId': profileFromGoogle.id,
        'nickName': profileFromGoogle.displayName,
        'accessToken' : accessToken,
        'provider' : 'google'
      }
    
      handleUserData(sessionData, done);
    }
));


/**
 * 구글 로그인 요청 시
 */
exports.requestGoogleLogin = passport.authenticate('google', { scope: ['email profile'] })

/**
 * 구글 로그인(인증) 완료 후
 */
exports.handleAfterGoogleLogin = passport.authenticate('google', {
  successRedirect: successRedirect,
  failureRedirect: '/login'
});

exports.logout = (req, resp) => {
  req.logout();
  
  return resp.json({
      success: true
  });
}