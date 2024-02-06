const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkUserExist = async (email) => {
  try {
    const userExist = await prisma.user.findFirst({ where: { email: email } });
    return userExist;
  } catch (error) {
    console.error(error);
  }
};

const checkUserExistById = async (id) => {
  try {
    const userExist = await prisma.user.findFirst({ where: { id: id } });
    return userExist;
  } catch (error) {
    console.error(error);
  }
};

const passwordHashed = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
  } catch (error) {
    console.error(error);
  }
};

const checkPassword = async (password, passwordHash) => {
  try {
    const passwordCompared = await bcrypt.compare(password, passwordHash);
    return passwordCompared;
  } catch (error) {
    console.error(error);
  }
};

const createToken = async (payload) => {
  try {
    const user = await prisma.user.findFirst({ where: { email: payload } });
    const id = user.id;
    const token = await jwt.sign(
      { user: payload, id: id },
      process.env.SECRET,
      {
        expiresIn: "4h",
      }
    );
    return token;
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await prisma.user.delete({ where: { id: id } });
    return deletedUser;
  } catch (error) {
    console.error(error);
  }
};

const updateUser = async (email, name, password, id) => {
  try {
    const data = await prisma.user.update({
      where: { id: id },
      data: { email: email, name: name, password: password },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  checkUserExist,
  checkUserExistById,
  passwordHashed,
  checkPassword,
  createToken,
  deleteUser,
  updateUser,
};
