import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

mongoose.connect(process.env.URI_MONGO);

const userSchema = new mongoose.Schema({
  name: { type: String, index: true },
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  age: Number,
  password: String,
});
const User = mongoose.model("User", userSchema);

const UserController = {
  createUser: async (req, res) => {
    console.log("ENTREI AQUI!");
    const SALT_ROUNDS = 10;
    const hashPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    //mongoose.connect(process.env.URI_MONGO);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      age: req.body.age,
      password: hashPassword,
    });

    try {
      await newUser.save();
      console.log("usuário inserido com sucesso!!");
    } catch (err) {
      console.log("DEU ERRO", Object.keys(err.keyValue)[0]);

      if (Object.keys(err.keyValue)[0] === "username") {
        res.status(409).send("username ja cadastrado");
      }
    }
    // finally {
    //   mongoose.connection.close();
    // }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(200).send("getAllUsers");
    }

    // console.log("ENTREI AQUI!");
    // res.status(200).send("getAllUsers");
  },

  //ATUALIZAR USUÁRIO PELO ID
  updateUser: async (req, res) => {
    console.log("ENTREI AQUI!");
    const userId = req.params.id;
    const updateData = req.body;
    try {
      const updateUser = await User.updateOne({ _id: userId }, updateData);
      if (updateUser.nModified === 0) {
        res.status(404).send("nenhum usuario encontrado no banco");
      } else {
        res.status(200).json({ message: "USUARIO ATUALIZADO" });
      }
    } catch (error) {
      console.log("OCORREU UM ERRO", error);
      res.status(500).send(error);
    }
  },

  //ATUALIZAR USUÁRIO PELO BODY
  updateUserBody: async (req, res) => {
    console.log("ENTREI AQUI!");
    const userId = req.body.idToBeModified;
    const updateData = req.body.user;
    try {
      const updateUserBody = await User.updateOne({ _id: userId }, updateData);
      if (updateUserBody.nModified === 0) {
        res.status(404).send("nenhum usuario encontrado no banco");
      } else {
        res.status(200).json({ message: "USUARIO ATUALIZADO" });
      }
    } catch (error) {
      console.log("OCORREU UM ERRO", error);
      res.status(500).send(error);
    }
  },

  deleteUser: async (req, res) => {
    //mongoose.connect(process.env.URI_MONGO);
    console.log("ENTREI AQUI!");
    const userId = req.params.id;
    try {
      const deleteUser = await User.deleteOne({ _id: userId });
      if (deleteUser.deletedCount === 0) {
        res.status(404).send("Nenhum usuário encontrado no banco!");
      } else {
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).send(error);
    }
    //res.status(204).send("deleteUser");
  },
  getUser: async (req, res) => {
    console.log("ENTREI AQUI!");
    const userId = req.params.id;
    try {
      const user = await User.findById(userId);
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send("nenhum usuario encontrado no banco");
      }
    } catch (error) {
      res.status(500).send(error);
    }
    //res.status(500).send(error);
  },
};

export default UserController;
