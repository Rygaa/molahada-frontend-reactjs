

import classes from "assets/5-components/Link.module.scss"
import deleteICON from "images/edit.png"

const Link = (props) => {
    
    return (
        <div className={classes['Link']}>
            <div>
                <p>{props.text}</p>
                <a href={'//' + props.url} target="_blank">{props.url}</a>
            </div>
            {!props.disabled &&
                <img src={deleteICON} onClick={() => {
                    props.onClick(props.text, props.id)
                }}
                />
            }
        </div>
    )
}

export default Link;