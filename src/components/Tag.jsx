

import classes from "assets/5-components/Tag.module.scss"
import deleteICON from "images/edit.png"
const Tag = (props) => {
    
    return (
        <div className={classes['Tag']}>
            <p>{props.text}</p>
            {!props.disabled &&
                <img src={deleteICON} onClick={() => {
                    props.onClick(props.text, props.id)
                }}
                />
            }
        </div>
    )
}

export default Tag;