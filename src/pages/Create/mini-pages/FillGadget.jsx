import Title from "components/Title";
import { useDispatch, useSelector } from "react-redux";
import { addTag, editName, editDescription, removeTag, addLinks, removeLink } from "store/gadgets-actions";
import classes from "assets/6-pages/Create/mini-pages/FillGadget.module.scss"
import Button from "components/Button";
import tagICON from "images/tag.png"
import titleICON from "images/title.png"
import saveICON from "images/save.png"
import Input from "components/Input";
import { useState } from "react";
import Tag from "components/Tag";
import Link from "components/Link";
import React from "react";
import { usePrompt } from "components/Hook";
import { useHistory } from 'react-router-dom';

const FillGadget = (props) => {
    const dispatch = useDispatch();
    const jwtoken = useSelector((state) => state.user.jwtoken);
    const gadget = useSelector((state) => state.gadgets.gadget);
    const history = useHistory();
    const [unsaved, setUnsaved] = useState(false);

    // Tags
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([])
    const [newTags, setNewTags] = useState([])

    // Name & Description
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // Links
    const [links, setLinks] = useState([])
    const [newLinks, setNewLinks] = useState([])
    const [linkName, setLinkName] = useState('')
    const [linkUrl, setLinkUrl] = useState('')


    const saveOnClick = (e) => {
        dispatch(editName({ jwtoken, gadgetId: gadget.id, newName: name, history }))
        dispatch(editDescription({ jwtoken, gadgetId: gadget.id, newDescription: description }))
        dispatch(addTag({ jwtoken, gadgetId: gadget.id, newTags: newTags }))
        dispatch(addLinks({ jwtoken, gadgetId: gadget.id, newLinks: newLinks }))
        setUnsaved(false)
    }

    // usePrompt('All unsaved changed will be lost?', unsaved)
    

    React.useEffect(() => {
        if (gadget) {
            setName(gadget.name)
            setDescription(gadget.description)
            setTags(gadget.tags)
            setLinks(gadget.links)
        }
    }, [gadget])

    const deleteTag = (name, id) => { dispatch(removeTag({jwtoken, tag: id})) }
    const deleteLink = (name, id) => { dispatch(removeLink({ jwtoken, link: id })) }

    const tagsList = tags?.map((tag) => {
        return (
            <Tag 
                key={Math.random()} 
                onClick={deleteTag}
                text={tag.name} 
                id={tag.id}
            />
        )
    })

    const linksList = links?.map((link) => {
        return (
            <Link 
                key={Math.random()} 
                onClick={deleteLink}
                url={link.url} 
                text={link.name} 
                id={link.id} 
            />
        )
    })

    return (
        <section className={classes['fill-gadget']}>
            <Title
                title={'CREATE A NEW GADGET'}
                containerClassname={classes['title-section']}
            />
            <div className={classes['name-section']}>
                <p>Edit name</p>
                <div></div>
                <Input
                    image={titleICON}
                    placeholder={'Name'}
                    containerClassname={classes['Input']}
                    value={name}
                    onChange={(e) => { setName(e); setUnsaved(true) }}
                />
            </div>
            <div className={classes['description-section']}>
                <p>Edit description</p>
                <div></div>
                <textarea
                    value={description}
                    onChange={(e) => { setDescription(e.target.value); setUnsaved(true) }}
                />
            </div>
            <div className={classes['tags-section']}>
                <p>Add Tag</p>
                <div></div>
                <Input
                    image={tagICON}
                    placeholder={'Tag'}
                    containerClassname={classes['Input']}
                    value={tag}
                    button={true}
                    onChange={(e) => { setTag(e) }}
                    onClick={(e) => {
                        setTags(tags => [...tags, { name: tag, id: 'new' }]);
                        setNewTags(newTags => [...newTags, tag])
                        setUnsaved(true)
                    }}
                />
                <div>{tagsList}</div>
            </div>
            <div className={classes['links-section']}>
                <p>Add Link</p>
                <div></div>
                <input value={linkName} onChange={(e) => { setLinkName(e.target.value) }} />
                <input value={linkUrl} onChange={(e) => { setLinkUrl(e.target.value) }} />
                <button onClick={(e) => {
                    setLinks(links => [...links, { name: linkName, url: linkUrl, id: 'new' }]);
                    setNewLinks(newLinks => [...newLinks, { name: linkName, url: linkUrl }])
                    setUnsaved(true)
                }}>Confirm</button>
                <div className={classes['links-container']}>
                    {linksList}
                </div>
            </div>
     
 

            <img src={saveICON} className={classes['save-button']} onClick={saveOnClick} />
        </section>
    )
}


export default FillGadget;