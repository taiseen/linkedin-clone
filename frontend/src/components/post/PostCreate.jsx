import { useCreatePost } from "../../api/mutation";
import { Image, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


const PostCreate = ({ user }) => {

    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm(); // custom hook by lib...

    const { mutate: createPostMutation, isPending } = useCreatePost();

    const [imageFile, setImageFile] = useState(null);

    const isBtnDisable = isSubmitting || isPending;


    useEffect(() => {
        if (!isPending) {
            setImageFile(null);
            reset();
        };
    }, [isPending, reset])


    const readFileAsDataURL = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };


    const handleImageChange = (e) => setImageFile(e.target.files[0]);


    const handleCreatePost = async (data) => {

        const postData = { ...data, image: imageFile };

        try {
            // if image is uploaded, then convert it to base64...
            if (postData.image) postData.image = await readFileAsDataURL(imageFile);

            createPostMutation(postData);

        } catch (error) {
            console.error("Error in handlePostCreation:", error);
        }
    }


    return (
        <form
            onSubmit={handleSubmit(handleCreatePost)}
            className='bg-secondary rounded-lg shadow mb-4 p-4'
        >
            <div className='flex space-x-3'>
                <img
                    alt={user.name}
                    src={user.profilePicture || "/avatar.png"}
                    className='size-12 rounded-full'
                />

                <textarea
                    className='createPostTextBox'
                    placeholder="What's on your mind?"
                    {...register("content", { required: true })}
                />
            </div>

            {
                imageFile && (
                    <div className='mt-4'>
                        <img
                            alt='Selected'
                            src={URL.createObjectURL(imageFile)}
                            className='w-full h-auto rounded-lg'
                        />
                    </div>
                )
            }

            <div className='flex justify-between items-center mt-4'>
                <div className='flex space-x-4'>
                    <label className='imgInputLabel hover:text-green-600'>
                        <Image size={20} className='mr-2' />
                        <span>Photo</span>
                        <input
                            type="file"
                            accept='image/*'
                            className='hidden'
                            onChange={handleImageChange}
                        />
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={isBtnDisable}
                    className='bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary-dark transition-colors duration-200'
                >
                    {isBtnDisable ? <Loader className='size-5 animate-spin' /> : "Share"}
                </button>
            </div>
        </form>
    );
}

export default PostCreate