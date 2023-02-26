import PropTypes from "prop-types";
import {Redirect, useHistory} from 'react-router-dom';
import {Button} from "../ui/Button";
import ProfilePage from "./ProfilePage";

const ProfileCard = ({user}) => {
    const history = useHistory();

    const showUserProfile = () => {
        history.push(`/users/${user.id}`);
    }

    return (
        <Button width="100%" onClick={() => showUserProfile()}>
            {user.username}
        </Button>
    )
};

ProfileCard.propTypes = {
    user: PropTypes.object
};

export default ProfileCard;
