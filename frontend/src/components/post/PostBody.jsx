import { Link } from "react-router-dom";
import route from "../../routes";


const PostBody = ({ post }) => {

    return (
        <Link to={`${route.post}${post._id}`}>

            <p className='mb-4'>{post.content}</p>

            {
                post.image &&
                <img
                    src={post.image}
                    alt='Post content'
                    className='rounded-lg w-full mb-4'
                />
            }

        </Link>
    )
}

export default PostBody