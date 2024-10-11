import { Clock, UserCheck, UserPlus, X } from "lucide-react";
import { useGetConnectionStatus } from "../../../api/query";
import {
    useSendConnectionRequest, useConnectionRequestAccept,
    useConnectionRequestReject, useConnectionDelete,
} from "../../../api/mutation";


const BtnConnection = ({ userData }) => {


    const { data: connectionStatus } = useGetConnectionStatus(userData._id);

    const { mutate: sendConnectionRequest } = useSendConnectionRequest();
    const { mutate: acceptRequest } = useConnectionRequestAccept(userData._id);
    const { mutate: rejectRequest } = useConnectionRequestReject(userData._id);
    const { mutate: removeConnection } = useConnectionDelete();


    const renderConnectionButton = () => {
        const baseClass = "text-white py-2 px-4 rounded-full transition duration-300 flex items-center justify-center";

        switch (connectionStatus?.status) {

            case "connected":
                return (
                    <div className='flex gap-2 justify-center'>
                        <div className={`${baseClass} bg-green-500 hover:bg-green-600`}>
                            <UserCheck size={20} className='mr-2' />
                            Connected
                        </div>

                        <button
                            className={`${baseClass} bg-red-500 hover:bg-red-600 text-sm`}
                            onClick={() => removeConnection(userData._id)}
                        >
                            <X size={20} className='mr-2' />
                            Remove Connection
                        </button>
                    </div>
                );

            case "pending":
                return (
                    <button className={`${baseClass} bg-yellow-500 hover:bg-yellow-600`}>
                        <Clock size={20} className='mr-2' />
                        Pending
                    </button>
                );

            case "received":
                return (
                    <div className='flex gap-2 justify-center'>
                        <button
                            onClick={() => acceptRequest(connectionStatus.requestId)}
                            className={`${baseClass} bg-green-500 hover:bg-green-600`}
                        >
                            Accept
                        </button>
                        <button
                            onClick={() => rejectRequest(connectionStatus.requestId)}
                            className={`${baseClass} bg-red-500 hover:bg-red-600`}
                        >
                            Reject
                        </button>
                    </div>
                );

            default:
                return (
                    <button
                        onClick={() => sendConnectionRequest(userData._id)}
                        className='bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-full transition duration-300 flex items-center justify-center'
                    >
                        <UserPlus size={20} className='mr-2' />
                        Connect
                    </button>
                );
        }
    };


    return (
        <div className='flex justify-center'>
            {
                renderConnectionButton()
            }
        </div>
    )
}

export default BtnConnection