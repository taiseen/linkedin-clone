import RecommendedUserList from "../components/connect";
import PostCreate from "../components/post/PostCreate";
import PostEmpty from "../components/post/PostEmpty";
import Post from "../components/post";
import { useGetPosts } from "../api/query";


const HomePage = ({ authUser }) => {

	const { data: posts } = useGetPosts();

	return (
		<>
			<div className='col-span-1 lg:col-span-2 order-first lg:order-none'>

				<PostCreate user={authUser} />

				{
					posts?.length > 0
						? posts?.map((post) => <Post key={post._id} post={post} authUser={authUser} />)
						: <PostEmpty />
				}

			</div>

			<RecommendedUserList />
		</>
	);
}

export default HomePage