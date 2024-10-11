import { useConnectionRequestAccept, useConnectionRequestReject, useSendConnectionRequest } from "../../api/mutation";
import { Clock, Check, X, UserCheck, UserPlus } from "lucide-react";
import { useGetConnectionStatus } from "../../api/query";


const ConnectionButton = ({ friendId }) => {

    const { data: connectionStatus, isLoading } = useGetConnectionStatus(friendId);

    const { mutate: sendConnectionRequest } = useSendConnectionRequest();
    const { mutate: acceptRequest } = useConnectionRequestAccept(friendId);
    const { mutate: rejectRequest } = useConnectionRequestReject(friendId);


    const handleSendingConnectRequest = () => {
        if (connectionStatus.status === 'not_connected') {
            sendConnectionRequest(friendId);
        }
    };


    const renderButton = () => {

        if (isLoading) {
            return (
                <button
                    className='px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-500'
                    disabled
                >
                    Loading...
                </button>
            );
        }

        switch (connectionStatus.status) {

            case "pending":
                return (
                    <button
                        className='px-3 py-1 rounded-full text-sm bg-yellow-500 text-white flex items-center'
                        disabled
                    >
                        <Clock size={16} className='mr-1' />
                        Pending
                    </button>
                );

            case "received":
                return (
                    <div className='flex gap-2 justify-center'>
                        <button
                            onClick={() => acceptRequest(connectionStatus.requestId)}
                            className={`rounded-full p-1 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white`}
                        >
                            <Check size={16} />
                        </button>

                        <button
                            onClick={() => rejectRequest(connectionStatus.requestId)}
                            className={`rounded-full p-1 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white`}
                        >
                            <X size={16} />
                        </button>
                    </div>
                );

            case "connected":
                return (
                    <button
                        className='px-3 py-1 rounded-full text-sm bg-green-500 text-white flex items-center'
                        disabled
                    >
                        <UserCheck size={16} className='mr-1' />
                        Connected
                    </button>
                );

            default:
                return (
                    <button
                        className='px-3 py-1 rounded-full text-sm border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-200 flex items-center'
                        onClick={handleSendingConnectRequest}
                    >
                        <UserPlus size={16} className='mr-1' />
                        Connect
                    </button>
                );
        }
    };

    return renderButton();
};

export default ConnectionButton;
