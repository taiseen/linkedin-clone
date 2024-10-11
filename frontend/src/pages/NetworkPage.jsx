import ConnectionRequest from "../components/network/ConnectionRequest";
import MyConnections from "../components/network/MyConnections";


const NetworkPage = ({ authUser }) => {

    return (
        <div className='col-span-1 lg:col-span-3'>
            <div className='bg-secondary rounded-lg shadow p-6 mb-6'>

                <h1 className='text-2xl font-bold mb-6'>My Network</h1>

                <ConnectionRequest authUser={authUser} />

                <MyConnections />

            </div>
        </div>
    )
}

export default NetworkPage