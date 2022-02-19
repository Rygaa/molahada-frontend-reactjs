import classes from 'assets/6-pages/Signup.module.scss'
import Input from 'components/Input';
import Checkbox from 'components/Checkbox';
import Button from 'components/Button';
import usernameICON from 'images/username.png'
import emailICON from 'images/email.png'
import passwordICON from 'images/password.png'
import React from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from 'store/user-actions';
import { NavLink, useHistory } from 'react-router-dom';
import { motion } from "framer-motion";
import animations from "assets/1-helpers/animations"


const Signup = (props) => {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const createAccountOnClick = (e) => {
        dispatch(
            signUp({
                username,
                password,
                email,
                history
            })
        )
    }


    const isSignInButtonDisabled = () => {

        if (email == '' || password == '' || username == '') {
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
            <p>Sign up with your email</p>
            <p>Already have an account? <NavLink to='/login'>Login</NavLink> </p>
            <Input 
                value={username} 
                onChange={(e) => { setUsername(e)}} 
                image={usernameICON} 
                placeholder={'username'} 
            />
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
            <Checkbox onClick={() => {}}>
                <p className={classes['Checkbox-Paragraph']}>
                    I agree to the <a href=''>Terms of Services</a> and <a href=''>Privacy Policy</a>
                </p>
            </Checkbox>
            <Button text={'Create account'} onClick={createAccountOnClick} disabled={isSignInButtonDisabled()} />
        </motion.section>
    )
}

export default Signup;