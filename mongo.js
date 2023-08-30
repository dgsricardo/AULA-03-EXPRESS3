import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.URI_MONGO);
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});
const User = mongoose.model("User", userSchema);

async function saveUser() {
  const newUser = new User({
    name: "Douglas",
    email: "dgricardo@gmail.com",
    age: 41,
  });
  try {
    await newUser.save();
    console.log("usuário inserido com sucesso!!");
  } catch (err) {
    console.log("DEU ERRO", err);
  } finally {
    mongoose.connection.close();
  }
}
saveUser();

// newUser.save((err) => {
//   if (err) {
//     console.log("DEU PAU", err);
//   } else {
//     console.log("DEU BOA");
//   }
//   mongoose.connection.close();
// })
