import React, {useEffect, useState} from 'react';
import {api} from 'helpers/api';
import {useHistory, useParams} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import ProfilePageEditProfile from "./ProfilePageEditProfile";
import ProfilePageUserDetails from "./ProfilePageUserDetails";


const ProfilePage = () => {
    const params = useParams();
    const history = useHistory();

    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [birthday, setBirthday] = useState("");
    const [isInEditMode, setIsInEditMode] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get(`/users/` + params.userId, {
                    params: {
                        userId: params.userId
                    },
                    headers: {
                        token: localStorage.getItem('token')
                    }
                });
                setUser({...response.data, token: response.headers['token']});
            } catch (error) {
                if (error.response.status === 401) {
                    history.push('/login');
                } else if (error.response.status === 404) {
                    alert('User not found')
                    history.push('/users');
                } else {
                    console.log(error)
                }
            }
        }
        fetchData();
    }, [history, params.userId, isInEditMode]);

    return (<BaseContainer className="game container">
            {isInEditMode ?
                <ProfilePageEditProfile
                    user={user}
                    username={username}
                    birthday={birthday}
                    setBirthday={setBirthday}
                    setUsername={setUsername}
                    paramsUserId={params.userId}
                    setIsInEditMode={setIsInEditMode}
                />
                    :
                <ProfilePageUserDetails
                    user={user}
                    setIsInEditMode={setIsInEditMode}
                    paramsUserId={params.userId}
                />
            }
        </BaseContainer>);
}

export default ProfilePage;
