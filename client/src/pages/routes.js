import { lazy } from "react";

export const routes = [
    {
        path: '/product',
        exact: false,
        component: lazy(() => import('./Admin/AProduct')),
        isPrivate: true,
    },
    {
        path: '/admin',
        exact: true,
        component: lazy(() => import('./Admin/ADashboard')),
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
]
