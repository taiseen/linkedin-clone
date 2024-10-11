import { useGetConnectionRequests } from '../../api/query';
import FriendRequest from './FriendRequest';
import NoConnection from './NoConnection'


const ConnectionRequest = ({ authUser }) => {

    const { data: connectionRequests } = useGetConnectionRequests(authUser);


    return (
        connectionRequests?.length > 0 ? (
            <div className='mb-8'>
                <h2 className='text-xl font-semibold mb-2'>Connection Request</h2>

                <div className='space-y-4'>
                    {
                        connectionRequests.map(request => <FriendRequest key={request._id} request={request} />)
                    }
                </div>
            </div>
        ) : (
            <NoConnection />
        )
    )
}

export default ConnectionRequest