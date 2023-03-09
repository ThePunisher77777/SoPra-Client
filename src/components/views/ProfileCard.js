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
        <Button style={{padding: '0.1rem'}} width="20rem" onClick={() => showUserProfile()}>
            Username: {user.username} Id: {user.id}
        </Button>
    )
};

ProfileCard.propTypes = {
    user: PropTypes.object
};

export default ProfileCard;
