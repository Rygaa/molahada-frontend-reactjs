
import classes from 'assets/6-pages/MyProfile.module.scss'
import Title from "components/Title";
import usernameICON from 'images/username.png'
import emailICON from 'images/email.png'
import passwordICON from 'images/password.png'
import profilePicture from 'images/profile-picture.png'
import Input from "components/Input";
import Tag from "components/Tag";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { userActions } from "store/user-slice";
import { fetchGadgets } from "store/gadgets-actions";
import Gadget from "components/Gadget";
import Button from "components/Button";
import { updateProfile } from "store/user-actions";
import Modal from "components/Modal";
import InputFile from "components/InputFile";


const MyProfile = () => {

    const user = useSelector((state) => state.user)
    const jwtoken = useSelector((state) => state.user.jwtoken)
    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [showPasswordConfirmInput, setShowPasswordConfirmInput] = React.useState(false);
    const [newPassword, setNewPassword] = React.useState('');
    const dispatch = useDispatch();
    const [confirmNewPassword, setConfirmNewPassword] = React.useState('');
    const [password, setPassword] = React.useState('')
    const [newPicture, setNewPicture] = useState(null);


    const [showModal, setShowModal] = React.useState(false);

    const saveOnClick = async (e) => {
        console.log(password)
        const success = await dispatch(updateProfile({
            jwtoken, email, username, newPassword, oldPassword: password, picture: newPicture
        }))
        if (success) { 
            setShowModal(false); 
            setNewPassword('');
            setConfirmNewPassword('');
            setShowPasswordConfirmInput(false);
        };

    }


    React.useEffect(() => {
        if (user.email && user.username) {
            setEmail(user.email)
            setUsername(user.username)
        }
    }, [user])


    React.useEffect(() => {
        console.table(user)
        if (user.email && user.username) {
            setEmail(user.email)
            setUsername(user.username)
        }
        console.log('hahaha')
    }, [])


    return (
        <section className={classes['search-section']}>
            <Title
                title={'My Profile'}
                containerClassname={classes['title-container']}
            />
            <InputFile setSelectedFile={(picture) => { setNewPicture(picture) }} image={profilePicture}></InputFile>
            <Input
                value={username}
                onChange={(e) => { setUsername(e) }}
                image={usernameICON}
                placeholder={'email'}
            />
            <Input
                value={email}
                onChange={(e) => { setEmail(e) }}
                image={emailICON}
                placeholder={'username'}
            />
            <Input
                onChange={(e) => { }}
                image={passwordICON}
                placeholder={'password'}
                focus={() => { setShowPasswordConfirmInput(true) }}
                unfocus={() => { setShowPasswordConfirmInput(false) }}
                value={newPassword}
                onChange={(e) => { setNewPassword(e) }}
            />
            {showPasswordConfirmInput &&
                <Input
                    image={emailICON}
                    placeholder={'confirm password'}
                    inputOnClick={() => { setShowPasswordConfirmInput(!showPasswordConfirmInput) }}
                    value={confirmNewPassword}
                    onChange={(e) => { setConfirmNewPassword(e) }}
                />
            }
            <Button text={'SAVE'} onClick = { () => { setShowModal(true)} }/>
            {showModal &&
                <Modal close={() => { setShowModal(false) }}>
                    <Title
                        title={'Confirm password'}
                        containerClassname={classes['title-container']}
                    />
                    <Input
                        onChange={(e) => { }}
                        image={emailICON}
                        placeholder={'password'}
                        focus={() => { setShowPasswordConfirmInput(true) }}
                        unfocus={() => { setShowPasswordConfirmInput(false) }}
                        value={password}
                        onChange={(e) => { setPassword(e) }}
                    />
                    <Button text={'Confirm'} onClick={saveOnClick} />

                </Modal>
            }
        </section>
    )
}

export default MyProfile;