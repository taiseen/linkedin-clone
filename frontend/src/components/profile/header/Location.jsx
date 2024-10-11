import { MapPin } from "lucide-react"

const Location = ({ isEditing, editedData, userData, setEditedData }) => {

    return (
        <div className='flex justify-center items-center mt-2'>

            <MapPin size={16} className='text-gray-500 mr-1' />

            {
                isEditing ? (
                    <input
                        type='text'
                        className='text-gray-600 text-center'
                        value={editedData.location ?? userData.location}
                        onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
                    />
                ) : (
                    <span className='text-gray-600'>{userData.location}</span>
                )
            }
        </div>
    )
}

export default Location