import classes from 'assets/5-components/InputFile.module.scss'
import * as React from 'react';
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
const url = 'http://localhost:4005'

const InputFile = (props) => {
    const username = useSelector((state) => state.user.username)
    const textOnChange = (e) => { props.onChange(e.target.value); }
    const myRef = React.useRef(null);
    const imageRef = React.useRef(null);
    const fileOnChange = () => {
        props.setSelectedFile(myRef.current.files[0])
        var reader = new FileReader();
        reader.onload = function (e) {
            imageRef.current.src = e.target.result;
        };
        reader.readAsDataURL(myRef.current.files[0]);  
 
        console.log(myRef.current.value)
    }

    const x = `${url}/profile-picture/${username}`;

    const inputOnClick = () => {
        myRef.current.value = null;
        console.log(myRef.current.click())
    }

    return (
        <div className={classnames(classes['Input'], props.containerClassname)} onClick={inputOnClick} style={{display: 'flex', width: 'fit-content', alignSelf: "center"}}>
            <img ref={imageRef} src={x}/>
            <input type="file" type="file" ref={myRef} onChange={fileOnChange} style={{ display: "none" }}></input>
        </div>
    )
}

export default InputFile;