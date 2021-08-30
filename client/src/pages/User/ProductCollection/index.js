import { Button, Checkbox, Divider, FormControl, FormControlLabel, FormLabel, FormGroup, Grid, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useState } from 'react';
import BreadcrumbsDiv from '../../../component/BreadcrumbsDiv';
import Layout from '../../../component/Layout';
import ProductItem from '../../../component/ProductItem';
import ProductList from '../../../component/ProductList';
const useStyles = makeStyles(theme => ({
    header: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    sortSpan: {
        display: 'flex',
        alignItems: 'center'
    },
    expandIcon: {
        margin: '0 4px'
    },
    sortMenu: {
        marginTop: '44px',
    },
    formControl: {
        width: '100%',
    },
    filterLabel: {
        fontSize: '1rem',
        textTransform: 'uppercase',
        color: theme.palette.primary.dark,
        fontWeight: '500',
        marginTop: '20px',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
}))

const ProductCollection = () => {
    const classes = useStyles();
    const [sortExpand, setSortExpand] = useState(null);
    const [magnetSl, setMagnetSl] = useState(null);
    const [priceSl, setPriceSl] = useState(null);
    const [brandSl, setBrandSl] = useState(null);
    const magnetList = [
        { value: 'no', label: 'Không' },
        { value: 'yes', label: 'Có' }
    ]
    const priceList = [
        { value: 'lt1', label: 'Dưới 100.000 VND' },
        { value: '1to2', label: '100.000-200.000 VND' },
        { value: '2to5', label: '200.000-500.000 VND' },
        { value: '5to10', label: '500.000-1.000.000 VND' },
        { value: 'gt10', label: 'trên 1.000.000 VND' },
    ]
    const brandList = [
        { value: 'gan', label: 'GAN', },
        { value: 'yuxin', label: 'Yuxin', }
    ]
    const handleClose = () => {
        setSortExpand(null);
    }

    const handleClick = (e) => {
        setSortExpand(e.currentTarget);
    };

    const handleChangeValue = (e, setValue) => {
        e.target.checked === true ? setValue(e.target.value) : setValue(null);
    }

    return (
        <Layout headfoot>
            <BreadcrumbsDiv link={"/collection"} content={"Collection"} />
            <div style={{ padding: '0 48px' }}>
                <header className={classes.header}>
                    <Typography variant="h3">Dầu bôi trơn</Typography>
                    <div className={classes.sortSpan}>
                        <Button
                            className={classes.sortBtn}
                            disableFocusRipple
                            disableRipple
                            aria-controls="sort-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            Sắp xếp
                            <ExpandMoreIcon className={classes.expandIcon} />
                        </Button>
                        <Menu
                            className={classes.sortMenu}
                            id="sort-menu"
                            anchorEl={sortExpand}
                            keepMounted
                            open={Boolean(sortExpand)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>A - Z</MenuItem>
                            <MenuItem onClick={handleClose}>Z - A</MenuItem>
                            <MenuItem onClick={handleClose}>Price: Hight - Low</MenuItem>
                            <MenuItem onClick={handleClose}>Price: Low - Hight</MenuItem>
                        </Menu>
                    </div>
                </header>
                <Grid container>
                    <Grid item xs={2}>
                        <div>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel className={classes.filterLabel}>
                                    Nam châm
                                    <ExpandMoreIcon className={classes.expandIcon} />
                                </FormLabel>
                                <FormGroup>
                                    {magnetList.map((m) => {
                                        return (<FormControlLabel
                                            key={m.value}
                                            control={<Checkbox color="primary" value={m.value} checked={brandSl === m.value} onChange={(e) => handleChangeValue(e, setBrandSl)} />}
                                            label={m.label}
                                            color="primary"
                                        />)
                                    })}
                                </FormGroup>
                            </FormControl>
                            <Divider />
                        </div>
                        <div>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel className={classes.filterLabel}>
                                    Giá
                                    <ExpandMoreIcon className={classes.expandIcon} />
                                </FormLabel>
                                <FormGroup>
                                    {priceList.map((price) => {
                                        return (<FormControlLabel
                                            key={price.value}
                                            control={<Checkbox color="primary" value={price.value} checked={priceSl === price.value} onChange={(e) => handleChangeValue(e, setPriceSl)} />}
                                            label={price.label}
                                            color="primary"
                                        />)
                                    })}
                                </FormGroup>
                            </FormControl>
                            <Divider />
                        </div>
                        <div>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel className={classes.filterLabel}>
                                    Thương hiệu
                                    <ExpandMoreIcon className={classes.expandIcon} />
                                </FormLabel>
                                <FormGroup>
                                    {brandList.map((brand) => {
                                        return (<FormControlLabel
                                            key={brand.value}
                                            control={<Checkbox color="primary" value={brand.value} checked={magnetSl === brand.value} onChange={(e) => handleChangeValue(e, setMagnetSl)} />}
                                            label={brand.label}
                                            color="primary"
                                        />)
                                    })}
                                </FormGroup>
                            </FormControl>
                            <Divider />
                        </div>
                    </Grid>
                    <Grid item xs={10} style={{ paddingLeft: '40px', marginTop: '24px' }}>
                        <ProductList />
                    </Grid>
                </Grid>
            </div>
        </Layout>
    );
};

export default ProductCollection;