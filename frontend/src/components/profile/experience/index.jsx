import InputExperience from "./InputExperience";
import ShowExperience from "./ShowExperience";
import { useForm } from "react-hook-form";
import { useState } from "react";


const Experience = ({ userData, isOwnProfile, onSaveToDB }) => {

    const [experiences, setExperiences] = useState(userData.experience || []);
    const [isAddToggling, setIsAddToggling] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateId, setupdateId] = useState(null);

    const { register, handleSubmit, setValue, reset, watch } = useForm();

    const isCurrentlyWorking = watch('isCurrentlyWorking');


    const handleAddOrUpdateExperience = (dataObj) => {

        if (dataObj.isCurrentlyWorking) {
            dataObj.endDate = '';
        }

        const experienceInfo = isUpdate
            ? experiences.map((obj, idx) => (obj._id === updateId || idx === updateId) ? dataObj : obj)
            : [...experiences, dataObj]

        setExperiences(experienceInfo);

        onSaveToDB({ experience: experienceInfo });
        handleCancleClick();

        setValue('isCurrentlyWorking', false);
        setIsUpdate(false);
        reset();
    };


    const handleCancleClick = () => {
        setIsAddToggling(false);
        setIsUpdate(false);
        setupdateId(null);
        reset();
    };


    return (
        <div className='bg-white shadow rounded-lg p-6 mb-6'>

            <h2 className='text-xl font-semibold mb-4'>Experience</h2>

            {
                experiences.map((exp, idx) =>
                    <ShowExperience
                        key={idx}
                        idx={idx}
                        exp={exp}
                        setValue={setValue}
                        onSaveToDB={onSaveToDB}
                        experiences={experiences}
                        setIsUpdate={setIsUpdate}
                        setupdateId={setupdateId}
                        isAddToggling={isAddToggling}
                        setExperiences={setExperiences}
                    />
                )
            }

            {
                isAddToggling && <InputExperience
                    register={register}
                    isUpdate={isUpdate}
                    handleSubmit={handleSubmit}
                    handleCancleClick={handleCancleClick}
                    isCurrentlyWorking={isCurrentlyWorking}
                    handleAddOrUpdateExperience={handleAddOrUpdateExperience}
                />
            }

            {
                isOwnProfile && !isAddToggling && (
                    <button
                        onClick={() => setIsAddToggling(true)}
                        className='mt-4 text-primary hover:text-primary-dark transition duration-300'
                    >
                        Add Experiences
                    </button>
                )
            }
        </div>
    );
};

export default Experience;


