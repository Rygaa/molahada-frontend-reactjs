import axios from "axios"
import { userActions } from "./user-slice"
import toast, { Toaster } from 'react-hot-toast';
const url = 'http://localhost:4005'



export const updateProfile = ({jwtoken, email, username, oldPassword, newPassword, picture}) => {
    return async (dispatch) => {

        const formData = new FormData();
        formData.append("picture", picture);
        formData.append("jwtoken", jwtoken);
        formData.append("email", email);
        formData.append("username", username);
        formData.append("oldPassword", oldPassword);
        formData.append("newPassword", newPassword);
        const response = await axios.post(url + `/update-profile`, formData)
        const { data, message, status } = response.data;
        if (status === 'error') {
            toast.error(message)
            return;
        }
        toast.success(message)
        dispatch(userActions.setEmail(data.user.email));
        dispatch(userActions.setUsername(data.user.username));
        console.table(data.user)
        return true;
    }
}



export const signUp = ({ username, email, password, history }) => {
    return async (dispatch) => {
        const response = await axios.post(url + `/createUser`, {
            username,
            password,
            email
        })

        const { data, message, status } = response.data;
        console.log(response.data)

        if (status === 'error') {
            
            toast.error(message)
            return;
        }
        toast.success(message)

    }
}




export const login = ({ email, password, history }) => {
    return async (dispatch) => {

        if (localStorage.getItem('remember-me')) {
            localStorage.setItem('email', email)
            localStorage.setItem('password', password)
        }

        const response = await axios.post(url + `/login`, {
            email,
            password,
        })

        const { data, message, status } = response.data;
        if (status === 'error') {
            toast.error(message)
        }
        dispatch(userActions.setJwtoken(data.jwtoken))
        dispatch(userActions.setIsConnected(true))
        localStorage.setItem('jwtoken', data.jwtoken);
        dispatch(userActions.setEmail(data.email));
        dispatch(userActions.setUsername(data.username));
        toast.success(message)
        history.push('/search')


    }
}

export const autoLogin = (history) => {
    return async (dispatch) => {
        const jwtoken = localStorage.getItem('jwtoken');
        const response = await axios.post(url + `/auto-login`, {
            jwtoken,
        }, { timeout: 1500 }).catch((e) => {
            dispatch(userActions.setLoading(false));
            dispatch(userActions.setIsConnected(false));
        })
        if (!response) { return; }
        const { data, message, status } = response.data;
        if (status === 'error') {
            dispatch(userActions.setIsConnected(false))
            dispatch(userActions.setLoading(false));
            toast.error(message)

            return;
        }

        dispatch(userActions.setIsConnected(true))
        dispatch(userActions.setJwtoken(data.jwtoken))
        dispatch(userActions.setLoading(false));
        dispatch(userActions.setEmail(data.account.email));
        dispatch(userActions.setUsername(data.account.username));
    }
}