import React, {useState} from 'react';
import {api} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import FormField from "components/views/FormField";

const Login = () => {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const doLogin = async () => {
        try {
            const requestBody = JSON.stringify({username, password})
            const response = await api.post('/login', requestBody);
            const user = new User(response.data);
            user.token = response.headers['token'];
            localStorage.setItem('token', user.token);
            history.push('/users');
        } catch (error) {
            if (error.response.status === 404) {
                alert("Username not found or wrong password");
            }
            history.push('/login');
        }
    };

    return (
        <BaseContainer>
            <div className="login container">
                <div className="login form">
                    <h2>Login</h2>
                    <FormField
                        type="text"
                        label="Username"
                        value={username}
                        onChange={un => setUsername(un)}
                    />
                    <FormField
                        type="password"
                        label="Password"
                        value={password}
                        onChange={p => setPassword(p)}
                    />
                    <div className="login button-container">
                        <div style={{padding: '0.1em'}}>
                            <Button
                                disabled={!username || !password}
                                width="10rem"
                                onClick={() => doLogin()}
                            >
                                Login
                            </Button>
                        </div>
                        <div style={{padding: '0.1em'}}>
                            <Button
                                width="10rem"
                                onClick={() => history.push('/registration')}
                            >
                                Register
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
export default Login;
