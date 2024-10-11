import { useCreateComment } from "../../api/mutation";
import { formatDistanceToNow } from "date-fns"
import { Loader, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


const PostComment = ({ post, authUser }) => {

    const { _id, name, profilePicture } = authUser;

    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm(); // custom hook by lib...

    const { mutate: createComment, isPending } = useCreateComment();

    const [liveComments, setLiveComments] = useState(post.comments || []);

    const isBtnDisable = isSubmitting || isPending;


    useEffect(() => {
        if (!isPending) reset();
    }, [isPending, reset])


    const handleAddComment = async (userInput) => {

        const { comment } = userInput;

        if (comment.trim()) {

            createComment({ postId: post._id, comment });

            setLiveComments(pre => [
                ...pre,
                {
                    content: comment,
                    user: { _id, name, profilePicture },
                    createdAt: new Date(),
                }
            ]);
        }
    };


    return (
        <div className='px-4 pb-4'>

            <div className='mb-4 max-h-60 overflow-y-auto'>
                {
                    liveComments.map((comment, idx) => (
                        <div key={idx} className='mb-2 bg-base-100 p-2 rounded flex items-start'>
                            <img
                                alt={comment.user.name}
                                src={comment.user.profilePicture || "/avatar.png"}
                                className='w-8 h-8 rounded-full mr-2 flex-shrink-0'
                            />

                            <div className='flex-grow'>
                                <div className='flex items-center mb-1'>
                                    <span className='font-semibold mr-2'>{comment.user.name}</span>
                                    <span className='text-xs text-info'>
                                        {formatDistanceToNow(new Date(comment.createdAt))}
                                    </span>
                                </div>

                                <p>{comment.content}</p>
                            </div>
                        </div>
                    ))
                }
            </div>


            <form
                onSubmit={handleSubmit(handleAddComment)}
                className='flex items-center'
            >
                <input
                    type='text'
                    placeholder='Add a comment...'
                    {...register("comment", { required: true })}
                    className='flex-grow p-2 rounded-l-full bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary'
                />

                <button
                    type='submit'
                    disabled={isBtnDisable}
                    className='bg-primary text-white p-2.5 rounded-r-full hover:bg-primary-dark transition duration-300'
                >
                    {
                        isBtnDisable
                            ? <Loader size={18} className='animate-spin' />
                            : <Send size={18} />
                    }
                </button>
            </form>
        </div>

    )
}


export default PostComment