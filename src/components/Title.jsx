


const Title = (props) => {
    return (
        <div className={props.containerClassname}>
            <p className={props.titleClassname}>{props.title}</p>
            <div className={props.lineClassname}></div>
        </div>
    )
}


export default Title;