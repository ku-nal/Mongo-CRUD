const {getClient} = require('./connectDB');
const User = require('./user-model');
const SuccessResponse = require('./success-response');
const ErrorResponse = require('./error-response');

class UserController{
    async createUser(req,res){
        try{
            const response = await User.create({
                email: req.body.email,
                firstName: req.body.firstName
            });
            SuccessResponse.message = "User added";
            return res.status(200).json(SuccessResponse);
        }
        catch(error){
            return res.status(400).json(ErrorResponse);
        }
    }

    async getAll(req,res){
        try{
            const users = await User.find({}).select("email firstName id");
            SuccessResponse.message = "Users retreived";
            SuccessResponse.users = users;

            return res.status(200).json(SuccessResponse);
        }
        catch(error){
            return res.status(400).json(ErrorResponse);
        }
    }

    async get(req,res){
        try{
            const user = await User.findOne({_id: req.params.id}).select("email firstName id");
            return res.status(200).json({
                success: true,
                user: user
            });
        }
        catch(error){
            return res.status(400).json(ErrorResponse);
        }
    }

    async updateUser(req,res){
        try{
            console.log(req.params.id, req.body);
            const response = await User.findOneAndUpdate({_id: req.params.id}, req.body);
            console.log(response);
            SuccessResponse.message = "User updated";
            return res.status(200).json(SuccessResponse);
        }
        catch(error){
            return res.status(400).json(ErrorResponse);
        }
    }
}

module.exports = UserController;