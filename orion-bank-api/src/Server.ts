import Express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./Router";
import swaggerUi from "swagger-ui-express";
import "express-async-errors"

const swaggerFile = require("../swagger_output.json");

const app = Express();
dotenv.config();

app.use(Express.json())
app.use(router);
app.use(cors());
app.use("/swagger/api", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(
    (error: Error, _request: Request, response: Response, _next: NextFunction) => {
    return response.status(400).json({
        status: "Error",
        message: error.message
    });
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
});