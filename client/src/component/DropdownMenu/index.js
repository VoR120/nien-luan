import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { Link } from 'react-router-dom';
import './DropdownMenu.scss';

const useStyles = makeStyles(theme => ({
    // link: {
    //     color: theme.palette.primary.main
    // }
}))

const DropdownMenu = () => {
    const classes = useStyles();

    return (

        <header className="menu-bar">
            <ul className="menu-bar__wrapper">
                <li>
                    Rubik
                    <div className="menu-dropdown__wrapper">
                        <ul className="menu-dropdown__list flex-4">
                            <ul><b>Sản phẩm mới</b>
                                <Link to="/collection/3x3"><li>Gan M Pro 3x3</li></Link>
                                <li>Gan M Pro 3x3 Mini</li>
                            </ul>
                            <ul><b>Rubik WCA </b>
                                <li>2x2</li>
                                <li>3x3</li>
                                <li>4x4</li>
                                <li>5x5</li>
                                <li>6x6</li>
                                <li>7x7</li>
                            </ul>
                            <ul><b>Rubik biến thể</b>
                                <li>Pyramidx</li>
                                <li>Square</li>
                                <li>Megaminx</li>
                                <li>Gear Puzzle</li>
                                <li>Shape Mode</li>
                            </ul>
                            <ul><b>Rubik khác</b>
                                <li>8x8+</li>
                                <li>Gear Puzzle</li>
                            </ul>
                        </ul>
                    </div>
                </li>
                <li>
                    Dầu bôi trơn
                    <div className="menu-dropdown__wrapper">
                        <ul className="menu-dropdown__list flex-2">
                            <ul><b>Sản phẩm mới</b>
                                <li>Luna</li>
                                <li>Moon</li>
                            </ul>
                            <ul><b>Loại</b>
                                <li>Cosmic lube</li>
                                <li>Speed lube</li>
                            </ul>
                        </ul>
                    </div>
                </li>
                <li>
                    Sticker
                    <div className="menu-dropdown__wrapper">
                        <ul className="menu-dropdown__list flex-2">
                            <ul><b>Sản phẩm mới</b>
                                <li>Sticker 3x3</li>
                                <li>Sticker Pyraminx</li>
                            </ul>
                            <ul><b>Loại</b>
                                <li>Logo Sticker</li>
                                <li>Application Tools</li>
                                <li>Shades Guide</li>
                            </ul>
                        </ul>
                    </div>
                </li>
                <li>
                    Phụ kiện khác
                    <div className="menu-dropdown__wrapper">
                        <ul className="menu-dropdown__list flex-3">
                            <ul><b>Sản phẩm mới</b>
                                <li>Timer Yuxin</li>
                                <li>Gan Bag</li>
                                <li>Tất cả</li>
                            </ul>
                            <ul><b>Đồng hồ và thảm</b>
                                <li>Đồng hồ bấm giờ</li>
                                <li>Thảm</li>
                                <li>Đồng hồ kết hợp thảm</li>
                            </ul>
                            <ul><b>Phụ kiện khác</b>
                                <li>Túi đựng</li>
                                <li>Nam châm</li>
                                <li>Phụ kiện chỉnh sửa</li>
                                <li>Ống bơm dầu</li>
                            </ul>
                        </ul>
                    </div>
                </li>

            </ul>
        </header>
    )
}

export default DropdownMenu;