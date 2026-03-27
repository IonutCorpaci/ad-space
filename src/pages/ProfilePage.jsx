import {useContext, useEffect, useState} from "react";
import { AuthContext } from "../context/Auth/AuthContext.jsx";
import {Navigate} from "react-router";
import ProfileActionsSection from "../components/ProfileSections/ProfileActionsSection.jsx";
import PersonalInfoSection from "../components/ProfileSections/PersonalInfoSection.jsx";
import ProfileHeaderSection from "../components/ProfileSections/ProfileHeaderSection.jsx";

const ProfilePage = () => {
    const { user, logout } = useContext(AuthContext);



    if (!user) return <Navigate to="/" />;

    return (
        <div className="min-h-screen bg-gray-50">
            <ProfileHeaderSection user={user} />
            <div className="container mx-auto px-4 mt-6 pb-10">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    <PersonalInfoSection user={user}/>
                    <ProfileActionsSection logout={logout}/>

                </div>
            </div>
        </div>
    );
};

export default ProfilePage;