import Title from "components/Title";
import classes from "assets/6-pages/Create/mini-pages/CreateTitle.module.scss"
import Input from "components/Input";
import Button from "components/Button";
import titleICON from "images/title.png"
import { useDispatch, useSelector } from "react-redux";
import { createNewGadget } from "store/gadgets-actions";
import React from "react";
import { useHistory } from 'react-router-dom';

const CreateTitle = (props) => {
    const dispatch = useDispatch();
    const [title, setTitle] = React.useState('')
    const jwtoken = useSelector((state) => state.user.jwtoken);
    const history = useHistory();
    const nextOnClick = async (e) => {
        const success = await dispatch(createNewGadget({jwtoken, name: title, history}))
        if (success) {
            props.nextStep();
        }
    }


    const isSignInButtonDisabled = () => {

        if (title == '') {
            return true
        }
        return false;
    }


    return (
        <section className={classes['CreateTitle']}>
            <Title
                title={'CREATE A NEW GADGET'}
                containerClassname={classes['title-container']}
            />
            <Input
                onChange={(e) => { setTitle(e) }}
                image={titleICON}
                placeholder={'Title'}
                containerClassname={classes['Input']}
                value={title}
            />
            <Button 
                text={'Next'} 
                containerClassname={classes['Button']}
                onClick={nextOnClick}
                disabled={isSignInButtonDisabled()}
            />
        </section>
    )
}


export default CreateTitle;