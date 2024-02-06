const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const userServices = require("../services/userServices");
const accountServices = require("../services/accountServices");

const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ Error: "Preencha todos os campos!" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ Error: "As senhas não correspondem!" });
  }
  const userExist = await userServices.checkUserExist(email);
  if (userExist) {
    return res.status(404).json({ Error: "Email já foi cadastrado!" });
  }
  try {
    const passwordHash = await userServices.passwordHashed(password);
    await prisma.user.create({
      data: { name: name, email: email, password: passwordHash },
    });
    return res.status(201).json({ Message: "usuário criado com suscesso!" });
  } catch (error) {
    await prisma.$disconnect();
    console.log(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

const authenticateUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ Error: "Preencha todos os campos!" });
  }
  const userExist = await userServices.checkUserExist(email);
  const passwordCompared = await userServices.checkPassword(
    password,
    userExist.password
  );
  if (!userExist || !passwordCompared) {
    return res.status(403).json({ Error: "Email ou Senha incorreto!" });
  }
  try {
    const token = await userServices.createToken(email);
    return res.status(201).json({ token: token });
  } catch (error) {
    await prisma.$disconnect();
    console.log(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

const deleteUser = async (req, res) => {
  const idUser = req.decoded.id;
  const { password } = req.body;
  const user = await userServices.checkUserExistById(idUser);
  const checkedPass = await userServices.checkPassword(password, user.password);
  if (!checkedPass) {
    return res.status(403).json({ Error: "A senha está incorreta!" });
  }
  try {
    const dataExist = await accountServices.checkDataExist(idUser);
    if (dataExist) {
      await accountServices.deleteAll(idUser);
    }
    await userServices.deleteUser(idUser);
    return res.status(201).json({ Message: "Usuário excluído com sucesso!" });
  } catch (error) {
    await prisma.$disconnect();
    console.log(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

const updateUser = async (req, res) => {
  const idUser = req.decoded.id;
  const { newEmail, newName, newPassword, password } = req.body;
  if (newEmail === "" || newName === "") {
    return res.status(400).json({ Error: "Os campos não podem estar vazios!" });
  }
  const userData = await userServices.checkUserExistById(idUser);
  if (!userData) {
    return res.status(400).json({ Error: "ID informado não existe!" });
  }
  const passwordChecked = await userServices.checkPassword(
    password,
    userData.password
  );
  if (!passwordChecked) {
    return res.status(401).json({ Error: "Senha incorreta!" });
  }
  try {
    let passwordHash = userData.password;
    if (newPassword !== "") {
      passwordHash = await userServices.passwordHashed(newPassword);
    }
    await userServices.updateUser(newEmail, newName, passwordHash, idUser);
    return res.status(201).json({ Message: "Dados atulizados com sucesso!" });
  } catch (error) {
    await prisma.$disconnect();
    console.log(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

const getDataUser = async (req, res) => {
  const idUser = req.decoded.id;
  try {
    const user = await userServices.checkUserExistById(idUser);
    const { name, email, id } = user;
    const data = { name: name, email: email, id: id };
    return res.status(200).json(data);
  } catch (error) {
    await prisma.$disconnect();
    console.log(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

module.exports = {
  registerUser,
  authenticateUser,
  deleteUser,
  updateUser,
  getDataUser,
};
