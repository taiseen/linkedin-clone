import { Edit, School, X } from "lucide-react";


const ShowEducation = ({
    idx, edu, educations, setEducations, isAddToggling,
    onSaveToDB, setIsUpdate, setUpdateId, setValue
}) => {


    const handleUpdateEducation = (eduObj, id) => {
        setIsUpdate(true);
        setUpdateId(id);

        setValue('school', eduObj.school);
        setValue('fieldOfStudy', eduObj.fieldOfStudy);
        setValue('startYear', eduObj.startYear);
        setValue('endYear', eduObj.endYear);
    }


    const handleDeleteEducation = (id) => {

        if (confirm("Are you sure you want to delete this education?")) {

            const afterEduDelete = educations.filter((edu, idx) => {
                // if edu._id is not provided, then idx is used
                return edu._id ? edu._id !== id : idx !== id
            });

            setEducations(afterEduDelete); // ui will be updated
            onSaveToDB({ education: afterEduDelete }); // db will be updated
        }
    }


    return (
        <div className='mb-4 flex justify-between items-start'>

            <div className='flex items-start'>
                <School size={20} className='mr-2 mt-1' />

                <div>
                    <h3 className='font-semibold'>{edu.fieldOfStudy}</h3>
                    <p className='text-gray-600'>{edu.school}</p>
                    <p className='text-gray-500 text-sm'>
                        {edu.startYear} - {edu.endYear || "Present"}
                    </p>
                </div>
            </div>

            {
                isAddToggling && (
                    <div className="flex gap-2">
                        <button
                            className='text-blue-500'
                            onClick={() => handleUpdateEducation(edu, edu._id || idx)}
                        >
                            <Edit size={20} />
                        </button>

                        <button
                            className='text-red-500'
                            onClick={() => handleDeleteEducation(edu._id || idx)}
                        >
                            <X size={20} />
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default ShowEducation