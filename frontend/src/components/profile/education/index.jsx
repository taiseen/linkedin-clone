import InputEducation from "./InputEducation";
import ShowEducation from "./ShowEducation";
import { useForm } from "react-hook-form";
import { useState } from "react";


const Education = ({ userData, onSaveToDB, isOwnProfile }) => {

    const [educations, setEducations] = useState(userData.education || []);
    const [isAddToggling, setIsAddToggling] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateId, setUpdateId] = useState(null);

    const { register, handleSubmit, setValue, reset } = useForm();


    const handleAddOrUpdateEducation = async (dataObj) => {

        const experienceInfo = isUpdate
            ? educations.map((obj, idx) => (obj._id === updateId || idx === updateId) ? dataObj : obj)
            : [...educations, dataObj]

        setEducations(experienceInfo); // ui will be updated
        onSaveToDB({ education: experienceInfo }); // db will be updated

        handleCancleClick();
        setIsUpdate(false);
        reset();
    };


    const handleCancleClick = () => {
        setIsAddToggling(false);
        setIsUpdate(false);
        setUpdateId(null);
        reset();
    };


    return (
        <div className='bg-white shadow rounded-lg p-6 mb-6'>

            <h2 className='text-xl font-semibold mb-4'>Education</h2>

            {
                educations.map((edu, idx) =>
                    <ShowEducation
                        key={idx}
                        idx={idx}
                        edu={edu}
                        setValue={setValue}
                        onSaveToDB={onSaveToDB}
                        educations={educations}
                        setIsUpdate={setIsUpdate}
                        setUpdateId={setUpdateId}
                        isAddToggling={isAddToggling}
                        setEducations={setEducations}
                    />
                )
            }

            {
                isAddToggling && <InputEducation
                    register={register}
                    isUpdate={isUpdate}
                    handleSubmit={handleSubmit}
                    handleCancleClick={handleCancleClick}
                    handleAddOrUpdateEducation={handleAddOrUpdateEducation}
                />
            }

            {
                isOwnProfile && !isAddToggling && (
                    <button
                        onClick={() => setIsAddToggling(true)}
                        className='mt-4 text-primary hover:text-primary-dark transition duration-300'
                    >
                        Add Education
                    </button>
                )
            }
        </div>
    )
}

export default Education