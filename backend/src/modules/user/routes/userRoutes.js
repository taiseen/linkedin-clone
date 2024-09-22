import getSuggestedConnections from "../controllers/getSuggestedConnections.js";
import protectedRoute from "../../../middleware/protectedRoute.js";
import getPublicProfile from "../controllers/getPublicProfile.js";
import updateProfile from "../controllers/updateProfile.js";
import express from "express";


const router = express.Router();


router.get("/suggestions", protectedRoute, getSuggestedConnections);

router.get("/:userName", protectedRoute, getPublicProfile);

router.put("/profile", protectedRoute, updateProfile);


export default router;
