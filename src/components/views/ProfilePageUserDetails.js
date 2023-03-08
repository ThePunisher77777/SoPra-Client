import {Spinner} from "../ui/Spinner";
import {Button} from "../ui/Button";
import {useHistory} from "react-router-dom";
import Logout from "./Logout";
import "../../styles/views/ProfilePageUserDetails.scss";

const ProfilePageUserDetails = ({user, setIsInEditMode }) => {
    const history = useHistory()

    const renderEditProfileButton = () => {
        return ((localStorage.getItem('token') === user?.token) &&
            <Button onClick={() => setIsInEditMode(true)}>Edit profile</Button>)
    }

    return (
        <div>
            {!user && <Spinner/>}
            {user && <>
                {renderEditProfileButton()}
                <div>Username: {user.username}</div>
                <div>Online Status: {user.status}</div>
                <div>Creation Date: {user.creationDate}</div>
                <div>Birthday: {user.birthday}</div>
                <div className="navigation">
                    <Button onClick={() => history.push('/users')}>
                        Back
                    </Button>
                    <Logout/>
                </div>
            </>
            }
        </div>
    )
};

export default ProfilePageUserDetails;