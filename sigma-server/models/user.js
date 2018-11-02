const Sequelize = require('sequelize');
const crypto = require('crypto')

const db = require('./db');
const UserDetails = require('./userDetails');

const USER_STATUS = {
    "ENABLE" : "E"
    , "LOCK" : "L"
    , "EXPIRED" : "EX"
}


//TODO : 컬럼 & 컬럼명 조정
const User = db.define('User', {
        id: {
            type: Sequelize.INTEGER
            , autoIncrement: true
            , primaryKey: true
        }
        , passwd : {
            type : Sequelize.STRING.BINARY
            , allowNull : true
        }
        , email : {
            type : Sequelize.TEXT
            , allowNull : false
        }
        , status : {
            type : Sequelize.ENUM(Object.values(USER_STATUS))
            , allowNull : false
        }
        , create : {
            type: Sequelize.DATE
            , default: Sequelize.NOW,
        }
    }
    ,{
        timestamps: false
        , tableName: 'User'
    }
);

User.prototype.encode = (str) => {
    return crypto.createHash('sha256')
    .update(str)
    .digest('base64');
};

User.prototype.serialize = () => {
    return this.toJSON();
};

User.prototype.isEqualsPasswd = (pw) => {

    const inputPw = this.encode(pw);
    return this.passwd === inputPw;
};

User.USER_STATUS = USER_STATUS;

User.register = async(registerParam) => {

    const user = await User.build({
        passwd : this.encode(registerParam.pw)
        , email : registerParam.email
        , status : registerParam.status
    }).save();

    let userDetailsParams = {};

    userDetailsParams.userFk = user.id;
    if(userDetailsParams.faceBook)  userDetailsParams.faceBook = registerParam.faceBook;
    if(userDetailsParams.google)    userDetailsParams.google = registerParam.google;

    await UserDetails.build(userDetailsParams).save();

    const createdUser = User.findById(user.id, {
        include : [UserDetails]
        , attributes : {exclude : ['passwd']}
    })
    
    return createdUser;
};

/**
 * 이메일 중복값 체크.
 * 중복 된 이메일이 없을 시 true
 * 있을 시 false
 */
User.isEnableEmail = async(email) => {
    const user = await Post.findOne({
        where: {
            email
        }
    });

    if(user)    return false;
    else        return true;
}

/**
 * 이메일, 비밀번호로 연관된 사용자를 찾는다.
 */
User.findUserByAuth = async(email, pw) => {
    const user = await Post.findOne({
        where: {
            email
        }
    });

    if(user && this.encode(pw) === user.passwd)
        return user;
    else
        return null;
}

module.exports = User;