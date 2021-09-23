import { Grid, TextField, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import BreadcrumbsDiv from '../../../component/BreadcrumbsDiv';
import Layout from '../../../component/Layout';
const useStyles = makeStyles(theme => ({
    header: {
        textTransform: 'uppercase',
        fontWeight: '500',
        letterSpacing: '3px',
        marginBottom: theme.spacing(5),
    },
    headerAcc: {
        textTransform: 'uppercase',

    },
    item: {
        margin: '10px 0',
    }
}))

const Info = () => {
    const classes = useStyles();
    return (
        <Layout headfoot>
            <BreadcrumbsDiv link={"/info"} content={"Thông tin"} />
            <Grid>
                <Grid container>
                    <Grid item xs={3} />
                    <Grid item xs={6} >
                        <Typography className={classes.header} variant="h3" color="initial">Thông tin</Typography>
                        <Accordion variant="outlined" square>
                            <AccordionSummary

                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.headerAcc}>Thông tin</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid className={classes.item} container>
                                    <Grid item xs={3}>Họ tên</Grid>
                                    <Grid item xs={8}>Nguyễn Văn A</Grid>
                                    <Grid item xs={1}>Sửa</Grid>
                                </Grid>
                                <Grid className={classes.item} container>
                                    <Grid item xs={3}>Email</Grid>
                                    <Grid item xs={9}>vonguyen@gmail.com</Grid>
                                </Grid>
                                <Grid className={classes.item} container>
                                    <Grid item xs={3}>Số điện thoại</Grid>
                                    <Grid item xs={9}>0124512478</Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion variant="outlined" square>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography className={classes.headerAcc}>Thông tin giao hàng</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid className={classes.item} container>
                                    <Grid item xs={3}>1.</Grid>
                                    <Grid item xs={8}>
                                        <Grid container>
                                            <Grid item xs={3}>Họ tên:</Grid>
                                            <Grid item xs={9}>Nguyễn Văn Vỏ</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={3}>Địa chỉ:</Grid>
                                            <Grid item xs={9}>Ba Chúc, Tri Tôn, An Giang</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={3}>Số điện thoại:</Grid>
                                            <Grid item xs={9}>0124512483</Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography>Sửa</Typography>
                                        <Typography>Xóa</Typography>
                                    </Grid>
                                </Grid>
                                <Grid className={classes.item} container>
                                    <Grid item xs={3}>1.</Grid>
                                    <Grid item xs={8}>
                                        <Grid container>
                                            <Grid item xs={3}>Họ tên:</Grid>
                                            <Grid item xs={9}>Nguyễn Văn Vỏ</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={3}>Địa chỉ:</Grid>
                                            <Grid item xs={9}>Ba Chúc, Tri Tôn, An Giang</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={3}>Số điện thoại:</Grid>
                                            <Grid item xs={9}>0124512483</Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography>Sửa</Typography>
                                        <Typography>Xóa</Typography>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion variant="outlined" square>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography className={classes.headerAcc}>Đổi mật khẩu</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid alignItems="center" className={classes.item} container>
                                    <Grid item xs={4}>Nhập mật khẩu hiện tại</Grid>
                                    <Grid item xs={8}>
                                        <TextField type="password" fullWidth size="small" />
                                    </Grid>
                                </Grid>
                                <Grid alignItems="center" className={classes.item} container>
                                    <Grid item xs={4}>Nhập mật khẩu mới</Grid>
                                    <Grid item xs={8}>
                                        <TextField type="password" fullWidth size="small" />
                                    </Grid>
                                </Grid>
                                <Grid alignItems="center" className={classes.item} container>
                                    <Grid item xs={4}>Xác nhận mật khẩu</Grid>
                                    <Grid item xs={8}>
                                        <TextField type="password" fullWidth size="small" />
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item xs={3} />
                </Grid>
            </Grid>
        </Layout>
    );
};

export default Info;