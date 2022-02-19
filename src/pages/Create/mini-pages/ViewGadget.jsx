import Title from "components/Title";
import { useDispatch, useSelector } from "react-redux";
import { addTag, editGadget, editName, editDescription, removeTag } from "store/gadgets-actions";
import classes from "assets/6-pages/Create/mini-pages/ViewGadget.module.scss"
import Button from "components/Button";
import emailICON from "images/email.png"
import tagICON from "images/tag.png"
import titleICON from "images/title.png"
import saveICON from "images/save.png"
import Input from "components/Input";
import { useState } from "react";
import Tag from "components/Tag";
import { gadgetsActions } from "store/gadgets-slice";
import React from "react";

const ViewGadget = (props) => {
    const dispatch = useDispatch();
    const jwtoken = useSelector((state) => state.user.jwtoken);
    const gadget = useSelector((state) => state.gadgets.gadget);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');


    React.useEffect(() => {
        if (gadget) {
            setName(gadget.name)
            setDescription(gadget.description)
        }
    }, [gadget])



    const tagsList = gadget?.tags?.map((tag) => {
        return (
            <Tag key={Math.random()} disabled={true} text={tag.name} id={tag.id} />
        )
    })

    return (
        <section className={classes['fill-gadget']}>
            <Title
                title={'VIEW A GADGET'}
                containerClassname={classes['title-container']}
            />
            <Input
                image={titleICON}
                placeholder={'Name'}
                containerClassname={classes['Input']}
                value={name}
                disabled={true}
            />
            <textarea
                onChange={(e) => { setDescription(e.target.value);  }}
                value={description}
                disabled
            />
            <div className={classes['tags-container']}>{tagsList}</div>
        </section>
    )
}


export default ViewGadget;