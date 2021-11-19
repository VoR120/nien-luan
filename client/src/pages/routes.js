import { lazy } from "react";

export const routes = [
    {
        path: '/product',
        exact: false,
        component: lazy(() => import('./Admin/AProduct')),
        isPrivateAdmin: true,
    },
    {
        path: '/category',
        exact: false,
        component: lazy(() => import('./Admin/ACategory')),
        isPrivateAdmin: true,
    },
    {
        path: '/admin/login',
        exact: false,
        component: lazy(() => import('./Admin/ALogin'))
    },
    {
        path: '/admin/register',
        exact: false,
        component: lazy(() => import('./Admin/ARegister'))
    },
    {
        path: '/aorder',
        exact: true,
        component: lazy(() => import('./Admin/AOrder')),
        isPrivateAdmin: true,
    },
    {
        path: '/customer',
        exact: true,
        component: lazy(() => import('./Admin/ACustomer')),
        isPrivateAdmin: true,
    },
    {
        path: '/admin',
        exact: true,
        component: lazy(() => import('./Admin/ADashboard')),
        isPrivateAdmin: true,
    },
    {
        path: '/',
        exact: true,
        component: lazy(() => import('./User/Home')),
    },
    {
        path: '/productdetail/:slug',
        exact: false,
        component: lazy(() => import('./User/Product')),
    },
    {
        path: '/collection/:category',
        exact: true,
        component: lazy(() => import('./User/ProductCollection')),
    },
    {
        path: '/cart',
        exact: true,
        component: lazy(() => import('./User/Cart')),
    },
    {
        path: '/order',
        exact: true,
        component: lazy(() => import('./User/Order')),
        isPrivate: true
    },
    {
        path: '/login',
        exact: true,
        component: lazy(() => import('./User/Login')),
    },
    {
        path: '/register',
        exact: true,
        component: lazy(() => import('./User/Register')),
    },
    {
        path: '/info',
        exact: true,
        component: lazy(() => import('./User/Info')),
        isPrivate: true
    },
    {
        path: '/myorder',
        exact: true,
        component: lazy(() => import('./User/MyOrder')),
        isPrivate: true
    },
]
