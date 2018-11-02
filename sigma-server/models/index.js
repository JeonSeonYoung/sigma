const fs = require('fs');
const path = require('path');
let models = {};

fs
    .readdirSync(__dirname)
    .filter(file => (file.indexOf(".") !== 0) && (file !== "index.js"))             // index, .로 시작하는 파일 x
    .filter(filePath => !fs.statSync(path.join(__dirname,filePath)).isDirectory())  //디렉토리 제거
    .forEach(function(file) {
        const model = require(`./${file}`);
        //require.resolve(`${__dirname}/${file}`);
        models[model.name] = model;
    });

module.exports = models;