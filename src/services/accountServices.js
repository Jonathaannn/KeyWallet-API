const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const crypto = require("crypto");
const algoritm = "aes-256-ctr";

const checkDataExist = async (idUser) => {
  try {
    const dataExist = await prisma.account.findMany({
      where: { userid: idUser },
    });
    return dataExist;
  } catch (error) {
    console.error(error);
  }
};

const getData = async (idAccount) => {
  try {
    const data = await prisma.account.findFirst({ where: { id: idAccount } });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const deleteOne = async (id) => {
  try {
    const deletedData = await prisma.account.delete({ where: { id: id } });
    return deletedData;
  } catch (error) {
    console.error(error);
  }
};

const deleteAll = async (idUser) => {
  try {
    const deletedData = await prisma.account.deleteMany({
      where: { userid: idUser },
    });
    return deletedData;
  } catch (error) {
    console.error(error);
  }
};

const encryptData = async (data) => {
  try {
    const iv = Buffer.from(crypto.randomBytes(16));
    const chiper = crypto.createCipheriv(
      algoritm,
      Buffer.from(process.env.KEY_WALLET),
      iv
    );
    let encrypted = chiper.update(data);
    encrypted = Buffer.concat([encrypted, chiper.final()]);
    return `${iv.toString("base64")}.${encrypted.toString("base64")}`;
  } catch (error) {
    console.error(error);
  }
};

const decryptData = (data) => {
  try {
    const [iv, encrypted] = data.split(".");
    const ivBuffer = Buffer.from(iv, "base64");
    const dechiper = crypto.createDecipheriv(
      algoritm,
      Buffer.from(process.env.KEY_WALLET),
      ivBuffer
    );
    let content = dechiper.update(Buffer.from(encrypted, "base64"));
    content = Buffer.concat([content, dechiper.final()]);
    return content.toString();
  } catch (error) {
    console.error(error);
  }
};

const saveDataAccount = async ({
  name,
  site,
  hashUsername,
  hashPassword,
  userId,
}) => {
  try {
    const data = await prisma.account.create({
      data: {
        name: name,
        site: site,
        username: hashUsername,
        password: hashPassword,
        userid: userId,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const updateDataAccount = async ({
  name,
  site,
  hashUsername,
  hashPassword,
  dataId,
}) => {
  try {
    const data = await prisma.account.update({
      where: { id: dataId },
      data: {
        name: name,
        site: site,
        username: hashUsername,
        password: hashPassword,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  deleteOne,
  deleteAll,
  checkDataExist,
  encryptData,
  decryptData,
  saveDataAccount,
  getData,
  updateDataAccount,
};
