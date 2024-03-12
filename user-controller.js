const { getClient } = require("./connectDB");
const User = require("./user-model");
const SuccessResponse = require("./success-response");
const ErrorResponse = require("./error-response");

class UserController {
  async createUser(req, res) {
    try {
      if (req.body.email && req.body.firstName) {
        const response = await User.create({
          email: req.body.email,
          firstName: req.body.firstName,
        });
        SuccessResponse.message = "User added";
        return res.status(200).json(SuccessResponse);
      } else {
        console.log(req.firstName);
        if (!req.body.email && !req.body.firstName) {
          ErrorResponse.message =
            "email and firstName should be present in the request body";
          return res.status(400).json(ErrorResponse);
        } else if (!req.body.email) {
          ErrorResponse.message = "email should be present in the request body";
          return res.status(400).json(ErrorResponse);
        } else {
          ErrorResponse.message =
            "firstName should be present in the request body";
          return res.status(400).json(ErrorResponse);
        }
      }
    } catch (error) {
      ErrorResponse.message = "Error creating a new user";
      return res.status(500).json(ErrorResponse);
    }
  }

  async getAll(req, res) {
    try {
      const users = await User.find({}).select("email firstName id");
      SuccessResponse.message = "Users retreived";
      SuccessResponse.users = users;

      return res.status(200).json(SuccessResponse);
    } catch (error) {
      return res.status(400).json(ErrorResponse);
    }
  }

  async get(req, res) {
    try {
      var user = await User.findOne({ _id: req.params.id }).select(
        "email firstName id"
      );
      return res.status(200).json({
        success: true,
        user: user,
      });
    } catch (error) {
        if(!user){
            return res.status(200).json({
                success: true,
                user:{}
            })
        }
      return res.status(400).json(ErrorResponse);
    }
  }

  async updateUser(req, res) {
    try {
      if (req.body.email && req.body.firstName) {
        console.log(req.params.id, req.body);
        const response = await User.findOneAndUpdate(
          { _id: req.params.id },
          req.body
        );

        SuccessResponse.message = "User updated";
        return res.status(200).json({
            success: true,
            message: "User updated"
        });
      } else {
        if (!req.body.email && !req.body.firstName) {
          ErrorResponse.message =
            "email and firstName should be present in the request body";
          return res.status(400).json(ErrorResponse);
        } else if (!req.body.email) {
          ErrorResponse.message = "email should be present in the request body";
          return res.status(400).json(ErrorResponse);
        } else {
          ErrorResponse.message =
            "firstName should be present in the request body";
          return res.status(400).json(ErrorResponse);
        }
      }
    } catch (error) {
        console.log(error);
      return res.status(500).json(ErrorResponse);
    }
  }
}

module.exports = UserController;
