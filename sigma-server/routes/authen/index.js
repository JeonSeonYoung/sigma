const express = require('express');
const router = express.Router();

const authenCtrl = require('./ctrl')


//TODO : 인증 처리
//google
router.get('로그인 폼 요청 URL', authenCtrl.requestGoogleLogin);
router.get('인증 완료 후 처리할 URL', authenCtrl.handleAfterGoogleLogin);

router.get('/logout', authenCtrl.logout);

module.exports = router;