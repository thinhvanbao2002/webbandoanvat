import cartService from "../service/cartService.js";
import Joi from "joi";
import jwt from "jsonwebtoken";
import formidable from 'formidable';
import path from 'path';
const __dirname = process.cwd();
import mailer from "../utils/mailer.js";
import fs from "fs";

const getCart = async (req, res) => {
  try {
    const response = await cartService.getCart();
    return res.status(200).json(
      {
        status: "OK",
        data: response
      }
    )
  } catch (error) {
    return res.status(400).json(
      {
        status: "ERR",
        error: error.message
      }
    )
  }
}

const addCart = async (req, res) => {
  try {
    //truyền vào id với số lượng
    const data = req.body;

    if (!data) {
      throw new Error("Input is required")
    }

    const response = await cartService.addCart({ data });
    return res.status(200).json(
      {
        status: "OK",
        data: response
      }
    )
  } catch (error) {
    return res.status(400).json(
      {
        status: "ERR",
        error: error.message
      }
    )
  }
}

const deleteCart = async (req, res) => {
  try {
    const idCart = req.params.id;

    if (!title) {
      throw new Error("Input is required")
    }

    const response = await cartService.deleteCart({ idCart });
    return res.status(200).json(
      {
        status: "OK",
        data: response
      }
    )
  } catch (error) {
    return res.status(400).json(
      {
        status: "ERR",
        error: error.message
      }
    )
  }
}


export default {
  getCart,
  addCart,
  deleteCart,
}