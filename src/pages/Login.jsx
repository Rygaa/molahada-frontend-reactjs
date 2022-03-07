import classes from 'assets/6-pages/Signup.module.scss'
import Input from 'components/Input';
import Checkbox from 'components/Checkbox';
import Button from 'components/Button';
import usernameICON from 'images/username.png'
import emailICON from 'images/email.png'
import passwordICON from 'images/password.png'
import { useDispatch } from 'react-redux';
import React
 from 'react';
import { login } from 'store/user-actions';
import { NavLink, useHistory } from 'react-router-dom';
import { motion } from "framer-motion";
import animations from "assets/1-helpers/animations"


const Login = (props) => {
    const [email, setEmail] = React.useState(localStorage.getItem('email') || '');
    const [password, setPassword] = React.useState(localStorage.getItem('password') || '');
    const dispatch = useDispatch();
    const history = useHistory();
    const signinOnClick = (e) => {
        dispatch(
            login({
                email,
                password,
                history
            })
        )
    }

    const isSignInButtonDisabled = () => {
        if (email == '' || password == '') {
            return true
        }
        return false;
    }

    return (
        <motion.section className={classes['Signup']}
            variants={animations.right_to_left}
            initial='hidden'
            animate='visible'
            exit='exit'
        >
            <p>Login</p>
            <p>Does not have an account? <NavLink to='/signup'>Sign up</NavLink> </p>
            <Input
                value={email}
                onChange={(e) => { setEmail(e) }}
                image={emailICON}
                placeholder={'email'}
            />
            <Input
                value={password}
                onChange={(e) => { setPassword(e) }}
                image={passwordICON}
                placeholder={'password'}
                type={'password'}
            />
            <Checkbox onClick={(status) => { localStorage.setItem('remember-me', status) }} status={localStorage.getItem('remember-me')}>
                <p className={classes['Checkbox-Paragraph']}>
                    Remember me
                </p>
            </Checkbox>
            <Button text={'Sign in'} onClick={signinOnClick} disabled={isSignInButtonDisabled()}/>
        </motion.section>
    )
}

export default Login;