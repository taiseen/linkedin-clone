const Name = ({ isEditing, editedData, userData, setEditedData }) => {

    return isEditing ? (
        <input
            type='text'
            value={editedData.name ?? userData.name}
            className='text-2xl font-bold mb-2 text-center w-full'
            onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
        />
    ) : (
        <h1 className='text-2xl font-bold mb-2'>{userData.name}</h1>
    )
}

export default Name