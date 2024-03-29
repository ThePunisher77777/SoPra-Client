import {Spinner} from "../ui/Spinner";
import FormField from "./FormField";
import {Button} from "../ui/Button";
import {api} from "../../helpers/api";
import {useHistory} from "react-router-dom";
import Logout from "./Logout";
import "../../styles/views/ProfilePageEditProfile.scss";
import BaseContainer from "../ui/BaseContainer";

const ProfilePageEditProfile = ({
                                    user,
                                    username,
                                    setUsername,
                                    birthday,
                                    setBirthday,
                                    paramsUserId,
                                    setIsInEditMode
                                }) => {
    const history = useHistory();

    const updateUser = async () => {
        try {
            const requestBody = JSON.stringify({username, birthday})
            await api.put(`/users/${paramsUserId}`, requestBody, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            setIsInEditMode(false)
            history.push(`/users/${paramsUserId}`)
        } catch (error) {
            if (error.response.status === 400) {
                alert('Username field must contain a username.')
            }
            if (error.response.status === 409) {
                alert('Username already taken.')
            }
        }
    }

    const returnToProfile = async () => {
        await api.get(`/users/` + paramsUserId, {
            params: {
                userId: paramsUserId
            },
            headers: {
                token: localStorage.getItem('token')
            }
        });
        setIsInEditMode(false)
        history.push(`/users/${paramsUserId}`)
    }

    return (
        <BaseContainer className="users-overview container">
            <h2>Edit your profile</h2>
            <div className="edit-user-details">
                {!user && <Spinner/>}
                {user && <>
                    <FormField
                        type="text"
                        label="Username"
                        placeholder={user.username}
                        value={username}
                        onChange={(u) => setUsername(u)}
                    />
                    <FormField
                        type="date"
                        label="Birthday"
                        placeholder={user.birthday}
                        value={birthday}
                        onChange={(b) => setBirthday(b)}
                    />
                    <div className="navigation">
                        <Button width="10rem" onClick={() => returnToProfile()}>
                            Back
                        </Button>
                        <Button width="10rem" onClick={() => updateUser()}>
                            Save
                        </Button>
                    </div>
                </>
                }
            </div>
            <Logout/>
        </BaseContainer>
    )
};

export default ProfilePageEditProfile;