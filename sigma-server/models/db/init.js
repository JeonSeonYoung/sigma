const User = require('../user');
const DB = require('./index');

/**
 * db 커넥션 테스트 & ddl 정의
 */
async function dbSync(){
    try {
        await DB.authenticate();                //연결 테스트 & 인증
        await User.sync();                      //ddl 정의
        //await User.sync({ force: true });     //ddl 잘못 정의 되어있을 시, 강제로 재정의

        console.log("db 동기화 및 테이블 동기화 성공");
    }catch(e){
        console.error(e);
    }
}

dbSync();