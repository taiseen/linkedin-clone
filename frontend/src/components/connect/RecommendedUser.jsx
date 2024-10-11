import ConnectionButton from "./ConnectionButton";
import route from "../../routes";
import { Link } from "react-router-dom";


const RecommendedUser = ({ friend }) => {

    
    return (
        <div className='flex items-center justify-between mb-4'>

            <Link
                to={`${route.profile}${friend.userName}`}
                className='flex items-center flex-grow'
            >
                <img
                    src={friend.profilePicture || "/avatar.png"}
                    alt={friend.name}
                    className='w-12 h-12 rounded-full mr-3'
                />

                <div>
                    <h3 className='font-semibold text-sm'>{friend.name}</h3>
                    <p className='text-xs text-info'>{friend.headline}</p>
                </div>
            </Link>

            <ConnectionButton friendId={friend._id} />

        </div>
    )
}

export default RecommendedUser