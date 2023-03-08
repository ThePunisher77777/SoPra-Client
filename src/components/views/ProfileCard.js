import PropTypes from "prop-types";
import {useHistory} from 'react-router-dom';
import {Button} from "../ui/Button";
import "../../styles/views/ProfileCard.scss";

const ProfileCard = ({user}) => {
    const history = useHistory();

    const showUserProfile = () => {
        history.push(`/users/` + user.id);
    }

    return (
        <div className="view-profile">
            <Button width="15rem" onClick={() => showUserProfile()}>
                Username: {user.username} Id: {user.id}
            </Button>
        </div>
    )
};

ProfileCard.propTypes = {
    user: PropTypes.object
};

export default ProfileCard;
