import logoIMG from 'images/logo.png'
import searchIMG from 'images/search.png'
import plusIMG from 'images/plus.png'
import profileIMG from 'images/profile.png'
import logoutIMG from 'images/logout.png'
import classes from 'assets/5-components/DesktopSidebar.module.scss'
import { useDispatch } from 'react-redux'
import { userActions } from 'store/user-slice'
import React from 'react'
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import animations from 'assets/1-helpers/animations'
const DesktopSidebar = (props) => {

    const disconnectButtonOnClick = (e) => {
        localStorage.removeItem('jwtoken')
        window.location.replace('/login');
    }

    const sidebarRef = React.useRef();

    return (
        <motion.div ref={sidebarRef} className={classes['sidebar']}
            variants={animations.sidebar}
            initial='hidden'
            animate='visible'
            exit='exit'>
            <SidebarButton imageStyle={{ width: '40px', height: '40px' }} image={logoIMG} color={'transparent'} />
            <div>
                <SidebarButton text={'CREATE'} sidebarRef={sidebarRef} image={plusIMG} path={'/create'} />
                <SidebarButton text={'SEARCH'} sidebarRef={sidebarRef} image={searchIMG} path={'/search'} />
                <SidebarButton text={'PROFILE'} sidebarRef={sidebarRef} image={profileIMG} path={'myProfile'} />
            </div>
            <SidebarButton text={'LOGOUT'} sidebarRef={sidebarRef} image={logoutIMG} color={'red'} onClick={disconnectButtonOnClick} />
        </motion.div>
    )
}




const SidebarButton = (props) => {
    const colorPicker = () => {
        let color = '';
        switch (props.color) {
            case 'red':
                color = 'button-container-disconnect';
                break;
            case 'transparent':
                color = 'button-container-logo';
                break;
            default:
                color = 'button-container';
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

    const menuButtonRef = React.useRef();
    const [showText, setShowText] = React.useState(false);

    React.useEffect(() => {
        menuButtonRef.current.addEventListener("mouseenter", () => {
            props.sidebarRef.current.style.width = '12.5rem'
            setShowText(true);
        })
        menuButtonRef.current.addEventListener("mouseleave", () => {
            props.sidebarRef.current.style.width = '6.25rem'
            setShowText(false);

        })
    }, [])






    return (
        <motion.div className={classes['big-container']} ref={menuButtonRef}>
            <div className={classes[className]} onClick={props.onClick ? props.onClick : buttonOnClick}>
                <img style={props.imageStyle} className={classes['button-image']} src={props.image} />
            </div>
            {showText && 
                <motion.p
                    variants={animations.sidebarButton}
                    initial='hidden'
                    animate='visible'
                    exit='exit'>{props.text}</motion.p>}
        </motion.div>

    )
}

export default DesktopSidebar;