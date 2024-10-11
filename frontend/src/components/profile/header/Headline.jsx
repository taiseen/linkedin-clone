const Headline = ({ isEditing, editedData, userData, setEditedData }) => {

    return isEditing
        ? (
            <input
                type='text'
                className='text-gray-600 text-center w-full'
                value={editedData.headline ?? userData.headline}
                onChange={(e) => setEditedData({ ...editedData, headline: e.target.value })}
            />
        ) : (
            <p className='text-gray-600'>{userData.headline}</p>
        )

}

export default Headline;