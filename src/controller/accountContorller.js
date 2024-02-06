const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const accountServices = require("../services/accountServices");
const userServices = require("../services/userServices");

const saveNewAccount = async (req, res) => {
  const { name, site, username, password } = req.body;
  if (!name || !site || !username || !password) {
    return res
      .status(400)
      .json({ Error: "Preencha todos os campos corretamente!" });
  }
  const userId = req.decoded.id;
  try {
    const hashUsername = await accountServices.encryptData(username);
    const hashPassword = await accountServices.encryptData(password);
    const data = { name, site, hashUsername, hashPassword, userId };
    await accountServices.saveDataAccount(data);
    return res.status(201).json({ Message: "Informações salvas com sucesso!" });
  } catch (error) {
    await prisma.$disconnect();
    console.log(error);
    return res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

const getAllAccount = async (req, res) => {
  const userId = req.decoded.id;
  try {
    const data = await accountServices.checkDataExist(userId);
    data.forEach((element) => {
      element.username = accountServices.decryptData(element.username);
      element.password = accountServices.decryptData(element.password);
    });
    return res.status(201).json(data);
  } catch (error) {
    await prisma.$disconnect();
    console.log(error);
    return res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

const updateAcconut = async (req, res) => {
  const dataId = parseInt(req.params.id);
  const dataExist = await accountServices.getData(dataId);
  if (!dataExist) {
    return res.status(400).json({ Error: "Informação de conta inexistente!" });
  }
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ Error: "Preencha todos os campos corretamente!" });
  }
  try {
    const hashUsername = await accountServices.encryptData(username);
    const hashPassword = await accountServices.encryptData(password);
    const data = { hashUsername, hashPassword, dataId };
    await accountServices.updateDataAccount(data);
    return res
      .status(201)
      .json({ Message: "Informações atualizadas com sucesso!" });
  } catch (error) {
    await prisma.$disconnect();
    console.log(error);
    return res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

const deleteAccount = async (req, res) => {
  const dataId = parseInt(req.params.id);
  const dataExist = await accountServices.getData(dataId);
  if (!dataExist) {
    return res.status(400).json({ Error: "Informação de conta inexistente!" });
  }
  try {
    await accountServices.deleteOne(dataExist.id);
    return res.status(201).json({ Message: "Excluído com sucesso!" });
  } catch (error) {
    await prisma.$disconnect();
    console.log(error);
    return res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

const deleteAll = async (req, res) => {
  const userId = req.decoded.id;
  const { password } = req.body;
  const user = await userServices.checkUserExistById(userId);
  const checkedPass = await userServices.checkPassword(password, user.password);
  if (!checkedPass) {
    return res.status(403).json({ Error: "A senha está incorreta!" });
  }
  try {
    await accountServices.deleteAll(userId);
    return res.status(201).json({ Message: "Todos os dados foram excluídos!" });
  } catch (error) {
    await prisma.$disconnect();
    console.log(error);
    return res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

module.exports = {
  saveNewAccount,
  getAllAccount,
  updateAcconut,
  deleteAccount,
  deleteAll,
};
