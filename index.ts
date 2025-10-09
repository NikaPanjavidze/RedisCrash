import express from "express";
import restaurantsRouter from "./routes/restaurants";
import cuisinesRouter from "./routes/cuisines";
import { errorHandler } from "./middlewares/errorHandler";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("/restaurants", restaurantsRouter);
app.use("/cuisines", cuisinesRouter);


app.use(errorHandler);
app
  .listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  })
  .on("error", (e) => {
    throw new Error(e.message);
  });
