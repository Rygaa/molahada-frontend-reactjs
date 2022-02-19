
import { motion } from "framer-motion"
import classes from "assets/4-layout/Loading.module.scss"

const Loading = (props) => {
    return (
        <div className={classes['container']}>
            <motion.div
                className={classes['motion']}
                style={{
                    width: '50px',
                    height: '50px',
                }}
                animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                    backgroundColor: ["#60F", "#60F", "#09F", "#09F", "#FA0", "#FA0", "#60F"],
                }}
                transition={{ repeat: Infinity, duration: '3.5' }}
            />
            <p
                className={classes['text']}
            >Loading</p>
        </div>

    )
}

export default Loading;