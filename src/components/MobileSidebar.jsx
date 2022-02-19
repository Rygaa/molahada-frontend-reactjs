import logoIMG from 'images/logo.png'
import homeIMG from 'images/home.png'
import searchIMG from 'images/search.png'
import plusIMG from 'images/plus.png'
import libraryIMG from 'images/library.png'
import profileIMG from 'images/profile.png'
import logoutIMG from 'images/logout.png'
import classes from 'assets/5-components/MobileSidebar.module.scss'
import { useDispatch } from 'react-redux'
import { userActions } from 'store/user-slice'
import React from 'react'
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion'
import animations from 'assets/1-helpers/animations'

const MobileSidebar = (props) => {

    const disconnectButtonOnClick = (e) => {
        localStorage.removeItem('jwtoken')
        window.location.replace('/login');
    }

    const [showSidebar, setShowSidebar] = React.useState(false);

    return (
        !showSidebar ? 
        <button className={classes['show-sidebar-button']}
                onClick={() => { setShowSidebar(true); }}
        >
        
        </button>
        :
        <motion.div className={classes['container']}
            variants={animations.sidebar}
            initial='hidden'
            animate='visible'
            exit='exit'
        >
            <div className={classes['blur-container']} onClick={() => { setShowSidebar(false) ;}}></div>
            <div className={classes['sidebar']}>
                
                <SidebarButton imageStyle={{ width: '40px', height: '40px' }} image={logoIMG} color={'transparent'} />
                <div>
                    <SidebarButton image={plusIMG} path={'/create'} />
                    <SidebarButton image={searchIMG} path={'/search'} />
                    <SidebarButton image={profileIMG} path={'myProfile'} />
                </div>
                <SidebarButton image={logoutIMG} color={'red'} onClick={disconnectButtonOnClick} />
            </div>
        </motion.div>
    )
}




const SidebarButton = (props) => {
    const colorPicker = () => {
        let color = '';
        switch (props.color) {
            case 'red':
                color = 'sidebar-container-red';
                break;
            case 'transparent':
                color = 'sidebar-container-transparent';
                break;
            default:
                color = 'sidebar-container';
                break;
        }
        return color;
    }
    const className = colorPicker();
    const dispatch = useDispatch();
    const history = useHistory();

    const buttonOnClick = (e) => {
        if (props.path) {
            history.push(props.path)
            setTimeout(() => {
                dispatch(userActions.setLoading(false))
            }, 500)
            dispatch(userActions.setLoading(true))
        }
    }



    return (
        <motion.div className={classes[className]} onClick={props.onClick ? props.onClick : buttonOnClick}>
            <img style={props.imageStyle} className={classes['sidebar-button']} src={props.image} />
        </motion.div>
    )
}

export default MobileSidebar;