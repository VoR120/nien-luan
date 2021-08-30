import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

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
                            <Typography className={classes.header} variant="button" color="initial">Về chúng tôi</Typography>
                            <ul>
                                <li><Typography color="initial">VShop</Typography></li>
                                <li><Typography color="initial">Địa chỉ: Đường 30/4, p.Xuân Khánh, q.Ninh Kiều, tp.Cần Thơ</Typography></li>
                                <li><Typography color="initial">Điện thoại: 0981343200</Typography></li>
                                <li><Typography color="initial">Email: vshop@gmail.com</Typography></li>
                            </ul>
                        </Grid>
                        <Grid item sm={3}>
                            <Typography className={classes.header} variant="button" color="initial">Thông tin</Typography>
                            <ul>
                                <li><Typography color="initial">Chính sách</Typography></li>
                                <li><Typography color="initial">Điều khoản</Typography></li>
                            </ul>
                        </Grid>
                        <Grid item sm={3}>
                            <Typography className={classes.header} variant="button" color="initial">Kết nối với chúng tôi</Typography>
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