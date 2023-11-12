import orderService from "../service/orderService.js";
import Joi from "joi";

const Schema = Joi.object({
    idUser: Joi.string().label('idUser'),
    idVoucher: Joi.string().label('idVoucher'),
    total: Joi.string().label('total'),
});

const getOrder = async (req, res) => {
    try {
        const perPage = 2;
        let page = parseInt(req.query.page) || 1;
        page = Math.max(page, 1);

        const response = await orderService.getOrder({ perPage, page });
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

const searchOrder = async (req, res) => {
    try {
        const perPage = 2;
        let keyword = req.query.keyword || "";
        let page = parseInt(req.query.page) || 1;
        page = Math.max(page, 1);

        const response = await orderService.searchOrer({perPage, keyword, page});
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

const createOrder = async (req, res) => {
    try {
        const title = req.body.title;

        if (!title) {
            throw new Error("Input is required")
        }

        const validationInput = Schema.validate({ title });
        if (validationInput.error) {
            const errorMessages = validationInput.error.details.map((error) => error.message);
            throw new Error(`Dữ liệu không hợp lệ: ${errorMessages.join(', ')}`);
        }
        const response = await orderService.createOrder({ title });
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

const updateOrder = async (req, res) => {
    try {
        const idCategory = req.params.id;
        const title = req.body.title;

        if (!title) {
            throw new Error("Input is required")
        }

        const validationInput = Schema.validate({ title });
        if (validationInput.error) {
            const errorMessages = validationInput.error.details.map((error) => error.message);
            throw new Error(`Dữ liệu không hợp lệ: ${errorMessages.join(', ')}`);
        }
        const response = await orderService.updateOrder({ idCategory, title });
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

const deleteOrder = async (req, res) => {
    try {
        const idCategory = req.params.id;
        if (!idCategory) {
            throw new Error('User ID is required');
        }

        const response = await orderService.deleteOrder({ idCategory });

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
    getOrder,
    searchOrder,
    createOrder,
    updateOrder,
    deleteOrder,
}