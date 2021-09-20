import makeStyles from '@mui/styles/makeStyles';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import React, { useState } from 'react';
import DrawerList from '../DrawerList';

const drawerWidth = 254;

const useStyles = makeStyles(theme => ({
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        boxShadow: 'none',
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    drawer: {
        backgroundColor: theme.palette.secondary.main,
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    // necessary for content to be below app bar
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.secondary.dark,
        borderRight: 'none',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    icon: {
        color: theme.palette.grey[500],
        marginRight: theme.spacing(2),
        fontSize: theme.spacing(2.5)
    },
}));

const AdminDrawer = (props) => {
    const { window } = props;
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <nav className={classes.drawer}>
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={'right'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    <DrawerList />
                </Drawer>
            </Hidden>
            <Hidden mdDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    <DrawerList />
                </Drawer>
            </Hidden>
        </nav>
    );
}


export default AdminDrawer;