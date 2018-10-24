const Sequelize = require('sequelize');
const config = require('../../config');


const {
    host, port, dialect, name, userId, password,
} = config.db

const sequelize = new Sequelize(name, userId, password, {
  host: host
  , port : port
  , dialect: dialect    //db 종류
  , pool: {
      max: 5
      , min: 0
      , acquire: 30000  // 연결하는데 최대 30초 걸리도록 설정
      , idle: 10000     // 10초동안 요청 없으면 연결 끊어놓음
  }
  , operatorsAliases: false
  , logging: false
});

module.exports = sequelize;