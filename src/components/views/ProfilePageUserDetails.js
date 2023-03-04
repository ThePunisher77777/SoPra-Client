import {Spinner} from "../ui/Spinner";
import {Button} from "../ui/Button";
import {useHistory} from "react-router-dom";
import Logout from "./Logout";

const ProfilePageUserDetails = ({user, setIsInEditMode, paramsUserId}) => {
    const history = useHistory()

    const renderEditProfileButton = () => {
        return ((localStorage.getItem('token') === user?.token) &&
            <Button onClick={() => setIsInEditMode(true)}>Edit profile</Button>)
    }

    return (
        <>
            {!user && <Spinner/>}
            {user && <>
                {renderEditProfileButton()}
                <div>Username: {user.username}</div>
                <div>Online Status: {user.status}</div>
                <div>Creation Date: {user.creationDate}</div>
                <div>Birthday: {user.birthday}</div>
                <Button onClick={() => history.push('/users')}>
                    Back
                </Button>
            </>}
            <Logout />
        </>
    )
};

export default ProfilePageUserDetails;