const express = require("express");
const app = express();
const PORT = 3000;

// IMPORTANTE: Para o servidor entender JSON vindo do Postman/Insomnia
app.use(express.json());

const User = require("./data/users");
const authController = require("./controllers/authControllers");

app.get("/", (req, res) => {
    res.send("Servidor Web funcionando...");
});

// Nova rota de login vinculada ao seu controller
app.post("/login", authController.login);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

User.sync().then(async () => {
    // Note: Isso vai tentar criar o Admin toda vez que o servidor reiniciar.
    // Se der erro de "email já existe", é por causa disso.
    try {
        await User.create({
            nome: "Admin",
            email: "admin@email.com",
            senha: "123"
        });
        console.log("Usuário criado");
    } catch (e) {
        console.log("Usuário já existe no banco.");
    }
});