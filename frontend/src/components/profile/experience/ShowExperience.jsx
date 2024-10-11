import { Briefcase, Edit, X } from "lucide-react"
import dateFormat from "../../../utils/dateFormat"


const ShowExperience = ({
    idx, exp, experiences, setExperiences, isAddToggling,
    onSaveToDB, setIsUpdate, setupdateId, setValue
}) => {

    const handleUpdateExperience = (expObj, id) => {
        setIsUpdate(true);
        setupdateId(id);

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const day = String(date.getDate()).padStart(2, '0');

            return `${year}-${month}-${day}`;
        };

        setValue('title', expObj.title);
        setValue('company', expObj.company);
        setValue('startDate', formatDate(expObj.startDate));
        setValue('endDate', formatDate(expObj.endDate));
        setValue('description', expObj.description);
        setValue('isCurrentlyWorking', expObj.isCurrentlyWorking);
    }


    const handleDeleteExperience = (id) => {
        console.log(id);
        
        if (confirm("Are you sure you want to delete this experience?")) {

            const afterExpDelete = experiences.filter((exp, idx) => {
                // if exp._id is not provided, then idx is used
                return exp._id ? exp._id !== id : idx !== id
            });

            setExperiences(afterExpDelete); // ui will be updated
            onSaveToDB({ experience: afterExpDelete }); // db will be updated
        }
    }


    return (
        <div className='mb-4 flex justify-between items-start'>
            <div className='flex items-start'>
                <Briefcase size={20} className='mr-2 mt-1' />

                <div>
                    <h3 className='font-semibold'>{exp.title}</h3>
                    <p className='text-gray-600'>{exp.company}</p>
                    <p className='text-gray-500 text-sm'>
                        {dateFormat(exp.startDate)} - {exp.endDate ? dateFormat(exp.endDate) : "Present"}
                    </p>
                    <p className='text-gray-700'>{exp.description}</p>
                </div>
            </div>

            {
                isAddToggling && (
                    <div className="flex gap-2">
                        <button
                            className='text-blue-500'
                            onClick={() => handleUpdateExperience(exp, exp._id || idx)}
                        >
                            <Edit size={20} />
                        </button>

                        <button
                            className='text-red-500'
                            onClick={() => handleDeleteExperience(exp._id || idx)}
                        >
                            <X size={20} />
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default ShowExperience