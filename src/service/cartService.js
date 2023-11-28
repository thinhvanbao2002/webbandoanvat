import CartModel from "../models/cartModel.js";
import bcrypt from "bcrypt";

const getCart = async ({ username, password }) => {
    const existingUser = await AdminModel.findOne({ username });
    if (existingUser) {
        if (existingUser.password != password) {
            throw new Error('Invalid Password');
        } else {
            return existingUser;
        }
    } else {
        throw new Error("User not already");
    }
}

const addCart = async ({ username, password }) => {
  const existingUser = await AdminModel.findOne({ username });
  if (existingUser) {
      if (existingUser.password != password) {
          throw new Error('Invalid Password');
      } else {
          return existingUser;
      }
  } else {
      throw new Error("User not already");
  }
}

const deleteCart = async ({ username, password }) => {
  const existingUser = await AdminModel.findOne({ username });
  if (existingUser) {
      if (existingUser.password != password) {
          throw new Error('Invalid Password');
      } else {
          return existingUser;
      }
  } else {
      throw new Error("User not already");
  }
}


export default {
    getCart,
    addCart,
    deleteCart
}