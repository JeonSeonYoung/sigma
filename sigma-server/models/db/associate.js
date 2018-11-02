/**
 * table의 연관 관계를 지정한다.
 */
const associate = (models)=>{
    /*Object.keys(models).forEach(function(modelName) {
        if (models[modelName] && models[modelName].associate) {
            models[modelName].associate(models);
        }
    });
    */

    const modelNames = Object.keys(models);

    for(let i=0;i<modelNames.length;i++){
        if (models[modelNames[i]] && models[modelNames[i]].associate)
            models[modelNames[i]].associate(models);
    }
}

module.exports = associate;