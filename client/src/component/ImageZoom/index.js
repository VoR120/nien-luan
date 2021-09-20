import { Dialog } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
    image: {
        height: '52px',
        padding: '2px 0',
        cursor: 'pointer'
    },
    zoomImage: {
        height: '100%',
    },
    dialog: {
        height: '646px',
        display: 'flex'
    }
}))

const ImageZoom = (props) => {
    const classes = useStyles();
    const [imageOpen, setImageOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [image, setImage] = useState([]);

    const handleOpen = (img) => {
        setImage(img);
        setImageOpen(true);
    }
    return (
        <div style={{ height: '100%' }}>
            <img
                onClick={() => handleOpen(props.images)}
                className={classes.image}
                src={props.images[0].url}
                alt="text"
            />
            <Dialog
                PaperProps={{ className: classes.dialog }}
                maxWidth="lg"
                open={imageOpen}
                onClose={() => setImageOpen(false)}
            >
                <>
                    {image.map(i => {
                        return <img className={classes.zoomImage} src={i.url} alt="text" />
                    })}
                </>
            </Dialog>
        </div>
    );
};

export default ImageZoom;