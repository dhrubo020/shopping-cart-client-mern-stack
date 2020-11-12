import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../App';

const AdminPrivateRoute = ({children, ...rest}) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div>
            <div>
                <Route
                    {...rest}
                    render={({ location }) =>
                        loggedInUser.phone === '01714594910'
                            ? (children)
                            :
                            (

                                <Redirect
                                    to={{
                                        pathname: "/adminLogin",
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

export default AdminPrivateRoute;