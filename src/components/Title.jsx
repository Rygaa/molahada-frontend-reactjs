
import classes from 'assets/5-components/Title.module.scss'

const Title = (props) => {
    return (
        <div className={classes['title-section']}>
            <p className={props.titleClassname}>{props.title}</p>
            <div className={props.lineClassname}></div>
        </div>
    )
}


export default Title;