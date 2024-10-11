const InputEducation = ({ register, isUpdate, handleCancleClick, handleSubmit, handleAddOrUpdateEducation }) => {

    return (
        <form onSubmit={handleSubmit(handleAddOrUpdateEducation)} className='mt-4'>

            <input
                type='text'
                placeholder='School'
                className='w-full p-2 border rounded mb-2'
                {...register("school", { required: true })}
            />

            <input
                type='text'
                placeholder='Field of Study'
                className='w-full p-2 border rounded mb-2'
                {...register("fieldOfStudy", { required: true })}
            />

            <input
                type='number'
                placeholder='Start Year'
                className='w-full p-2 border rounded mb-2'
                {...register("startYear", { required: true })}
            />

            <input
                type='number'
                placeholder='End Year'
                className='w-full p-2 border rounded mb-2'
                {...register("endYear")}
            />

            <button
                type='submit'
                className={`text-white py-2 px-4 rounded transition duration-300 
                ${isUpdate ? 'bg-orange-400 hover:bg-orange-500' : 'bg-primary hover:bg-primary-dark'}`}
            >
                {isUpdate ? 'Update' : 'Add'} Education
            </button>

            <button
                type='reset'
                onClick={handleCancleClick}
                className='bg-info text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300 ml-2'
            >
                Cancle
            </button>
        </form>
    )
}

export default InputEducation