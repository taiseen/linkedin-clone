import Experience from "../components/profile/experience";
import ProfileHeader from "../components/profile/header";
import Education from "../components/profile/education";
import LoadingSpinner from "../utils/LoadingSpinner";
import Skills from "../components/profile/Skills";
import About from "../components/profile/About";

import { useUpdateProfile } from "../api/mutation";
import { useGetUserProfile } from "../api/query";
import { useParams } from "react-router-dom";



const ProfilePage = ({ authUser }) => {

    const { userName } = useParams();

    const { data: userProfile, isLoading: isUserProfileLoading } = useGetUserProfile(userName);

    const { mutate: updateProfile } = useUpdateProfile(userName);


    if (isUserProfileLoading) return <LoadingSpinner />; // its very helpful to show loading


    const isOwnProfile = authUser?.userName === userProfile?.userName;
    const userData = isOwnProfile ? authUser : userProfile;


    const handleSaveToDB = (updatedData) => updateProfile(updatedData);


    return (
        <div>
            <ProfileHeader userData={userData} isOwnProfile={isOwnProfile} onSaveToDB={handleSaveToDB} authUser={authUser} />
            <About userData={userData} isOwnProfile={isOwnProfile} onSaveToDB={handleSaveToDB} />
            <Experience userData={userData} isOwnProfile={isOwnProfile} onSaveToDB={handleSaveToDB} />
            <Education userData={userData} isOwnProfile={isOwnProfile} onSaveToDB={handleSaveToDB} />
            <Skills userData={userData} isOwnProfile={isOwnProfile} onSaveToDB={handleSaveToDB} />
        </div>
    )
}

export default ProfilePage