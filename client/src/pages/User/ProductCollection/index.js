import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useContext, useEffect, useState } from 'react';
import BreadcrumbsDiv from '../../../component/BreadcrumbsDiv';
import Layout from '../../../component/Layout';
import ProductList from '../../../component/ProductList';
import Loading from '../../../component/Loading'
import { ProductContext } from '../../../contextAPI/ProductContext';
import { getAllProduct, getProduct } from '../../../action/productAction';
import { useLocation } from 'react-router';

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
    const { product, productDispatch } = useContext(ProductContext);
    const [sortExpand, setSortExpand] = useState(null);
    const [sortSl, setSortSl] = useState(null);
    const [magnetSl, setMagnetSl] = useState(null);
    const [priceSl, setPriceSl] = useState(null);
    const [brandSl, setBrandSl] = useState(null);
    const location = useLocation();
    const category = location.pathname.slice(12);

    useEffect(() => {
        let filterArr = [];
        filterArr.push({ category: category })
        getProduct(productDispatch, { filterArr })
        return () => {
            getAllProduct(productDispatch)
        }
    }, [])

    useEffect(() => {
        let filterArr = [];
        filterArr.push({ category: category })
        getProduct(productDispatch, { filterArr })
    }, [category])

    useEffect(() => {
        let filterArr = [];
        filterArr.push({ magnet: magnetSl }, { price: priceSl }, { brand: brandSl }, { category: category }, { sort: sortSl })
        getProduct(productDispatch, { filterArr })
    }, [magnetSl, priceSl, brandSl, sortSl])

    const magnetList = [
        { value: "0", label: 'Không' },
        { value: "1", label: 'Có' }
    ]
    const priceList = [
        { value: 'lt1', label: 'Dưới 100.000 VND' },
        { value: '1to2', label: '100.000-200.000 VND' },
        { value: '2to5', label: '200.000-500.000 VND' },
        { value: '5to10', label: '500.000-1.000.000 VND' },
        { value: 'gt10', label: 'trên 1.000.000 VND' },
    ]
    const brandList = [
        { value: 'GAN', label: 'GAN', },
        { value: 'Yuxin', label: 'Yuxin', },
        { value: 'QiYi', label: 'QiYi', },
        { value: 'MoYu', label: 'MoYu', },
        { value: 'MoFang', label: 'MoFang', },
        { value: 'YJ', label: 'YJ', },
    ]
    const handleClose = () => {
        setSortExpand(null);
    }

    const handleSort = (e, value) => {
        handleClose()
        setSortSl(value);
    }

    const handleClick = (e) => {
        setSortExpand(e.currentTarget);
    };

    const handleChangeValue = (e, setValue) => {
        e.target.checked ? setValue(e.target.value) : setValue(null);
    }

    return (
        <Layout headfoot>
            <BreadcrumbsDiv link={"/collection"} content={"Collection"} />
            <div style={{ padding: '0 48px' }}>
                <header className={classes.header}>
                    <Typography variant="h3">Collection</Typography>
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
                            <MenuItem onClick={(e) => handleSort(e, "name")}>A - Z</MenuItem>
                            <MenuItem onClick={(e) => handleSort(e, "-name")}>Z - A</MenuItem>
                            <MenuItem onClick={(e) => handleSort(e, "-price")}>Giá cao đến thấp</MenuItem>
                            <MenuItem onClick={(e) => handleSort(e, "price")}>Giá thấp đến cao</MenuItem>
                        </Menu>
                    </div>
                </header>
                <Grid container>
                    <Grid item xs={2}>
                        {/* < */}
                        <Accordion defaultExpanded={true}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Nam châm</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FormGroup>
                                    {magnetList.map((m) => {
                                        return (<FormControlLabel
                                            key={m.value}
                                            control={<Checkbox color="primary" value={m.value} checked={magnetSl === m.value} onChange={(e) => handleChangeValue(e, setMagnetSl)} />}
                                            label={m.label}
                                            color="primary"
                                        />)
                                    })}
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion defaultExpanded={true}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Giá</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
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
                            </AccordionDetails>
                        </Accordion>
                        <Accordion defaultExpanded={true}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Thương hiệu</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <FormGroup>
                                {brandList.map((brand) => {
                                    return (<FormControlLabel
                                        key={brand.value}
                                        control={<Checkbox color="primary" value={brand.value} checked={brandSl === brand.value} onChange={(e) => handleChangeValue(e, setBrandSl)} />}
                                        label={brand.label}
                                        color="primary"
                                    />)
                                })}
                            </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item xs={10} style={{ paddingLeft: '40px', marginTop: '24px' }}>
                        {
                            product.loading ?
                                <Loading loading={true} />
                                :
                                product.products.length > 0 ?
                                    <ProductList product={product.products} />
                                    :
                                    <>Không có sản phẩm</>
                        }
                    </Grid>
                </Grid>
            </div>
        </Layout>
    );
};

export default ProductCollection;