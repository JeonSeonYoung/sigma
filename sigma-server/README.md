# Sigma-server

## 1 DB 설치

### 1.1 DB(Mysql) 설치
### 1.2 config/env.xxx.js 작성
```javacript
    //....
    db : {
        host : "localhost"
        , port : 3306
        , dialect : "mysql"     //db 종류
        , name : "joo"          //데이터베이스 이름(스키마)
        , userId : "계정아이디"
        , password : "계정패스워드"
    }
    //....
```
### 1.3 DDL 실행
따로 DDL을 정의하지 않고 `sequelize`모듈을 사용하여 작성된 `model`들을 바탕으로 DDL 정의.

아래 명령어를 통해서 db 연동 테스트 및 db 테이블을 생성이 가능
```
$ npm run db.sync
```