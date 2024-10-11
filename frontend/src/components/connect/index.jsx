import { useGetRecommendedUsers } from "../../api/query";
import RecommendedUser from "./RecommendedUser";


const RecommendedUserList = () => {

    const { data: recommendedUsers } = useGetRecommendedUsers();

    return (
        <div className='col-span-1 lg:col-span-1 lg:block'>
            <div className='bg-secondary rounded-lg shadow p-4'>

                <h2 className='font-semibold mb-4'>People you may know</h2>
                
                {
                    recommendedUsers?.length > 0 &&
                    recommendedUsers?.map((friend) => <RecommendedUser key={friend._id} friend={friend} />)
                }
            </div>
        </div>
    )
}

export default RecommendedUserList