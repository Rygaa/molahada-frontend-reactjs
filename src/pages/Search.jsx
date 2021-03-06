
import titleICON from 'images/title.png'
import tagICON from 'images/tag.png'
import dateICON from 'images/date.png'


import classes from 'assets/6-pages/Search.module.scss'
import Title from "components/Title";
import Input from "components/Input";
import Tag from "components/Tag";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { userActions } from "store/user-slice";
import { fetchGadgets } from "store/gadgets-actions";
import Gadget from "components/Gadget";
import Button from "components/Button";
import { useHistory } from 'react-router-dom';

const Search = (props) => {
    const history = useHistory();
    const disconnect = () => {
        localStorage.setItem('jwtoken', null);
        history.push('')
        window.location.reload()
    }
    const dispatch = useDispatch();
    const gadgets = useSelector((state) => state.gadgets.gadgets);
    const jwtoken = useSelector((state) => state.user.jwtoken);
    const [filterTags, setFilterTags] = React.useState('');
    const [tag, setTag] = React.useState('');
    const [title, setTitle] = React.useState('');
    React.useEffect(() => {
        dispatch(fetchGadgets({ jwtoken }))
    }, [])


    // const filterTagsList = filterTags.map((element) => {
    //     return (
    //         <p>{element}</p>
    //     )
    // })


    const filterTagOnClick = (e) => {
        setFilterTags(e.target.value)
    }


    React.useEffect(() => {
    }, [filterTags])

    const filterByTag = (gadget) => {
        if (tag == '') {
            return true;
        }
        for (let i = 0; i < gadget.tags.length; i++) {
            if (gadget.tags[i].name.includes(tag)) {
                return true;
            } 
        }
        return false;
    }

    const filterByName = (gadget) => {
        if (gadget.name.includes(title)) {
            return true;
        }
        return false;
    }

    const gadgetsList = gadgets.map((gadget) => {
        if (filterByName(gadget) && filterByTag(gadget)) {
            return (
                <Gadget name={gadget.name} id={gadget.id} gadget={gadget} onClick={() => {
                    history.push('/edit/' + gadget.name)
                }}/>
            )
        }
 
  
    })

    return (
        <section className={classes['search-section']}>
            <Title 
                title={'Search Gadget'}
                containerClassname={classes['title-container']}
            />
            <div className={classes['filter-container']}>
                <Input
                    onChange={(e) => { setTitle(e) }}
                    image={titleICON}
                    placeholder={'search by title'}
                    value = {title}
                />
                <Input
                    onChange={(e) => { setTag(e) }}
                    image={tagICON}
                    placeholder={'search by tag'}
                    value={tag}
                />
            </div>
            <div className={classes['gadgets-container']}>
                {gadgetsList}
            </div>
        </section>
 
    )

}

export default Search;