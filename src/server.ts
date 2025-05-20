import "reflect-metadata";
import "dotenv/config";
import App from "./app";
import dotenv from "dotenv";
import AuthRoute from "./modules/auth/auth.route";
import UserRoute from "./modules/user/user.route";
import MemorialRoute from "./modules/memorial/memorial.route";
import passport from "./config/passport";
import authRoutes from "./routes/auth.routes";

dotenv.config();
const routes = [new AuthRoute(), new UserRoute(), new MemorialRoute()];
const app = new App(routes);

// // Initialize Passport
// app.app.use(passport.initialize());

// // Add OAuth routes
// app.app.use('/api/auth', authRoutes);

app.listen();
