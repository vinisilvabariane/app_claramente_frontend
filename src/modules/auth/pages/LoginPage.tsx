import { Apple, GroupsRounded, SchoolRounded } from '@mui/icons-material'
import { useState, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Alert, Box, Button, Divider, Paper, Stack, TextField, Tooltip, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { AuthService } from '@/modules/auth/services/authService'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import { brand } from '@/theme'
import { FloatingShapes } from '@/components/motion/FloatingShapes'
import { Mascot } from '@/components/mascot/Mascot'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [audience, setAudience] = useState('family')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setLoading(true)
    const result = await AuthService.login(email, password)
    setLoading(false)
    if (!result.success) { setError(result.error); return }
    const { token, refreshToken, refreshExpires } = result.data
    login(token, refreshToken, refreshExpires)
    navigate('/hub')
  }

  return (
    <AuthShell title="Login" subtitle="Preencha seus dados para começar." audience={audience} setAudience={setAudience}>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={1.35}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField placeholder="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth />
          <TextField placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth />
          <Button type="submit" variant="contained" color="success" disabled={loading} sx={{ mt: .65, color: 'white' }}>{loading ? 'Entrando...' : 'Entrar'}</Button>
          <Typography variant="body2" align="center" color="text.secondary">
            Ainda não tem uma conta? <Box component={RouterLink} to="/register" sx={{ fontWeight: 700, color: 'primary.main', textDecoration: 'none' }}>Cadastre-se</Box>
          </Typography>
        </Stack>
      </Box>
    </AuthShell>
  )
}

export function AuthShell({ title, subtitle, audience, setAudience, children }: { title: string, subtitle: string, audience: string, setAudience: (value: string) => void, children: ReactNode }) {
  const reduceMotion = useReducedMotion()

  return (
    <Box sx={{ position: 'relative', width: '100%', minHeight: '100%', display: 'grid', placeItems: 'center', p: { xs: 2, md: 4 }, bgcolor: brand.cream }}>
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.01 : 0.55, ease: [0.22, 0.61, 0.36, 1] }}
        style={{ width: 'min(850px, 100%)', position: 'relative' }}
      >
        <Paper elevation={0} sx={{ width: '100%', overflow: 'hidden', borderRadius: 5, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' }, border: '1px solid #E7ECEF', boxShadow: '0 18px 40px rgba(11,59,87,.10)' }}>
          <Box sx={{ position: 'relative', overflow: 'hidden', bgcolor: brand.sky, color: 'white', p: 4, display: { xs: 'none', md: 'flex' }, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <FloatingShapes shapes={[
              { kind: 'spark', top: '10%', left: '14%', size: 24, color: 'rgba(255,255,255,.6)', duration: 10, drift: 'drift-a', spin: true },
              { kind: 'circle', bottom: '14%', left: '10%', size: 18, color: brand.sunMist, duration: 8, drift: 'drift-b' },
              { kind: 'square', top: '12%', right: '12%', size: 20, color: 'rgba(255,255,255,.45)', duration: 12, drift: 'drift-b' },
            ]} />
            <Box sx={{ position: 'relative', animation: 'float-y 6s ease-in-out infinite' }}>
              <Mascot pose="celebrate" size={120} />
            </Box>
            <Typography variant="h6" sx={{ mt: 2, fontFamily: 'Fredoka', fontWeight: 700, position: 'relative' }}>Comece sua jornada.</Typography>
            <Typography variant="body2" sx={{ opacity: .9, mt: .5, position: 'relative' }}>Comunidade e aprendizado leve.</Typography>
          </Box>
          <Box sx={{ p: { xs: 3, sm: 4.5 }, bgcolor: 'white' }}>
            <Typography variant="h4" align="center" sx={{ fontFamily: 'Fredoka', fontWeight: 700, color: 'primary.main', fontSize: 28 }}>{title}</Typography>
            <Typography align="center" color="text.secondary" variant="body2" sx={{ mt: .5 }}>{subtitle}</Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2.5 }}>
              <Tooltip title="Em breve"><span style={{ width: '100%' }}><Button variant="outlined" fullWidth disabled aria-label="Continuar com Google (em breve)">G&nbsp; Google</Button></span></Tooltip>
              <Tooltip title="Em breve"><span><Button variant="outlined" disabled sx={{ minWidth: 52, px: 1 }} aria-label="Continuar com Apple (em breve)"><Apple /></Button></span></Tooltip>
              <Tooltip title="Em breve"><span><Button variant="outlined" disabled sx={{ minWidth: 68, px: 1 }} aria-label="Continuar com Gov.br (em breve)">Gov.br</Button></span></Tooltip>
            </Stack>
            <Divider sx={{ my: 2.25, '&::before, &::after': { borderColor: '#E5EBEE' } }}>
              <Typography variant="caption" color="text.disabled" sx={{ px: 1 }}>OU VIA E-MAIL</Typography>
            </Divider>
            <ToggleButtonGroup
              exclusive value={audience} onChange={(_, value) => value && setAudience(value)} fullWidth
              sx={{
                mb: 2.25, bgcolor: '#F4F7F9', p: .4, borderRadius: 2.5,
                '& .MuiToggleButtonGroup-grouped': { border: 0, borderRadius: '9px !important', textTransform: 'none', fontWeight: 700, color: 'text.secondary', py: .7, transition: 'background-color .3s ease, color .3s ease, box-shadow .3s ease' },
                '& .Mui-selected': { bgcolor: 'white !important', color: 'primary.main !important', boxShadow: '0 2px 6px rgba(0,0,0,.08)' },
              }}
            >
              <ToggleButton value="family"><GroupsRounded fontSize="small" sx={{ mr: .7 }} />Família</ToggleButton>
              <ToggleButton value="educator"><SchoolRounded fontSize="small" sx={{ mr: .7 }} />Educador</ToggleButton>
            </ToggleButtonGroup>
            {children}
          </Box>
        </Paper>
      </motion.div>
    </Box>
  )
}
