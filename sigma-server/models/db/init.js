const User = require('../user');
const UserDetails = require('../userDetails');
const DB = require('./index');
const associate = require('./associate');
const models = require('../index');

/**
 * db 커넥션 테스트 & ddl 정의
 */
async function dbSync(){
    try {
        
        await DB.authenticate();                //연결 테스트 & 인증
        
        //await User.sync();                      
        //await UserDetails.sync();
        //await User.sync({ force: true });

        const modelNames = Object.keys(models);
        
        for(let i=0;i<modelNames.length;i++){
            await models[modelNames[i]].sync();                 //ddl 정의
            //await models[modelNames[i]].sync({ force: true });//ddl이 정의된거랑 다를시 강제 재정의
            //console.log(modelNames[i]+' sync');
        }

        associate(models);                      //table간의 연관관계 지정

        console.log("db 동기화 및 테이블 동기화 성공");
    }catch(e){
        console.error("db 동기화 실패");
        console.error(e.stack);
    }

    process.exit(0);
}

dbSync();