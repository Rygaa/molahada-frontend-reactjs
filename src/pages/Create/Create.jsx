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

    const nextStep = () => {
        setStep(step => step + 1)
    }

    React.useEffect(() => {
        if (window.location.pathname != '/create') {
            setStep(1);
            dispatch(fetchGadget({ jwtoken }))
        }
    }, [])

    return (
        <section className={classes['Create']}>
            {step == 0 && <CreateTitle nextStep={nextStep}/>}
            {step == 1 && <FillGadget gadgetId={'hahahah'}></FillGadget>}
        </section>
    )
}

export default Create;