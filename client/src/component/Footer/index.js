import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import React from 'react';

const useStyles = makeStyles(theme => ({
    footer: {
        marginTop: '60px',
        backgroundColor: theme.palette.primary.dark,
        color: 'white',
        padding: '0 48px'
    },
    container: {
        width: '100%',
        paddingTop: '40px',
        paddingBottom: '40px',
        lineHeight: '24px',
    },
    header: {
        fontSize: '1.2rem',
        margin: '10px auto',
        textTransform: 'uppercase',
    },
    copyright: {
        width: '100%',
        borderTop: '1px solid white',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    icon: {
        marginRight: theme.spacing(1)
    }
}))


const Footer = () => {

    const classes = useStyles();

    return (
        <div className={classes.footer}>
            <Grid container direction="column">
                <div className={classes.container}>
                    <Grid container>
                        <Grid item sm={6}>
                            <Typography className={classes.header} variant="button">Về chúng tôi</Typography>
                            <ul>
                                <li><Typography>VShop</Typography></li>
                                <li><Typography>Địa chỉ: Đường 30/4, p.Xuân Khánh, q.Ninh Kiều, tp.Cần Thơ</Typography></li>
                                <li><Typography>Điện thoại: 0981343200</Typography></li>
                                <li><Typography>Email: vshop@gmail.com</Typography></li>
                            </ul>
                        </Grid>
                        <Grid item sm={3}>
                            <Typography className={classes.header} variant="button">Thông tin</Typography>
                            <ul>
                                <li><Typography>Chính sách</Typography></li>
                                <li><Typography>Điều khoản</Typography></li>
                            </ul>
                        </Grid>
                        <Grid item sm={3}>
                            <Typography className={classes.header} variant="button">Kết nối với chúng tôi</Typography>
                            <ul className="icon-social">
                                <FacebookIcon className={classes.icon} fontSize="large" />
                                <TwitterIcon className={classes.icon} fontSize="large" />
                                <InstagramIcon className={classes.icon} fontSize="large" />
                            </ul>
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.copyright}>
                    © 2021 VShop, Inc.
                </div>
            </Grid>
        </div>
    )
}

export default Footer;