import React, { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../App';

const UserPrivateRoute = ({ children, ...rest }) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div>
            <div>
                <Route
                    {...rest}
                    render={({ location }) =>
                        loggedInUser.phone
                            ? (children)
                            :
                            (

                                <Redirect
                                    to={{
                                        pathname: "/login",
                                        state: { from: location }
                                    }}
                                />
                            )
                    }
                />
            </div>
        </div>
    );
};

export default UserPrivateRoute;