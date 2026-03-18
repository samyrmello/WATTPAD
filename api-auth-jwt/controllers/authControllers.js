const jwt = require("jsonwebtoken")
const User = require("../data/users")

const SECRET = "meusegredo"

async function login(req, res) {
  const { email, senha } = req.body

  try {
    const user = await User.findOne({
      where: { email }
    })

    if (!user || user.senha !== senha) {
      return res.status(401).json({ message: "Usuário inválido" })
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      SECRET,
      { expiresIn: "1h" }
    )

    res.json({ token })

  } catch (error) {
    res.status(500).json({ error: "Erro no servidor" })
  }
}

module.exports = { login }