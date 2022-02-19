import axios from "axios"
import { userActions } from "./user-slice"
import toast, { Toaster } from 'react-hot-toast';
import { gadgetsActions } from "./gadgets-slice";
const url = 'http://localhost:4005'


export const removeGadget = ({ jwtoken, gadgetId }) => {
    return async (dispatch) => {
        const response = await axios.post(url + `/remove-gadget`, {
            jwtoken,
            gadgetId
        })

        const { data, message, status } = response.data;
        if (status === 'error') {
            console.error(data.message)
        }
        dispatch(fetchGadgets({ jwtoken }))
    }
}

export const removeTag = ({ jwtoken, tag }) => {
    return async (dispatch) => {
        console.log(jwtoken, tag)
        const response = await axios.post(url + `/remove-tag`, {
            jwtoken,
            tag
        })

        const { data, message, status } = response.data;
        if (status === 'error') {
            console.error(data.message)
        }
        dispatch(fetchGadget({jwtoken}))
    }
}


export const fetchGadgets = ({ jwtoken }) => {
    return async (dispatch) => {
        const response = await axios.post(url + `/gadgets`, {
            jwtoken
        })

        const { data, message, status } = response.data;
        if (status === 'error') {
            console.error(data.message)
        }
        dispatch(gadgetsActions.setGadgets(data.gadgets))
    }
}

export const fetchGadget = ({ jwtoken, name }) => {
    return async (dispatch) => {
        const gadget_name = window.location.pathname.split('/')[2]
        const response = await axios.post(url + `/gadget/${gadget_name}`, {
            jwtoken
        })

        const { data, message, status } = response.data;
        if (status === 'error') {
            console.error(data.message)
        }
        dispatch(gadgetsActions.setGadget(data.gadget))
    }
}


export const createNewGadget = ({ jwtoken, name, history }) => {
    return async (dispatch) => {
        const response = await axios.post(url + `/create-new-gadget`, {
            jwtoken,
            name
        })

        const { data, message, status } = response.data;
        if (status === 'error') {
            toast.error(message)
            return false;
        }
        history.push(`/edit/${data.gadget.name}`)
        dispatch(gadgetsActions.setGadget(data.gadget))
        return true;

    }
}


export const editName = ({ jwtoken, gadgetId, newName, history }) => {
    return async (dispatch) => {
        const response = await axios.post(url + `/edit-name`, {
            jwtoken,
            gadgetId,
            newName
        })

        const { data, message, status } = response.data;
        if (status === 'error') {
            toast.error(message)
            return;
        }
        history.push(`/edit/${data.gadget.name}`)
        toast.success(message);
    }
}

export const editDescription = ({ jwtoken, gadgetId, newDescription }) => {
    return async (dispatch) => {
        console.table(newDescription)

        const response = await axios.post(url + `/edit-description`, {
            jwtoken,
            gadgetId,
            newDescription
        })

        const { data, message, status } = response.data;
        if (status === 'error') {
            toast.error(message)
            return;
        }
        toast.success(message);

    }
}

export const addTag = ({ jwtoken, gadgetId, newTags }) => {
    return async (dispatch) => {
        const response = await axios.post(url + `/add-tags`, {
            jwtoken,
            gadgetId,
            newTags,
        })

        const { data, message, status } = response.data;
        if (status === 'error') {
            console.error(data.message)
        }
        dispatch(gadgetsActions.setGadget(data.gadget))

    }
}
