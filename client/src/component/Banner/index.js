import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyle = makeStyles({
    banner: props => ({
        backgroundImage: `url(${props.backgroundImage})`,
        position: 'relative',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        top: '108px',
        height: '650px',
        zIndex: '-9',
    })
})

const Banner = (props) => {

    const classes = useStyle(props);

    return (
        <div className={classes.banner}/>
    )
}

export default Banner;