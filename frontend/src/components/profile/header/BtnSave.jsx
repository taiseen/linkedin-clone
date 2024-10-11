const BtnSave = ({ isEditing, handleSave, setIsEditing }) => {

    return isEditing ? (
        <button
            onClick={handleSave}
            className='w-full bg-primary text-white py-2 px-4 rounded-full hover:bg-primary-dark
             transition duration-300'
        >
            Save Profile
        </button>
    ) : (
        <button
            onClick={() => setIsEditing(true)}
            className='w-full bg-primary text-white py-2 px-4 rounded-full hover:bg-primary-dark
             transition duration-300'
        >
            Edit Profile
        </button>
    )
}

export default BtnSave