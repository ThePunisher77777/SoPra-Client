import {Spinner} from "../ui/Spinner";
import {Button} from "../ui/Button";
import {useHistory} from "react-router-dom";
import Logout from "./Logout";
import "../../styles/views/ProfilePageUserDetails.scss";
import BaseContainer from "../ui/BaseContainer";

const ProfilePageUserDetails = ({user, setIsInEditMode}) => {
    const history = useHistory()

    const renderEditProfileButton = () => {
        return ((localStorage.getItem('token') === user?.token) &&
            <Button width="10rem" onClick={() => setIsInEditMode(true)}>Edit profile</Button>)
    }

    return (
        <BaseContainer className="users-overview container">
                {!user && <Spinner/>}
                {user && <div>
                    {renderEditProfileButton()}
                    <h2>User profile of: {user.username}</h2>
                    <div>Username: {user.username}</div>
                    <div>Online Status: {user.status}</div>
                    <div>Creation Date: {user.creationDate}</div>
                    <div>Birthday: {user.birthday}</div>
                    <div className="navigation">
                        <Button width="10rem" onClick={() => history.push('/users')}>
                            Back
                        </Button>
                        <Logout/>
                    </div>
                </div>
                }
        </BaseContainer>
    )
};

export default ProfilePageUserDetails;