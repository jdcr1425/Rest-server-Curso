const jwt = require('jsonwebtoken');

//==============
// Token verification
//==============
let checkToken = (req, res, next) =>{
    let token = req.get('token');
    jwt.verify(token, process.env.SEED,(err, decoded)=>{
        if(err){
            return res.status(401).json({
                ok:false,
                err
            })
        }
        req.user = decoded.user;
        next();
    });
/*     res.json({
        token
    });
 */
};

//=================
//Role verification
//=================

let checkRole = (req, res, next)=>{
    let user = req.user;
    if(user.role === 'ADMIN_ROLE'){
        return next();
    }else{
        res.json({
            message:"You are not allowed to do this"
        })
    }
}

module.exports = {
    checkToken,
    checkRole
};