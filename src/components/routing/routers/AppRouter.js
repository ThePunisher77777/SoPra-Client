import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Login from "components/views/Login";
import Registration from "components/views/Registration";
import UsersOverview from "../../views/UsersOverview";
import ProfilePage from "../../views/ProfilePage";
import {UsersOverviewGuard} from "../routeProtectors/UsersOverviewGuard";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login">
                    <Login/>
                </Route>
                <Route exact path="/registration">
                    <Registration/>
                </Route>
                <Route exact path="/users">
                    <UsersOverviewGuard>
                        <UsersOverview/>
                    </UsersOverviewGuard>
                </Route>
                <Route path="/users/:userId">
                    <ProfilePage/>
                </Route>
                <Route exact path="/">
                    <Redirect to="/users"/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

/*
* Don't forget to export your component!
 */
export default AppRouter;
