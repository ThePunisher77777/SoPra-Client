import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import FormField from "components/views/FormField";

const Login = props => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({username, password});
      const response = await api.post('/login', requestBody);

      console.log(response.data)

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem('token', user.token);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      history.push(`/users`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
      history.push('/login');
    }
  };

  return (
    <BaseContainer>
      <div className="login container">
        <div className="login form">
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
            <Button
              disabled={!username || !password}
              width="100%"
              onClick={() => doLogin()}
            >
              Login
            </Button>
            <Button
              width="100%"
              onClick={() => history.push('/registration')}
            >
              Register
            </Button>
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
