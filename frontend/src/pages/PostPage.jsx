import { useGetPostById } from "../api/query";
import { useParams } from "react-router-dom";
import Post from "../components/post";


const PostPage = ({ authUser }) => {

    const { postId } = useParams();

    const { data: post, isLoading } = useGetPostById(postId);


    if (isLoading) return <div>Loading post...</div>;
    if (!post) return <div>Post not found</div>;


    return (
        <div className='col-span-1 lg:col-span-3'>
            <Post post={post} authUser={authUser} />
        </div>
    );
}

export default PostPage