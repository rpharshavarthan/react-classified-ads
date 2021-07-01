const Users = require('../models/user.model');

const adminAuth = async (req, res, next) => {
    try {
        const user = await Users.findById({_id: req.user.id});
        if(user.role == 0){
            return res.status(400).json({message: 'admin access denied'})
        }
        next()
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = adminAuth;