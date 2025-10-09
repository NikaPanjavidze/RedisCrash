import express from 'express';
import { validate } from '../middlewares/validate';
import { RestaurantSchema, type Restaurant } from '../schemas/restaurant';
const router = express.Router();

router.post("/", validate(RestaurantSchema), async (req, res) => {
    const data = req.body as Restaurant;
    res.send("hello world")
})

export default router;