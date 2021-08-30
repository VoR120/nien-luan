import { lazy } from "react";

export const routes = [
    {
        path: '/product',
        exact: false,
        component: lazy(() => import('./Admin/AProduct')),
        isPrivate: true,
    },
    {
        path: '/category',
        exact: false,
        component: lazy(() => import('./Admin/ACategory')),
        isPrivate: true,
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
        path: '/admin',
        exact: true,
        component: lazy(() => import('./Admin/ADashboard')),
        isPrivate: true,
    },
    {
        path: '/',
        exact: true,
        component: lazy(() => import('./User/Home')),
    },
    {
        path: '/productdetail',
        exact: true,
        component: lazy(() => import('./User/Product')),
    },
    {
        path: '/collection',
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
    },
]
