import classes from 'assets/5-components/Checkbox.module.scss'
import checkICON from 'images/check.png'
import React, { useState } from 'react'
const Checkbox = (props) => {
    const [status, setStatus] = useState(props.status);

    React.useEffect(() => {
        props.onClick(status);
        console.log('clicked')
    }, [status])

    return (
        <div className={classes['container']}>
            <div className={classes['Checkbox']} onClick={() => { setStatus(!status) }}>
                {status ? <img src={checkICON} /> : null}
            </div>
            { props.children }
        </div>
    )
}

export default Checkbox;