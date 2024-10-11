import { Camera } from "lucide-react"


const ProfilePicture = ({ editedData, userData, isEditing, handleImageChange }) => {

    return (
        <div className='relative -mt-20 mb-4'>

            <img
                alt={userData.name}
                className='w-32 h-32 rounded-full mx-auto object-cover'
                src={editedData.profilePicture || userData.profilePicture || "/avatar.png"}
            />

            {
                isEditing && (
                    <label className='absolute bottom-0 right-1/2 transform translate-x-16 bg-white p-2 rounded-full shadow cursor-pointer'>
                        <Camera size={20} />

                        <input
                            type='file'
                            accept='image/*'
                            className='hidden'
                            name='profilePicture'
                            onChange={handleImageChange}
                        />
                    </label>
                )
            }
        </div>
    )
}

export default ProfilePicture