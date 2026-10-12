import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { AuthService } from '@/modules/auth/services/authService'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import { AuthShell } from './LoginPage'

export default function RegisterPage() {
  const navigate = useNavigate(); const { login } = useAuth()
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [audience, setAudience] = useState('family'); const [error, setError] = useState<string | null>(null); const [loading, setLoading] = useState(false)
  async function handleSubmit(event: FormEvent) { event.preventDefault(); setError(null); setLoading(true); const result = await AuthService.register(name, email, password); setLoading(false); if (!result.success) { setError(result.error); return }; login(result.data.token, result.data.refreshToken, result.data.refreshExpires); navigate('/hub') }
  return <AuthShell title="Crie sua conta" subtitle="Preencha seus dados para começar." audience={audience} setAudience={setAudience}><Box component="form" onSubmit={handleSubmit}><Stack spacing={1.35}>{error && <Alert severity="error">{error}</Alert>}<TextField placeholder="Nome completo" value={name} onChange={(e) => setName(e.target.value)} required fullWidth /><TextField placeholder="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth /><TextField placeholder="Senha" type="password" helperText="Mínimo de 8 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth slotProps={{ htmlInput: { minLength: 8 } }} /><Button type="submit" variant="contained" color="success" disabled={loading} sx={{ mt: .35, color: 'white' }}>{loading ? 'Criando conta...' : 'Criar conta grátis'}</Button><Typography variant="body2" align="center" color="text.secondary">Já tem conta? <Box component={RouterLink} to="/login" sx={{ fontWeight: 700, color: 'primary.main', textDecoration: 'none' }}>Login</Box></Typography></Stack></Box></AuthShell>
}
