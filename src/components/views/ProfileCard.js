import PropTypes from "prop-types";
import {useHistory, useParams} from 'react-router-dom';
import {Button} from "../ui/Button";

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
