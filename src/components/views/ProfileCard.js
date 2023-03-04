import PropTypes from "prop-types";
import {useHistory} from 'react-router-dom';
import {Button} from "../ui/Button";

const ProfileCard = ({user}) => {
    const history = useHistory();

    const showUserProfile = () => {
        history.push(`/users/` + user.id);
    }

    return (
        <Button width="100%" onClick={() => showUserProfile()}>
            <div>
                {user.username} {user.name} {user.id}
            </div>
        </Button>
    )
};

ProfileCard.propTypes = {
    user: PropTypes.object
};

export default ProfileCard;
