import CreateTitle from './mini-pages/CreateTitle'
import classes from "assets/6-pages/Create/Create.module.scss"
import React from 'react';
import { fetchGadget } from 'store/gadgets-actions';
import FillGadget from './mini-pages/FillGadget';
import { useDispatch, useSelector } from 'react-redux';


const Create = (props) => {
    const [step, setStep] = React.useState(0);
    const dispatch = useDispatch()
    const jwtoken = useSelector((state) => state.user.jwtoken);


    React.useEffect(() => {
        if (window.location.pathname != '/create') {
            dispatch(fetchGadget({ jwtoken }))
        }
    }, [])

    
    const whichView = () => {
        const path = window.location.pathname;
        console.log(path)
        if (path.includes('/create')) {
            return <CreateTitle />
        } else if (path.includes('edit')) {
            return <FillGadget gadgetId={'hahahah'}></FillGadget>
        } else if (path.includes('view')) {
            return <FillGadget gadgetId={'hahahah'}></FillGadget>
        }
   
    }

    const view = whichView();

    return (
        <section className={classes['Create']}>
            {view}
        </section>
    )
}

export default Create;