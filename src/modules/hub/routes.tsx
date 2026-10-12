import type { RouteObject } from 'react-router-dom'
import { RequireAuth } from '@/infra/auth/RequireAuth'
import HubPage from '@/modules/hub/pages/HubPage'

export const hubRoutes: RouteObject[] = [
  { path: 'hub', element: <RequireAuth><HubPage /></RequireAuth> },
]
