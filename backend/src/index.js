import notificationRoutes from "./modules/notification/routes/notificationRoutes.js";
import connectionRoutes from "./modules/connectRequest/routes/connectionRoutes.js";
import userRoutes from "./modules/user/routes/userRoutes.js";
import authRoutes from "./modules/auth/routes/authRoutes.js";
import postRoutes from "./modules/post/routes/postRoutes.js";
import routeNotFound from './helpers/routeNotFound.js';
import cookieParser from "cookie-parser";
import config from './config/index.js';
import dbCon from './connection/db.js';
import express from 'express';
import cors from 'cors';


const app = express();
const publicDir = 'public';



app.use(express.json({ limit: "5mb" })); // allows us to parse incoming req.body into json...
app.use(express.static(publicDir)); // Serve static files from the 'public' directory

app.use(cookieParser()); // allows us to parse incoming cookies...

app.use(cors({ origin: config.clientUrl, credentials: true }));





app.use('/api/v1/auth', authRoutes);

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/posts", postRoutes);

app.use("/api/v1/connections", connectionRoutes);

app.use("/api/v1/notifications", notificationRoutes);





// ✅ Default welcome message at root/index page...
app.get('/', (_, res) => res.sendFile(path.join(__dirname, publicDir, 'index.html')));


// ✅ url checking...
app.use('/test', (_, res) => res.json({ message: 'Hello Testing... | Api Working... ✅' }));


// 🚩 | 404 | Route Not Found, must call at last of the application...
app.use('/', routeNotFound);


// Error handling middleware (should be last)
app.use((err, req, res, next) => {
    const errorStack = err.stack
    console.error({ errorStack });
    res.status(500).json({ message: 'Something broke!' });
});


app.listen(config.port, () => {
    console.log('Server Start On Port :', config.port, '🟩');
    dbCon();
});