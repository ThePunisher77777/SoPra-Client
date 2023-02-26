import {useEffect, useState} from 'react';
import {api} from 'helpers/api';
import {useHistory, useParams} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import {Spinner} from "../ui/Spinner";
import {Button} from "../ui/Button";


const ProfilePage = () => {
    const params = useParams();
    const history = useHistory();

    const [user, setUser] = useState(null);



    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get(`/users/${params.userId}`);
                setUser(response.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchData();
    }, [history, params.userId]);

    let displayUserInformation;
    displayUserInformation = () => (
        <div>
            {!user && <Spinner/>}
            {user &&
                <>
                    <div>Username: {user.username}</div>
                    <div>Online Status: {user.status}</div>
                    <div>Creation Date: {user.creationDate}</div>
                    <div>Birthday: {user.status}</div>
                </>
            }
        </div>
    );

    useEffect(() => {
        displayUserInformation();
    }, [displayUserInformation])

    return (
        <BaseContainer className="game container">
            {displayUserInformation()}
            <Button onClick={() => history.push('/users')}>
                Back
            </Button>
        </BaseContainer>
    );
}

export default ProfilePage;
