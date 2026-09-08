import { useAuth } from '../contexts/AuthContext.jsx';
import { useState, useEffect } from 'react';

export default function ProfilePage() {

    const { user, token } = useAuth();
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {

        async function fetchUserProfile() {
            try {
                const response = await fetch('/api/profile', {
                    headers: {
                        'X-CSRF-TOKEN': token,
                    },
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setProfileData(data);
                } else {
                    throw new Error('Failed to fetch user profile');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        }
        
        if (token) {
            fetchUserProfile();
        }
    }, [token]);

    return (
        <div>
            <h1>Profile</h1>
            <p>Welcome, {user?.name}!</p>
            <p>Total tasks: {profileData?.totalTasks}</p>
            <p>Completed tasks: {profileData?.completedTasks}</p>
            <p>Active tasks: {profileData?.totalTasks - profileData?.completedTasks}</p>
        </div>
    )
}