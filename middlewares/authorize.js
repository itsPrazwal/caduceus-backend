module.exports = function authorizer(req, res, next){
    if(req.isVerified){
        next();
    }else{
        return next({
            message: 'User is not verifed.',
            status: 401
        }) 
    }
}