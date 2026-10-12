import type { RouteObject } from 'react-router-dom'
import { RequireAuth } from '@/infra/auth/RequireAuth'
import UsersPage from '@/modules/users/pages/UsersPage'

export const userRoutes: RouteObject[] = [
  { path: 'users', element: <RequireAuth><UsersPage /></RequireAuth> },
]