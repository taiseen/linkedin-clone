import { useDeletePost } from "../../api/mutation";
import { formatDistanceToNow } from "date-fns";
import { Loader, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import route from "../../routes";


const PostHeader = ({ post, isOwner }) => {

    const postAuthorUrl = `${route.profile}${post?.author?.userName}`;

    const { mutate: deletePost, isPending: isDeletingPost } = useDeletePost();

    const handleDeletePost = () => {
        if (!window.confirm("Are you sure, want to delete this post?")) return;

        deletePost(post._id); // delete operation by react-query lib...
    };


    return (
        <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center'>

                <Link to={postAuthorUrl}>
                    <img
                        src={post.author.profilePicture || "/avatar.png"}
                        alt={post.author.name}
                        className='size-10 rounded-full mr-3'
                    />
                </Link>

                <div>
                    <Link to={postAuthorUrl}>
                        <h3 className='font-semibold'>{post.author.name}</h3>
                    </Link>

                    <p className='text-xs text-info'>{post.author.headline}</p>
                    <p className='text-xs text-info'>
                        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                    </p>
                </div>
            </div>

            {
                isOwner && (
                    <button onClick={handleDeletePost} className='text-red-500 hover:text-red-700'>
                        {
                            isDeletingPost
                                ? <Loader size={18} className='animate-spin' />
                                : <Trash2 size={18} />
                        }
                    </button>
                )
            }
        </div>
    )
}

export default PostHeader