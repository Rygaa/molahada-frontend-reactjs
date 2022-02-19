import classes from 'assets/4-layout/Layout.module.scss'
// import { ToastContainer, toast } from 'react-toastify';

import React from 'react';
import Toasty from './Toasty';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import DesktopSidebar from 'components/DesktopSidebar';
import MobileSidebar from 'components/MobileSidebar';
import { usePrompt } from 'components/Hook';
const Layout = (props) => {
    const loading = useSelector((state) => state.user.loading);
    const isConnected = useSelector((state) => state.user.isConnected);
    const [small, setSmall] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener('resize', () => {
            window.innerWidth < 700 ? setSmall(true) : setSmall(false);
        })
        window.innerWidth < 700 ? setSmall(true) : setSmall(false);
    }, [])

    const sidebar = small ? <MobileSidebar /> : <DesktopSidebar /> 

    return (
        <div className={classes['Layout']}>
            {(isConnected) && sidebar}
            { props.children }
            <Toasty />
        </div>
    )
}

export default Layout;