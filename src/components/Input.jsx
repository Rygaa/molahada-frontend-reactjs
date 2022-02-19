import classes from 'assets/5-components/Input.module.scss'
import * as React from 'react';
import classnames from "classnames";

const Input = (props) => {
    
    const textOnChange = (e) => { props.onChange(e.target.value); }
    

    return (
        <div className={classnames(classes['input-container'], props.containerClassname)}>
            <img src={props.image}/>
            <div/>
            <input 
                disabled={props.disabled}
                placeholder={props.placeholder}
                value={props.value}
                onChange={textOnChange}
                type={props.type}
                onClick = {props.focus}
                onBlur={
                    () => {
                        console.log('lostfocus');
                        console.log(props.value);
                        if (props.value?.length == 0) {
                            props.unfocus()
                        }
                    }
                }
            />
            {props.button &&
                <button 
                onClick={() => {props.onClick()}}>ADD</button>
            }
        </div>
    )
}

export default Input;




