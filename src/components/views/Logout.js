import {api} from "../../helpers/api";
import {Button} from "../ui/Button";
import {useHistory} from "react-router-dom";

const Logout = (className) => {
    const history = useHistory()

    const logout = async () => {
        try {
            await api.post('/logout', {}, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
            localStorage.removeItem('token');
            history.push('/login');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Button
            width="10rem"
            onClick={() => logout()}
        >
            Logout
        </Button>
    )
}

export default Logout;