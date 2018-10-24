const Sequelize = require('sequelize');
const db = require('./db');

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
            type : Sequelize.TEXT
            , allowNull : false
        }
    }
    ,{
        timestamps: false
        , tableName: 'User'
    });
  
  User.serialize = (data) => {
    return data.toJSON();
  };
  
  module.exports = User;