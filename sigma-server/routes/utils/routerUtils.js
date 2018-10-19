/**
 * express router에 async function 연결 하고 에러 발생 시, 
 * 무한 대기가 걸리는걸 방지한다.
 * @param {*} fn async function
 */
module.exports.safeAsyncCall =
    fn =>
        async (req, res, next) =>
            await fn(req, res, next)
            .catch(next);

/*
arrow function을 사용하지 않는 함수

module.exports.safeAsyncCall =
    function(fn){
        return async function(){
            return await fn(req, res, next).catch(next);
        }
    }
*/