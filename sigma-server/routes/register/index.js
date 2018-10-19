const express = require('express');
const router = express.Router();

const regCtrl = require('./ctrl');
const safeAsyncCall = require('../utils/routerUtils').safeAsyncCall;

/**
 * 가입 전 인증 메일을 보낸다.
 */
router.post('/sendEmail', safeAsyncCall(regCtrl.sendAuthMail));

/**
 * 세션에 담긴 인증메일 코드 정보와 넘겨받은 코드 정보를 비교한다.
 */
router.get('/authEmail', regCtrl.checkAuthCodeFromSession);

/**
 * 회원가입을 진행한다.
 */
router.post('/', (req, resp, next)=>{

    //TODO : 유효성 검사. Joi 또는 자체 미들웨어 사용

    next();
}, regCtrl.regUser);

/**
 * 회원 정보를 수정한다.
 */
router.put('/', (req, resp, next)=>{

    //TODO : 유효성 검사. Joi 또는 자체 미들웨어 사용

    next();
}, regCtrl.modify);

/**
 * 회원 탈퇴 처리를 진행한다.
 */
router.delete('/', regCtrl.leave);

module.exports = router;