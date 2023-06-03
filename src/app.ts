require("express-async-errors");
import * as express from "express";
import router from "./routes/user-routes/index.route";
import errorHandlerMiddleware from "./middlewares/errorHandler.middlewares";
import ConsoleLogger from "./logs/Logger";
import { container } from "tsyringe";

container.registerInstance("Logger", new ConsoleLogger());

const app = express();
app.use(express.json());

app.use("/apiv1", router);

router.use(errorHandlerMiddleware);

export default app;
