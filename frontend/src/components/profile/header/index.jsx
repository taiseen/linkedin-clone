import ProfilePicture from "./ProfilePicture";
import BtnConnection from "./BtnConnection";
import BannerImg from "./BannerImg";
import Headline from "./Headline";
import Location from "./Location";
import BtnSave from "./BtnSave";
import Name from "./Name";

import { useState } from "react";


const ProfileHeader = ({ userData, authUser, onSaveToDB, isOwnProfile }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({});

    const isConnected = userData.connections.some(conId => conId === authUser._id);


    const handleSave = () => {
        onSaveToDB(editedData);
        setIsEditing(false);
    };


    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setEditedData((prev) => ({ ...prev, [event.target.name]: reader.result }));
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className='bg-white shadow rounded-lg mb-6'>

            <BannerImg
                userData={userData}
                isEditing={isEditing}
                editedData={editedData}
                handleImageChange={handleImageChange}
            />

            <div className='p-4'>

                <ProfilePicture
                    userData={userData}
                    isEditing={isEditing}
                    editedData={editedData}
                    handleImageChange={handleImageChange}
                />

                <div className='text-center mb-4'>

                    <Name
                        userData={userData}
                        isEditing={isEditing}
                        editedData={editedData}
                        setEditedData={setEditedData}
                    />

                    <Headline
                        userData={userData}
                        isEditing={isEditing}
                        editedData={editedData}
                        setEditedData={setEditedData}
                    />

                    <Location
                        userData={userData}
                        isEditing={isEditing}
                        editedData={editedData}
                        setEditedData={setEditedData}
                    />

                </div>

                {
                    isOwnProfile
                        ? <BtnSave
                            isEditing={isEditing}
                            handleSave={handleSave}
                            setIsEditing={setIsEditing}
                        />
                        : <BtnConnection userData={userData} isConnected={isConnected} />
                }

            </div>
        </div>
    );
}

export default ProfileHeader