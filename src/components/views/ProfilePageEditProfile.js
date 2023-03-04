import {Spinner} from "../ui/Spinner";
import FormField from "./FormField";
import {Button} from "../ui/Button";
import {api} from "../../helpers/api";
import {useHistory} from "react-router-dom";
import Logout from "./Logout";

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

        }
    }

    return (
        <>
            <div>
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
                    <Button width="100%" onClick={() => history.push('/users')}>
                        Back
                    </Button>
                    <Button width="100%" onClick={() => updateUser()}>
                        Save
                    </Button>
                </>
                }
            </div>
            <Logout/>
        </>
    )
};

export default ProfilePageEditProfile;