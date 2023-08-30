import express from "express";
import jwt from "jsonwebtoken";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const checkToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, "ABCDEF", (err, decode) => {
      if (err) {
        return res.status(401).json({ message: "Token Inválido" });
      }
    });
    next();
    //return res.status(200).json({ message: "Eu tenho o token" });
    // AQUI FAZ A VERIFICAÇÃO DO TOKEM JWT COM O MÉTODO jwt.verify()
  } else {
    return res.status(404).json({ message: "Cadê o token?" });
  }
};

app.use(express.json());
//app.use("/api", checkToken, userRoutes);
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", authRoutes);
app.listen(5000, () => {
  console.log("Servidor rodando!");
});
