import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import ProfileCard from "components/views/ProfileCard";
import "../../styles/views/UsersOverview.scss";
import PropTypes from "prop-types";
import Logout from "./Logout";


const UsersOverview = () => {
    // use react-router-dom's hook to access the history
    const history = useHistory();

    // define a state variable (using the state hook).
    // if this variable changes, the component will re-render, but the variable will
    // keep its value throughout render cycles.
    // a component can have as many state variables as you like.
    // more information can be found under https://reactjs.org/docs/hooks-state.html
    const [users, setUsers] = useState(null);

    // the effect hook can be used to react to change in your component.
    // in this case, the effect hook is only run once, the first time the component is mounted
    // this can be achieved by leaving the second argument an empty array.
    // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get(`/users`, {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                });
                // Get the returned users and update the state.
                setUsers(response.data);

                // This is just some data for you to see what is available.
                // Feel free to remove it.
                console.log('request to:', response.request.responseURL);
                console.log('status code:', response.status);
                console.log('status text:', response.statusText);
                console.log('requested data:', response.data);

                // See here to get more data.
                console.log(response);
            } catch (error) {
                if (error.response.status === 401) {
                    history.push('/login');
                }
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData();
    }, [history]);

    const showUsers = () => {
        if (users) {
            return (
                <ul className="user-list">
                    {users.map(user => (
                        <ProfileCard user={user} key={user.id}/>
                    ))}
                </ul>
            );
        }
    }

    return (
        <BaseContainer className="users-overview container">
            {showUsers()}
            <Logout/>
        </BaseContainer>
    );
}

UsersOverview.propTypes = {
    user: PropTypes.object
};

export default UsersOverview;
