import acceptConnectionRequest from "../controller/acceptConnectionRequest.js";
import rejectConnectionRequest from "../controller/rejectConnectionRequest.js";
import sendConnectionRequest from "../controller/sendConnectionRequest.js";
import getConnectionRequests from "../controller/getConnectionRequests.js";
import getConnectionStatus  from "../controller/getConnectionStatus.js";
import getUserConnections from "../controller/getUserConnections.js";
import protectedRoute from "../../../middleware/protectedRoute.js";
import removeConnection from "../controller/removeConnection.js";
import express from "express";

const router = express.Router();


router.post("/request/:userId", protectedRoute, sendConnectionRequest);

router.put("/accept/:requestId", protectedRoute, acceptConnectionRequest);
router.put("/reject/:requestId", protectedRoute, rejectConnectionRequest);

// Get all connection requests for the current user
router.get("/requests", protectedRoute, getConnectionRequests);

// Get all connections for a user
router.get("/", protectedRoute, getUserConnections);
router.get("/status/:userId", protectedRoute, getConnectionStatus);

router.delete("/:userId", protectedRoute, removeConnection);


export default router;
