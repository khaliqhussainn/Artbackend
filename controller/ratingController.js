const ratingService = require("../service/ratingService")

const createrating = async (res, req) => {

    const user = req.user;

    try {
        const review = await ratingService.createRating(req.body, user);
        return res.status(201).send(review);

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const getAllRating = async (res, req) => {

    const user = req.user;
    const productId = req.params.productId
    try {
        const review = await ratingService.getProductRating(productId);
        return res.status(201).send(review);

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = { createrating, getAllRating}