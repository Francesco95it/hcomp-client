import { sessionService } from 'redux-react-session'
import axios from 'axios'

const dataHandler = (data, id) => {
    if(data.type === 'facebook') {
        return {
            'id': id,
            'name': data.data.name,
            'email': data.data.email,
            'imageURL': data.data.picture.data.url,
            'isWriter': data.isWriter
        }
    }
    return {
        'id': id,
        'name': data.data.profileObj.name,
        'email': data.data.profileObj.email,
        'imageURL': data.data.profileObj.imageUrl,
        'isWriter': data.isWriter
    }
}

export const login = (data) => {
    return () => {
        axios.post('https://hsoc.herokuapp.com/auth/login', data)
        .then((res) => {
            const userData = dataHandler(data, res.data)
            //console.log("dataHandler: ", userData)
            return sessionService.saveSession( userData.id )
            .then(() => {
                //TODO: Create user structure to be same btw google-fb
                sessionService.saveUser(userData)
                .then(() => {
                    console.log("Logged in");
                }).catch(err => console.error(err));
            }).catch(err => console.error(err));
        })
    };
};

export const logout = () => {
    return () => {
        sessionService.deleteSession();
        sessionService.deleteUser();
    };
};
