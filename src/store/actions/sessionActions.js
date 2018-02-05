import { sessionService } from 'redux-react-session'
import axios from 'axios'

const dataHandler = (data, serverData) => {
    if(data.type === 'facebook') {
        return {
            'id': serverData.id,
            'jwt': serverData.jwt,
            'name': data.data.name,
            'email': data.data.email,
            'imageURL': data.data.picture.data.url,
            'isWriter': data.isWriter,
            'expiresAt': new Date().getTime()+86400000
        }
    }
    return {
        'id': serverData.id,
        'jwt': serverData.jwt,
        'name': data.data.profileObj.name,
        'email': data.data.profileObj.email,
        'imageURL': data.data.profileObj.imageUrl,
        'isWriter': data.isWriter,
        'expiresAt': new Date().getTime()+86400000
    }
}

export const login = (data) => {
    return () => {
        axios.post('/auth/login', data)
        .then((res) => {
            console.log("RES.DATA: ", res.data);
            if (!res.data.error){
                const userData = dataHandler(data, res.data)
                //console.log("dataHandler: ", userData)
                return sessionService.saveSession( userData.id )
                .then(() => {
                    sessionService.saveUser(userData)
                    .then(() => {
                        axios.defaults.headers.common['Authorization'] = res.data.jwt;
                        console.log("Logged in");
                    }).catch(err => console.error(err));
                }).catch(err => console.error(err));
            } else {
                window.confirm("Error logging in. Please try again.");
            }
        }).catch(err => {
            console.error(err);
            return err;
        })
    };
};

export const logout = () => {
    return () => {
        sessionService.deleteSession();
        sessionService.deleteUser();
    };
};
