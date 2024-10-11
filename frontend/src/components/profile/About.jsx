import { useForm } from "react-hook-form";
import { useState } from "react";


const About = ({ userData, isOwnProfile, onSaveToDB }) => {

    const [isEditing, setIsEditing] = useState(false);

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            about: userData.about || "",
        },
    });


    const handelCancleBtnClick = () => {
        reset({ about: userData.about }); // Reset to original value
        setIsEditing(false); // Close edit mode
    }


    const onSubmit = (data) => {
        onSaveToDB(data);
        setIsEditing(false); // Exit editing mode after saving
    };


    return (
        <div className='bg-white shadow rounded-lg p-6 mb-6'>

            <h2 className='text-xl font-semibold mb-4'>About</h2>

            {
                isOwnProfile && isEditing ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <textarea
                                rows='4'
                                {...register("about")}
                                className='w-full p-2 border rounded'
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                type="submit"
                                className='mt-2 text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300 bg-primary'
                            >
                                Save
                            </button>

                            <button
                                type="button"
                                onClick={handelCancleBtnClick}
                                className='mt-2 text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300 bg-info'
                            >
                                Close
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <p>{userData.about}</p>

                        {
                            isOwnProfile && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className='mt-2 text-primary hover:text-primary-dark transition duration-300'
                                >
                                    Edit
                                </button>
                            )
                        }
                    </>
                )
            }
        </div>
    );
};

export default About;
