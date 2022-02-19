
import deleteICON from "images/edit.png"
import archiveICON from "images/archive.png"
import editICON from "images/delete.png"
import viewICON from "images/view.png"
import expandICON from "images/expand.png"
import classes from "assets/5-components/Gadget.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { removeGadget } from "store/gadgets-actions"
import { useHistory } from 'react-router-dom';
import React from "react";
import { motion } from "framer-motion"
const expandAnimation = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: .35,
        }
    },
    exit: {
        opacity: 0,
        transition: {
            ease: 'anticipate',
            duration: 1.35,
        }
    }
}

const Gadget = (props) => {

    const dispatch = useDispatch();
    const jwtoken = useSelector((state) => state.user.jwtoken);
    const history = useHistory();
    const deleteOnClick = () => {
        dispatch(removeGadget({ jwtoken, gadgetId: props.id}))
    }

    const editOnClick = () => {
        history.push(`/edit/${props.name}`)
    }

    const viewOnClick = () => {
        history.push(`/view/${props.name}`)

    }

    const [expand, setExpand] = React.useState(false);

    const tagslist = props.gadget.tags.map((tag, index) => {
        if (index == 1) {
            return <p>&nbsp;&nbsp;&nbsp;...</p>
        }
        if (index > 1) {
            return;
        }
        return (
            <p
                style={{
                }}
            >&nbsp;&nbsp;&nbsp;{tag.name}</p>
        )
    })

    return (
        <div className={classes['Gadget']} >
            <div className={!expand ? classes['gadget-not-expanded'] : classes['gadget-not-expanded-open']}>
                <img src={expandICON} onClick={() => { setExpand(expand => !expand); }}/>
                <p>{props.name}</p>
                <div>
                    <img src={viewICON} onClick={viewOnClick} />
                    <img src={editICON} onClick={editOnClick} />
                    <img src={deleteICON} onClick={deleteOnClick} />
                </div>
            </div>
            {expand &&
                <motion.div className={!expand ? classes['gadget-expanded'] : classes['gadget-expanded-open']}
                    variants={expandAnimation}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                >
                    <p>Description:</p>
                    <p>&nbsp;&nbsp;&nbsp;{props.gadget.description}</p>
                    <p>Tags:</p>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: '.30rem',
                            marginTop: '.5rem',
                            marginBottom: '1rem'
                        }}
                    >
                        {tagslist}
                    </div>
                    
                    {tagslist.length == 0 && <p style={{marginTop: '.5rem', marginBottom: '1rem'}}>&nbsp;&nbsp;&nbsp;There is no tag associete with this gadget</p>}
                </motion.div>
            }

        </div>
    )
}

export default Gadget;