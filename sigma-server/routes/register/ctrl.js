const uuidV4 = require('uuid/v4');
const mailUtils = require('../../utils/mailUtils');
const { User } = require('../../models');

//인증메일 제한 시간(초)
const LIMIT_SECONDS = 180;

/**
 * 인증 메일을 보낸다.
 */
exports.sendAuthMail = async (req, resp, next)=>{

    const authCode = uuidV4();
    const sendDateAt = Date.now();

    req.session.authEmailData = {
        authCode
        , sendDateAt
        , isAuthentifier : false
    }

    await mailUtils.sendMail({
        subject : "본인인증 코드 정보"
        , text : `코드 정보 : ${authCode}`
        , to : req.body.userMail
    });

    return resp.status(201).json({
        result : 'success'
    });
}

/**
 * 세션에 담긴 인증메일 코드 정보와 넘겨받은 코드 정보를 비교한다.
 */
exports.checkAuthCodeFromSession = (req, resp, next)=>{
    //TODO : session 정보가 유효한지 검사

    const authCodeFromSession = req.session.authEmailData.authCode;
    const sendDateAt = req.session.authEmailData.sendDateAt;
    const authCodeFromUser = req.query.authCode;
    const checkDateAt = Date.now();

    //제한시간 만료 확인
    if(sendDateAt + (LIMIT_SECONDS * 1000) < checkDateAt){
        return resp.status(401).json({
            error: "expired auth code"
        });
    }

    if(authCodeFromSession && authCodeFromUser === authCodeFromSession){
        //이메일 본인 인증 여부
        req.session.authEmailData.isAuthentifier = true;

        return resp.json({
            result : 'success'
        });
    } else {
        return resp.status(401).json({
            error: "invalid auth code"
        });
    }
}

/**
 * 회원가입을 처리한다.
 */
exports.regUser = async (req, resp, next)=>{

    //이메일 본인 인증과정 체크
    if(!isAuthentifierFromEmail(req)) {
        return resp.status(401).json({
            message : 'unauthorized'
        })
    }

    const {
        passwd
        , nickName
        , thumbNail
        , faceBook
        , google
    } = req.body;

    /*
    const {
        email
    } = req.session;
    */

    //TODO : session 테스트
    const email = "email@from.dummy";


    const createdUser = await User.register({
        passwd
        , nickName
        , thumbNail
        , faceBook
        , google
        , email
    });

    const userData = createdUser.serialize();

    return resp.status(201).json({
        result : 'success'
        , data : userData
    });
}

/**
 * 회원정보를 수정한다.
 */
exports.modify = (req, resp, next)=>{
    
    const {
        passwd
        , nickName
        , thumbNail
    } = req.body;

    const {
        email
    } = req.session;

    //TODO : 유저 정보 암호화
    //TODO : 유저 모델에 정보를 담아 DB에 수정한다.

    return resp.json({
        result : 'success'
    });
}

/**
 * 회원탈퇴를 진행한다.
 */
exports.leave = (req, resp, next)=>{
    const userInfo = req.session.userInfo;

    //TODO : user key 정보로 탈퇴를 진행한다.

    return resp.json({
        result : 'success'
    });
}

/**
 * 세션에서 이메일 인증이 성공했는지 체크한다.
 */
const isAuthentifierFromEmail = (req)=>{
    if(req.session.authEmailData)
        return !!req.session.authEmailData.isAuthentifier;
    else
        return false;
}