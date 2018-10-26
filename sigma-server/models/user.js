const Sequelize = require('sequelize');
const db = require('./db');

const crypto = require('crypto')

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

User.isEqualsPasswd = (pw) => {

    const inputPw = this.encode(pwd);

    return this.passwd === inputPw;
};

User.register = async(pw, email, status) => {
    
    const user = await User.build({
        passwd : this.encode(pw)
        , email
        , status
    }).save();
    
    return user;
};

/**
 * 이메일 중복값 체크.
 * 중복 된 이메일이 있을 시 true
 * 없을 시 false
 */
User.isEnableEmail = async(email) => {
    const user = await Post.findOne({
        where: {
            email
        }
    });

    if(user)    return true;
    else        return false;
}

User.findUserForLogin = async(email, pw) => {
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

User.serialize = () => {
    return this.toJSON();
};

module.exports = User;
//module.exports = USER_STATUS;