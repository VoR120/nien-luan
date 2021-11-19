import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { makeStyles } from '@mui/styles';
import { NavLink } from 'react-router-dom';
import './styles.css';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

const useStyles = makeStyles(theme => ({
    toolbarMixins: theme.mixins.toolbar,
    toolbar: {
        backgroundColor: theme.palette.primary.light,
    },
    icon: {
        marginRight: theme.spacing(1),
        color: theme.palette.grey[500]
    },
    list: {
        overflow: 'hidden',
        paddingTop: '20px',
        paddingBottom: '20px'
    }
}))
// const useStyleBase = makeStyles(theme => ({
//     root: {
//         marginLeft: theme.spacing(1.2),
//         borderTopLeftRadius: '24px',
//         borderBottomLeftRadius: '24px',
//         color: theme.palette.grey[200],
//     }
// }), { name: 'MuiListItem' })

const muiListTheme = createTheme(theme => ({
    components: {
        MuiListItem: {
            styleOverrides: {
                root: {
                    marginLeft: theme.spacing(1.2),
                    borderTopLeftRadius: '24px',
                    borderBottomLeftRadius: '24px',
                    color: theme.palette.grey[200],
                }
            }
        }
    }
}))
const DrawerList = () => {

    const classes = useStyles();
    return (
        <>
            <Paper className={classes.paper} elevation={0} square>
                <div className={`${classes.toolbarMixins} + ${classes.toolbar}`}></div>
            </Paper>
            <List className={classes.list}>
                {/* <NavLink to={"/admin"}>
                    <ListItem button>
                        <HomeIcon className={classes.icon} />
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </NavLink> */}
                <NavLink to={"/product"}>
                    <ListItem button>
                        <ListIcon className={classes.icon} />
                        <ListItemText primary="Sản phẩm" />
                    </ListItem>
                </NavLink>
                <NavLink to={"/category"}>
                    <ListItem button>
                        <CategoryIcon className={classes.icon} />
                        <ListItemText primary="Danh mục" />
                    </ListItem>
                </NavLink>
                <NavLink to={"/customer"}>
                    <ListItem button>
                        <PeopleAltIcon className={classes.icon} />
                        <ListItemText primary="Khách hàng" />
                    </ListItem>
                </NavLink>
                <NavLink to={"/aorder"}>
                    <ListItem button>
                        <ShoppingCartIcon className={classes.icon} />
                        <ListItemText primary="Đơn hàng" />
                    </ListItem>
                </NavLink>
                {/* <ListItem button>
                    <LocalAtmIcon className={classes.icon} />
                    <ListItemText primary="Revenue" />
                </ListItem> */}
            </List>
        </>
    );
};

export default DrawerList;