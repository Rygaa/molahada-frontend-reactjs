import classes from 'assets/5-components/Button.module.scss'
import classNames from 'classnames';

const Button = (props) => {
    return (
        <button 
            onClick={props.onClick}
            disabled = {props.disabled}
            className={classNames(classes['Button'], props.containerClassname)}
            style={props.style}
        >
            { props.text }
        </button>
    )
}

export default Button;