import { useGetConnections } from "../../api/query";
import UserCard from "./UserCard";


const MyConnections = () => {

    const { data: connections } = useGetConnections();

    return (
        connections?.length > 0 && (
            <div className='mb-8'>
                <h2 className='text-xl font-semibold mb-4'>My Connections</h2>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {
                        connections.map(connection =>
                            <UserCard
                                key={connection._id}
                                isConnection={true}
                                user={connection}
                            />
                        )
                    }
                </div>
            </div>
        )
    )
}

export default MyConnections