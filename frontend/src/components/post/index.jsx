import PostActionContainer from "./PostActionContainer";
import PostComment from "./PostComment";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import { useState } from "react";


const Post = ({ post, authUser }) => {

    const [isCommentOpen, setIsCommentOpen] = useState(false);

    const isOwner = authUser._id === post.author._id;
    const isLiked = post.likes.includes(authUser._id);


    return (
        <div className='bg-secondary rounded-lg shadow mb-4'>

            <div className='p-4'>
                <PostHeader post={post} isOwner={isOwner} />

                <PostBody post={post} />

                <PostActionContainer
                    post={post}
                    isLiked={isLiked}
                    setIsCommentOpen={() => setIsCommentOpen(!isCommentOpen)}
                />
            </div>

            {
                isCommentOpen && <PostComment post={post} authUser={authUser} />
            }

        </div>
    )
}

export default Post