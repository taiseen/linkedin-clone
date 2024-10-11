import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import route from "../../routes";


const NotifiedPost = ({ relatedPost }) => {

    if (!relatedPost) return null;

    return (
        <Link
            to={`${route.post}${relatedPost._id}`}
            className='mt-2 p-2 bg-gray-50 rounded-md flex items-center space-x-2 hover:bg-gray-100 transition-colors group'
        >
            {
                relatedPost.image && (
                    <img
                        alt='Post preview'
                        src={relatedPost.image}
                        className='w-10 h-10 object-cover rounded'
                    />
                )
            }

            <div className='flex-1 overflow-hidden'>
                <p className='text-sm text-gray-600 truncate'>{relatedPost.content}</p>
            </div>

            <ExternalLink size={14} className='text-gray-400 group-hover:text-orange-500' />
        </Link>
    );
}

export default NotifiedPost