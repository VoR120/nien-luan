import { makeStyles } from '@material-ui/core';
import React from 'react';
import './DropdownMenu.scss';

const useStyles = makeStyles({
})

const DropdownMenu = () => {

    const classes = useStyles();

    return (

        <header class="menu-bar">
            <ul class="menu-bar__wrapper">
                <li>
                    Nam
                    <div class="menu-dropdown__wrapper">
                        <ul class="menu-dropdown__list flex-3">
                            <ul><b>News & feathers</b>
                                <li>News</li>
                                <li>Feathers</li>
                            </ul>
                            <ul><b>Shoes</b>
                                <li>Soccer</li>
                                <li>Running</li>
                            </ul>
                            <ul><b>Clothings</b>
                                <li>Hodies</li>
                                <li>Short Pant</li>
                                <li>Hodies</li>
                                <li>Short Pant</li>
                                <li>Hodies</li>
                                <li>Short Pant</li>
                                <li>Hodies</li>
                                <li>Short Pant</li>
                                <li>Hodies</li>
                                <li>Short Pant</li>
                                <li>Hodies</li>
                                <li>Short Pant</li>
                            </ul>
                        </ul>
                    </div>
                </li>
                <li>
                    Nữ
                    <div class="menu-dropdown__wrapper">
                        <ul class="menu-dropdown__list flex-4">
                            <ul><b>News & feathers</b>
                                <li>News</li>
                                <li>Feathers</li>
                            </ul>
                            <ul><b>Shoes</b>
                                <li>Soccer</li>
                                <li>Running</li>
                            </ul>
                            <ul><b>Clothings</b>
                                <li>Hodies</li>
                                <li>Short Pant</li>
                            </ul>
                            <ul><b>Clothings</b>
                                <li>Hodies</li>
                                <li>Short Pant</li>
                            </ul>
                        </ul>
                    </div>
                </li>
                <li>
                    Thể thao
                    <div class="menu-dropdown__wrapper">
                        <ul class="menu-dropdown__list flex-3">
                            <ul><b>News & feathers</b>
                                <li>News</li>
                                <li>Feathers</li>
                            </ul>
                            <ul><b>Shoes</b>
                                <li>Soccer</li>
                                <li>Running</li>
                            </ul>
                            <ul><b>Clothings</b>
                                <li>Hodies</li>
                                <li>Short Pant</li>
                            </ul>
                        </ul>
                    </div>
                </li>
                <li>Hãng</li>

            </ul>
        </header>
    )
}

export default DropdownMenu;