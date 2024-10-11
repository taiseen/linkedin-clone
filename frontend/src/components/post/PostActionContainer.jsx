import { useLikePost } from '../../api/mutation';
import { MessageCircle, Share2, ThumbsUp } from 'lucide-react';
import PostAction from './PostAction'


const PostActionContainer = ({ post, isLiked, setIsCommentOpen }) => {

    const { mutate: likePost, isPending: isLikingPost } = useLikePost();


    const handleLikePost = async () => {
        if (isLikingPost) return;
        likePost(post._id); // post operation by react-query lib...
    };


    return (
        <div className='flex justify-between text-info'>
            <PostAction
                onClick={handleLikePost}
                text={`Like (${post.likes.length})`}
                icon={
                    <ThumbsUp
                        size={18}
                        className={isLiked ? "text-blue-500  fill-blue-300" : ""}
                    />
                }
            />

            <PostAction
                icon={<MessageCircle size={18} />}
                text={`Comment (${post.comments.length})`}
                onClick={setIsCommentOpen}
            />

            <PostAction text='Share' icon={<Share2 size={18} />} />
        </div>
    )
}

export default PostActionContainer