import protectedRoute from "../../../middleware/protectedRoute.js";
import createComment from "../controllers/createComment.js";
import getFeedPosts from "../controllers/getFeedPosts.js";
import getPostById from "../controllers/getPostById.js";
import createPost from "../controllers/createPost.js";
import deletePost from "../controllers/deletePost.js";
import likePost from "../controllers/likePost.js";
import express from "express";


const router = express.Router();


router.get("/", protectedRoute, getFeedPosts);
router.get("/:id", protectedRoute, getPostById);

router.post("/create", protectedRoute, createPost);
router.post("/:id/like", protectedRoute, likePost);
router.post("/:id/comment", protectedRoute, createComment);

router.delete("/delete/:id", protectedRoute, deletePost);


export default router;
