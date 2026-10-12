import type { RouteObject } from 'react-router-dom'
import { RequireAuth } from '@/infra/auth/RequireAuth'
import ClassroomPage from './pages/ClassroomPage'

export const classroomRoutes: RouteObject[] = [
  { path: 'classroom', element: <RequireAuth><ClassroomPage /></RequireAuth> },
]
