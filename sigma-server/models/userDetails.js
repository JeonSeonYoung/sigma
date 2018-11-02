const Sequelize = require('sequelize');

const db = require('./db');

//TODO : 컬럼 & 컬럼명 조정
const UserDetails = db.define('UserDetails', {
        id: {
            type: Sequelize.INTEGER
            , autoIncrement: true
            , primaryKey: true
        }
        , userFk : {
            type: Sequelize.INTEGER
            , allowNull : false
        }
        , faceBook : {
            type : Sequelize.TEXT
            , allowNull : true
        }
        , google : {
            type : Sequelize.TEXT
            , allowNull : true
        }
    }
    ,{
        timestamps: false
        , tableName: 'UserDetails'
    }
);

/**
 * UserDetails의 연관 관계를 지정한다.
 */
UserDetails.associate = (models) => {
    models.User.hasOne(models.UserDetails, {
        foreginKey: 'userFk',
    });
}


module.exports = UserDetails;