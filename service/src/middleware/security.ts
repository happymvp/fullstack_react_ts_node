import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";

export const securityMiddlewares = (app) => {
    // Helmet for setting secure HTTP headers
    app.use(helmet());

    // CORS: Allow safe cross-origin requests
    app.use(cors({ origin: process.env.HOST, optionsSuccessStatus: 200 }));

    // Rate limiting: Prevent brute-force attacks
    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
            message: "Too many requests, please try again later.",
        })
    );
};
