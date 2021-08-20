import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CategoryIcon from '@material-ui/icons/Category';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/styles';
import { NavLink } from 'react-router-dom';
import './styles.css';

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
        paddingTop: '20px'
    }
}))
const useStyleBase = makeStyles(theme => ({
    root: {
        marginLeft: theme.spacing(1.2),
        borderTopLeftRadius: '24px',
        borderBottomLeftRadius: '24px',
        color: theme.palette.grey[200],
    }
}), { name: 'MuiListItem' })

const DrawerList = () => {

    const classes = useStyles();
    useStyleBase();
    return (
        <>
            <Paper className={classes.paper} elevation={0} square>
                <div className={`${classes.toolbarMixins} + ${classes.toolbar}`}>ABC</div>
            </Paper>
            <List className={classes.list}>
                <NavLink to={"/admin"}>
                    <ListItem button>
                        <HomeIcon className={classes.icon} />
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </NavLink>
                <NavLink to={"/product"}>
                    <ListItem button>
                        <ListIcon className={classes.icon} />
                        <ListItemText primary="Product" />
                    </ListItem>
                </NavLink>
                <NavLink to={"/category"}>
                    <ListItem button>
                        <CategoryIcon className={classes.icon} />
                        <ListItemText primary="Category" />
                    </ListItem>
                </NavLink>
                <ListItem button>
                    <ShoppingCartIcon className={classes.icon} />
                    <ListItemText primary="Order" />
                </ListItem>
                <ListItem button>
                    <PeopleAltIcon className={classes.icon} />
                    <ListItemText primary="Customer" />
                </ListItem>
                <ListItem button>
                    <LocalAtmIcon className={classes.icon} />
                    <ListItemText primary="Revenue" />
                </ListItem>
            </List>
        </>
    );
};

export default DrawerList;