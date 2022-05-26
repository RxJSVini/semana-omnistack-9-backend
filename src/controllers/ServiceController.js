const User = require('../models/User');

module.exports = {
    async index(req, res) {

        const { email } = req.body;
        const user = await User.findOne({email});

        if(!user){
            await User.create({ email });
            return res.json(user)
        };

        return res.json(user);

    },
    async show(req, res){
        const { user_id } = req.headers;
        console.log("Logged user", user_id)

        const users = await User.find();
        

        return res.json(users)


    }
}