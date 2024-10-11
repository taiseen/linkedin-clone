import { useNetworkRequestAccept, useNetworkRequestReject } from "../../api/mutation";
import { Link } from "react-router-dom";
import route from "../../routes";


const FriendRequest = ({ request }) => {

    const { mutate: acceptRequest } = useNetworkRequestAccept(request.sender._id);
    const { mutate: rejectRequest } = useNetworkRequestReject(request.sender._id);

    const senderUrl = `${route.profile}${request.sender.userName}`;


    return (
        <div className='bg-white rounded-lg shadow p-4 flex md:items-center justify-between transition-all hover:shadow-md'>

            <div className='md:flex items-center gap-4'>
                <Link to={senderUrl}>
                    <img
                        alt={request.name}
                        src={request.sender.profilePicture || "/avatar.png"}
                        className='w-16 h-16 rounded-full object-cover'
                    />
                </Link>

                <div>
                    <Link to={senderUrl} className='font-semibold text-lg'>
                        {request.sender.name}
                    </Link>
                    <p className='text-gray-600'>{request.sender.headline}</p>
                </div>
            </div>


            <div className='space-x-2'>
                <button
                    onClick={() => acceptRequest(request._id)}
                    className='bg-primary text-white px-2 md:px-4 py-2 rounded-md hover:bg-primary-dark transition-colors'
                >
                    Accept
                </button>

                <button
                    onClick={() => rejectRequest(request._id)}
                    className='bg-gray-200 text-gray-800 px-2 md:px-4 py-2 rounded-md hover:bg-gray-300 transition-colors'
                >
                    Reject
                </button>
            </div>
        </div>
    )
}

export default FriendRequest