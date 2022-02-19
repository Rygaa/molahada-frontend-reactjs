import classes from 'assets/4-layout/Toasty.module.scss';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import React from 'react';
const TOAST_LIMIT = 1

const Toasty = (props) => {
    const { toasts } = useToasterStore();

    React.useEffect(() => {
        toasts
            .filter((t) => t.visible) // Only consider visible toasts
            .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
            .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
    }, [toasts]);

    return (
        <Toaster  gutter={5}/>
        // <ToastContainer
        //     position="top-right"
        //     autoClose={100000}
        //     hideProgressBar={false}
        //     newestOnTop={false}
        //     closeOnClick
        //     rtl={false}
        //     pauseOnFocusLoss
        //     draggable
        //     pauseOnHover
        // />
    )
}

export default Toasty;