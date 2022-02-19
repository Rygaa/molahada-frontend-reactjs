
import classes from 'assets/5-components/Modal.module.scss'


const styles = {
    container: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        zIndex: '2',
        backgroundColor: 'rgba(0, 0, 0, .50)',
        backdropFilter: 'blur(15px)',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    miniContainer: {
            position: 'absolute',
            zIndex: '3',
            backgroundColor: 'rgba(15, 15, 15, 1)',
            backdropFilter: 'blur(15px)',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem 4rem',
            rowGap: '1.5rem',
            paddingBottom: '5rem'
    },
    hideContainer: {
        display: 'flex',
        height: '100%',
        width: '100%'
    }
}

const Modal = (props) => {
    const containerStyle = Object.assign({}, styles.container, props.containerStyle)
    const hideContainerStyle = Object.assign({}, styles.hideContainer, props.hideContainerStyle)
    const miniContainerStyle = Object.assign({}, styles.miniContainer, props.miniContainerStyle)
    return (
        <div style={containerStyle}>
            <div style={hideContainerStyle} onClick={props.close} /> 
            <div style={miniContainerStyle}>
                {props.children}
            </div>
        </div>
    )
}

export default Modal