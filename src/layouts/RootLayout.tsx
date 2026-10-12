import { useState } from 'react'
import { CloseRounded, MenuRounded } from '@mui/icons-material'
import { AppBar, Box, Button, Container, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import { Sidebar } from '@/modules/hub/components/Sidebar'
import { brand } from '@/theme'
import logo from '@/assets/logo-texto.jpeg'

const APP_PATHS = ['/hub', '/classroom', '/users']

export default function RootLayout() {
  const { isAuthenticated, user, logout } = useAuth()
  const { pathname } = useLocation()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const isAuthPage = pathname === '/login' || pathname === '/register'
  const isAppPage = APP_PATHS.some((path) => pathname.startsWith(path))

  if (isAuthPage) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: brand.cream }}>
        <IconButton component={RouterLink} to="/" aria-label="Voltar para a página inicial" sx={{ position: 'fixed', zIndex: 2, top: 18, right: 20, color: 'primary.main', bgcolor: 'white', border: '1px solid #E7ECEF', '&:hover': { bgcolor: '#F4F6F8' } }}><CloseRounded /></IconButton>
        <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><Outlet /></Box>
        <Box component="footer" sx={{ py: 2.5, textAlign: 'center' }}>
          <Typography variant="caption" color="text.disabled">© 2026 Claramente Educação Inclusiva. Feito com carinho.</Typography>
        </Box>
      </Box>
    )
  }

  if (isAppPage) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', bgcolor: 'background.default' }}>
        <Sidebar
          pathname={pathname}
          userName={user?.name}
          onLogout={() => void logout()}
          mobileOpen={mobileNavOpen}
          onCloseMobile={() => setMobileNavOpen(false)}
        />
        <Box sx={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <AppBar position="sticky" elevation={0} sx={{ display: { xs: 'flex', md: 'none' }, bgcolor: 'white', color: 'primary.main', borderBottom: '1px solid #E7ECEF' }}>
            <Toolbar sx={{ minHeight: 62, px: 2, gap: 1 }}>
              <IconButton edge="start" aria-label="Abrir menu" onClick={() => setMobileNavOpen(true)}><MenuRounded /></IconButton>
              <Box component="img" src={logo} alt="Claramente" sx={{ width: 122, height: 32, objectFit: 'contain', objectPosition: 'left', mixBlendMode: 'multiply' }} />
            </Toolbar>
          </AppBar>
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, py: { xs: 3, md: 4.5 } }}><Outlet /></Container>
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: brand.sky, color: 'white' }}>
        <Toolbar component={Container} maxWidth="lg" disableGutters sx={{ minHeight: 78, px: { xs: 2, sm: 3 } }}>
          <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box component="img" src={logo} alt="Claramente" sx={{ width: 162, height: 44, objectFit: 'contain', objectPosition: 'left', mixBlendMode: 'multiply' }} />
          </Box>
          <Stack direction="row" spacing={.5} sx={{ alignItems: 'center', display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit" component="a" href="#produto">Produto</Button>
            <Button color="inherit" component="a" href="#escolas">Escolas</Button>
            <Button color="inherit" component="a" href="#pais">Pais</Button>
            <Button color="inherit" component="a" href="#sobre">Sobre nós</Button>
          </Stack>
          {isAuthenticated ? (
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Button variant="contained" color="secondary" component={RouterLink} to="/hub" sx={{ color: 'white', boxShadow: 'none' }}>Ir para o Hub</Button>
              <Button variant="outlined" color="inherit" onClick={() => void logout()}>Sair</Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" color="inherit" component={RouterLink} to="/login" sx={{ borderColor: 'white' }}>Entrar</Button>
              <Button variant="contained" color="secondary" component={RouterLink} to="/register" sx={{ display: { xs: 'none', sm: 'inline-flex' }, color: 'white', boxShadow: 'none' }}>Experimente grátis</Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><Outlet /></Box>

      <Box component="footer" id="sobre" sx={{ bgcolor: brand.inkDeep, color: 'white', pt: 6, pb: 3 }}>
        <Container maxWidth="lg" sx={{ px: { xs: 3, sm: 4 } }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr 1.4fr' }, gap: 4, pb: 4 }}>
            <Box>
              <Typography variant="h6" sx={{ fontFamily: 'Fredoka', fontWeight: 700 }}>Claramente</Typography>
              <Typography variant="body2" sx={{ mt: 1.25, color: 'rgba(255,255,255,.72)', maxWidth: 340, lineHeight: 1.65 }}>Nossa missão é criar um mundo onde toda criança neurodivergente descubra o prazer de aprender no seu próprio ritmo.</Typography>
            </Box>
            <FooterColumn title="Produto" links={['Como funciona', 'Jogos e atividades', 'Planos e preços']} />
            <FooterColumn title="Suporte" links={['Central de ajuda', 'Para escolas', 'Contato']} />
            <Box>
              <Typography sx={{ fontWeight: 700 }}>Pronto para começar?</Typography>
              <Button component={RouterLink} to="/register" variant="contained" color="secondary" sx={{ mt: 1.5, color: 'white' }}>Experimente grátis</Button>
            </Box>
          </Box>
          <Box sx={{ pt: 2.5, borderTop: '1px solid rgba(255,255,255,.22)' }}>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,.62)' }}>© 2026 Claramente Educação Inclusiva. Feito com carinho.</Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

function FooterColumn({ title, links }: { title: string, links: string[] }) {
  return (
    <Box>
      <Typography sx={{ fontWeight: 700 }}>{title}</Typography>
      <Stack spacing={.8} sx={{ mt: 1.2 }}>{links.map((link) => <Typography key={link} variant="body2" sx={{ color: 'rgba(255,255,255,.7)' }}>{link}</Typography>)}</Stack>
    </Box>
  )
}
