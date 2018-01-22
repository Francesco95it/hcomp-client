import { sessionService } from 'redux-react-session'
import axios from 'axios'

export const login = (data) => {
    return () => {
        return sessionService.saveSession( data.data.userID )
        .then(() => {
            //TODO: Create user structure to be same btw google-fb
            axios.post('https://hsoc.herokuapp.com/auth/login', data);
            sessionService.saveUser(data.data)
            .then(() => {
                console.log("Logged in");
            }).catch(err => console.error(err));
        }).catch(err => console.error(err));
    };
};

export const logout = () => {
    return () => {
        sessionService.deleteSession();
        sessionService.deleteUser();
    };
};
