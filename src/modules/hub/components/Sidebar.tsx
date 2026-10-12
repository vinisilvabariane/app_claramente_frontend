import type { ReactNode } from 'react'
import { HomeRounded, LogoutRounded } from '@mui/icons-material'
import { Box, Button, Drawer, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { hubModules, type ModuleAccent } from '@/modules/hub/data/modules'
import { hasRole } from '@/infra/auth/authGuard'
import { brand } from '@/theme'
import logo from '@/assets/logo-texto.jpeg'

const accentColor: Record<ModuleAccent, string> = {
  sky: brand.sky,
  sun: brand.sun,
  sprout: brand.sprout,
  ink: brand.berry,
}

interface NavEntry {
  id: string
  title: string
  icon: ReactNode
  color: string
  path?: string
  available: boolean
}

interface SidebarProps {
  pathname: string
  userName?: string
  onLogout: () => void
  mobileOpen: boolean
  onCloseMobile: () => void
}

// A sidebar é a espinha dorsal de um sistema escolar de verdade: sempre
// visível, sempre com o mesmo texto ao lado do ícone (nunca só ícone —
// previsibilidade importa para navegação acessível), e o item atual marcado
// por cor E por uma barra lateral, nunca só por cor isolada.
export function Sidebar({ pathname, userName, onLogout, mobileOpen, onCloseMobile }: SidebarProps) {
  const isAdmin = hasRole('admin')

  const entries: NavEntry[] = [
    { id: 'feed', title: 'Início', icon: <HomeRounded />, color: brand.sky, path: '/hub', available: true },
    ...hubModules
      .filter((module) => !module.adminOnly || isAdmin)
      .map((module) => ({
        id: module.id,
        title: module.title,
        icon: module.icon,
        color: accentColor[module.accent],
        path: module.path,
        available: module.status === 'available',
      })),
  ]

  const content = (
    <Stack sx={{ height: '100%' }}>
      <Box sx={{ p: 2.5, pb: 1.5 }}>
        <Box component={RouterLink} to="/hub" sx={{ display: 'block' }}>
          <Box component="img" src={logo} alt="Claramente" sx={{ width: 130, height: 34, objectFit: 'contain', objectPosition: 'left', mixBlendMode: 'multiply' }} />
        </Box>
      </Box>

      <Stack component="nav" aria-label="Navegação principal" spacing={.5} sx={{ px: 1.5, flexGrow: 1, overflowY: 'auto', pb: 2 }}>
        {entries.map((entry) => {
          const isActive = entry.path ? (entry.path === '/hub' ? pathname === '/hub' : pathname.startsWith(entry.path)) : false
          const clickable = entry.available && !!entry.path

          const row = (
            <Stack
              direction="row" spacing={1.5}
              sx={{
                alignItems: 'center', pl: 1.5, pr: 1.75, py: 1.2, borderRadius: 3,
                bgcolor: isActive ? `${entry.color}18` : 'transparent',
                borderLeft: `4px solid ${isActive ? entry.color : 'transparent'}`,
                color: isActive ? entry.color : clickable ? 'text.primary' : 'text.disabled',
                fontWeight: isActive ? 800 : 700,
                transition: 'background-color .25s ease, color .25s ease',
                ...(clickable && !isActive && { '&:hover': { bgcolor: '#F4F6F8' } }),
              }}
            >
              <Box sx={{ display: 'flex', fontSize: 21 }}>{entry.icon}</Box>
              <Typography sx={{ fontWeight: 'inherit', fontSize: 14.5, flexGrow: 1 }}>{entry.title}</Typography>
              {!entry.available && <Typography variant="caption" sx={{ fontWeight: 800, color: '#9AA6B2', fontSize: 10 }}>EM BREVE</Typography>}
            </Stack>
          )

          if (clickable) {
            return (
              <Box key={entry.id} component={RouterLink} to={entry.path!} onClick={onCloseMobile} sx={{ textDecoration: 'none' }}>
                {row}
              </Box>
            )
          }
          return <Box key={entry.id} aria-disabled>{row}</Box>
        })}
      </Stack>

      <Box sx={{ p: 2, borderTop: '1px solid #ECEFF3' }}>
        <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center', mb: 1.5 }}>
          <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: brand.sky, color: 'white', display: 'grid', placeItems: 'center', fontWeight: 800, flexShrink: 0 }}>
            {(userName ?? '?').charAt(0).toUpperCase()}
          </Box>
          <Typography sx={{ fontWeight: 700, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{userName}</Typography>
        </Stack>
        <Button fullWidth variant="outlined" color="primary" startIcon={<LogoutRounded />} onClick={onLogout}>Sair</Button>
      </Box>
    </Stack>
  )

  return (
    <>
      <Box component="aside" sx={{ display: { xs: 'none', md: 'block' }, width: 268, flexShrink: 0, borderRight: '1px solid #ECEFF3', bgcolor: 'white', position: 'sticky', top: 0, height: '100vh' }}>
        {content}
      </Box>
      <Drawer open={mobileOpen} onClose={onCloseMobile} sx={{ display: { xs: 'block', md: 'none' } }} slotProps={{ paper: { sx: { width: 280 } } }}>
        {content}
      </Drawer>
    </>
  )
}
