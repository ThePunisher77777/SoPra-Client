import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Registration.scss';
import BaseContainer from "components/ui/BaseContainer";
import FormField from "components/views/FormField";

const Registration = props => {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const register = async () => {
        if (password !== confirmPassword) {
            alert('Your passwords do not match');
        } else {
            try {
                const requestBody = JSON.stringify({username, name, password});
                const response = await api.post('/users', requestBody);

                const user = new User(response.data)
                user.token = response.headers['token'];
                localStorage.setItem('token', user.token);
                history.push(`/users`);
            } catch (error) {
                if (error.response.status === 409) {
                    alert('Username already in use. Please choose another one.')
                } else {
                    alert(`Something went wrong during the login: \n${handleError(error)}`);
                }
            }
        }
    };

    return (
        <BaseContainer>
            <div className="registration container">
                <div className="registration form">
                    <h2>Registration</h2>
                    <FormField
                        type="text"
                        label="Username"
                        value={username}
                        onChange={un => setUsername(un)}
                    />
                    <FormField
                        type="text"
                        label="Name"
                        value={name}
                        onChange={n => setName(n)}
                    />
                    <FormField
                        type="password"
                        label="Password"
                        value={password}
                        onChange={p => setPassword(p)}
                    />
                    <FormField
                        type="password"
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={cp => setConfirmPassword(cp)}
                    />
                    <div className="registration button-container">
                        <div style={{padding: '0.1em'}}>
                            <Button
                                disabled={!username || !password || !confirmPassword}
                                width="10rem"
                                onClick={() => register()}
                            >
                                Register
                            </Button>
                        </div>
                        <div style={{padding: '0.1em'}}>
                            <Button
                                width="10rem"
                                onClick={() => history.push('/login')}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </BaseContainer>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Registration;
