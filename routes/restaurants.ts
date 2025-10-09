import express, { type Request } from "express";
import { validate } from "../middlewares/validate";
import { RestaurantSchema, type Restaurant } from "../schemas/restaurant";
import { initializeRedisClient } from "../utils/client";
import { restaurantKeyById } from "../utils/keys";
import { successResponse } from "../utils/responses";
import { nanoid } from "../node_modules/nanoid/index";
import { checkRestaurantExists } from "../middlewares/checkRestaurantId";
const router = express.Router();

router.post("/", validate(RestaurantSchema), async (req, res) => {
  const data = req.body as Restaurant;
  const client = await initializeRedisClient();
  const id = nanoid();
  const restaurantKey = restaurantKeyById(id);
  const hashData = { id, name: data.name, location: data.location };
  const addResult = await client.hSet(restaurantKey, hashData);
  console.log(`Added ${addResult} fields`);
  return successResponse(res, hashData, "Added new restaurant");
});

router.get(
  "/:restaurantId",
  checkRestaurantExists,
  async (req: Request<{ restaurantId: string }>, res) => {
    const { restaurantId } = req.params;
    const client = await initializeRedisClient();
    const restaurantKey = restaurantKeyById(restaurantId);
    const [viewCount, restaurant] = await Promise.all([
      client.hIncrBy(restaurantKey, "viewCount", 1),
      client.hGetAll(restaurantKey),
    ]);
    return successResponse(res, restaurant);
  }
);

export default router;
