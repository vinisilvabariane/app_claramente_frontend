import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import RootLayout from '@/layouts/RootLayout'
import LandingPage from '@/pages/LandingPage'
import AboutPage from '@/pages/AboutPage'
import ComponentsPage from '@/pages/ComponentsPage'
import NotFoundPage from '@/pages/NotFoundPage'
import { authRoutes } from '@/modules/auth/routes'
import { classroomRoutes } from './modules/classroom/routes'
import { userRoutes } from './modules/users/routes'
import { hubRoutes } from './modules/hub/routes'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'components', element: <ComponentsPage /> },
      ...authRoutes,
      ...hubRoutes,
      ...classroomRoutes,
      ...userRoutes,
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]

export const router = createBrowserRouter(routes)
