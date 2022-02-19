
const right_to_left = {
    hidden: {
        x: '-50vw'
    },
    visible: {
        x: 0,
        transition: {
            duration: .75,
        }
    },
    exit: {
        x: '-50vw',
        transition: {
            ease: 'easeInOut',
            duration: .35,
        }
    }
}

const sidebar = {
    hidden: {
        x: '-10vw'
    },
    visible: {
        x: 0,
        transition: {
            duration: .5,
        }
    },
    exit: {
        x: '-15vw',
        transition: {
            ease: 'anticipate',
            duration: .35,
        }
    }
}


const sidebarButton = {
    hidden: {
        opacity: .5,
        width: '45%',
        overflow: 'hidden'
    },
    visible: {
        width: '100%',
        opacity: 1,
        transition: {
            ease: 'anticipate',
            duration: .5,
        }
    },
    exit: {
        x: '-15vw',
        transition: {
            ease: 'anticipate',
            duration: .35,
        }
    }
}

const animations = {
    right_to_left,
    sidebar,
    sidebarButton
}

export default animations