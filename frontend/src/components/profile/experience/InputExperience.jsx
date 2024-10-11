

const InputExperience = ({
    register, isCurrentlyWorking, isUpdate, handleSubmit,
    handleAddOrUpdateExperience, handleCancleClick
}) => {

    return (
        <form onSubmit={handleSubmit(handleAddOrUpdateExperience)} className='mt-4'>

            <input
                type='text'
                placeholder='Title'
                {...register('title', { required: true })}
                className='w-full p-2 border rounded mb-2'
            />

            <input
                type='text'
                placeholder='Company'
                {...register('company', { required: true })}
                className='w-full p-2 border rounded mb-2'
            />

            <input
                type='date'
                {...register('startDate', { required: true })}
                className='w-full p-2 border rounded mb-2'
            />

            <div className='flex items-center mb-2'>
                <label className="flex items-center">
                    <input
                        type='checkbox'
                        className='mr-2'
                        {...register('isCurrentlyWorking')}
                    />
                    I currently work here
                </label>
            </div>

            {
                !isCurrentlyWorking && (
                    <input
                        type='date'
                        {...register('endDate', { required: true })}
                        className='w-full p-2 border rounded mb-2'
                    />
                )
            }

            <textarea
                placeholder='Description'
                {...register('description')}
                className='w-full p-2 border rounded mb-2'
            />

            <button
                type='submit'
                className={`text-white py-2 px-4 rounded transition duration-300 
                ${isUpdate ? 'bg-orange-400 hover:bg-orange-500' : 'bg-primary hover:bg-primary-dark'}`
                }
            >
                {isUpdate ? 'Update' : 'Add'} Experience
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

export default InputExperience