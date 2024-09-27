import markNotificationAsRead from "../controllers/markNotificationAsRead.js";
import getUserNotifications from "../controllers/getUserNotifications.js";
import deleteNotification from "../controllers/deleteNotification.js";
import protectedRoute from "../../../middleware/protectedRoute.js";
import express from "express";


const router = express.Router();

router.get("/", protectedRoute, getUserNotifications);

router.put("/:id/read", protectedRoute, markNotificationAsRead);

router.delete("/:id", protectedRoute, deleteNotification);


export default router;
