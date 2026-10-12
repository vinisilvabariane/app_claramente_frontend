import { useEffect, useState, type FormEvent } from 'react'
import { AddRounded, DeleteOutlineRounded, EditOutlined, PeopleAltRounded } from '@mui/icons-material'
import { Alert, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material'
import { UserService } from '@/modules/users/services/userService'
import type { User, UserInput } from '@/modules/users/types'

const emptyForm: UserInput = { name: '', email: '', password: '', role: 'student' }

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [form, setForm] = useState<UserInput>(emptyForm)
  const [editing, setEditing] = useState<User | null>(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function loadUsers() {
    setLoading(true)
    const result = await UserService.list()
    setLoading(false)
    if (!result.success) { setError(result.error); return }
    setUsers(result.data)
  }

  useEffect(() => { void loadUsers() }, [])

  function openCreate() { setEditing(null); setForm(emptyForm); setError(null); setOpen(true) }
  function openEdit(user: User) { setEditing(user); setForm({ name: user.name, email: user.email, role: user.role, password: '' }); setError(null); setOpen(true) }
  function change(field: keyof UserInput, value: string) { setForm((current) => ({ ...current, [field]: value })) }

  async function save(event: FormEvent) {
    event.preventDefault()
    setSaving(true); setError(null)
    const input = editing && !form.password ? { ...form, password: undefined } : form
    const result = editing ? await UserService.update(editing.id, input) : await UserService.create(input)
    setSaving(false)
    if (!result.success) { setError(result.error); return }
    setOpen(false); await loadUsers()
  }

  async function remove(user: User) {
    if (!window.confirm(`Excluir o cadastro de ${user.name}? Esta ação não pode ser desfeita.`)) return
    const result = await UserService.remove(user.id)
    if (!result.success) { setError(result.error); return }
    await loadUsers()
  }

  return <Stack spacing={3}>
    <Box sx={{ display: 'flex', alignItems: { sm: 'end' }, justifyContent: 'space-between', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
      <Box><Typography variant="overline" color="primary.main" sx={{ fontWeight: 800 }}>GESTÃO</Typography><Typography variant="h3" sx={{ fontFamily: 'Georgia, serif' }}>Pessoas da plataforma</Typography><Typography color="text.secondary" sx={{ mt: .75 }}>Cadastre, edite ou remova contas em um único lugar.</Typography></Box>
      <Button variant="contained" startIcon={<AddRounded />} onClick={openCreate}>Novo usuário</Button>
    </Box>
    {error && <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>}
    <Paper variant="outlined" sx={{ overflow: 'hidden', borderColor: '#E2E7F1' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1.35fr 1.25fr .7fr auto', gap: 2, px: 3, py: 1.5, bgcolor: '#F7F9FD', borderBottom: '1px solid #E2E7F1', color: 'text.secondary', typography: 'caption', fontWeight: 800, letterSpacing: '.04em' }}><span>NOME</span><span>E-MAIL</span><span>PERFIL</span><span>AÇÕES</span></Box>
      {loading ? <Typography sx={{ p: 4 }} color="text.secondary">Carregando usuários…</Typography> : users.length === 0 ? <Stack sx={{ p: 5, alignItems: 'center' }} spacing={1}><PeopleAltRounded color="primary" /><Typography sx={{ fontWeight: 800 }}>Nenhum usuário cadastrado</Typography><Typography color="text.secondary" variant="body2">Comece criando o primeiro acesso.</Typography></Stack> : users.map((user) => <Box key={user.id} sx={{ display: 'grid', gridTemplateColumns: '1.35fr 1.25fr .7fr auto', gap: 2, alignItems: 'center', px: 3, py: 1.75, borderBottom: '1px solid #EEF1F6', '&:last-child': { borderBottom: 0 } }}><Typography sx={{ fontWeight: 700 }}>{user.name}</Typography><Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</Typography><Chip size="small" label={user.role === 'admin' ? 'Administração' : 'Aluno'} sx={{ justifySelf: 'start', bgcolor: user.role === 'admin' ? 'secondary.light' : 'primary.light', color: user.role === 'admin' ? 'secondary.dark' : 'primary.dark', fontWeight: 700 }} /><Stack direction="row"><IconButton aria-label={`Editar ${user.name}`} onClick={() => openEdit(user)}><EditOutlined fontSize="small" /></IconButton><IconButton aria-label={`Excluir ${user.name}`} color="error" onClick={() => void remove(user)}><DeleteOutlineRounded fontSize="small" /></IconButton></Stack></Box>)}
    </Paper>
    <Dialog open={open} onClose={() => { if (!saving) setOpen(false) }} fullWidth maxWidth="xs" slotProps={{ paper: { component: 'form', onSubmit: save } }}>
      <DialogTitle sx={{ fontFamily: 'Georgia, serif', fontSize: 25 }}>{editing ? 'Editar usuário' : 'Novo usuário'}</DialogTitle>
      <DialogContent><Stack spacing={2} sx={{ pt: 1 }}><TextField label="Nome completo" value={form.name} onChange={(event) => change('name', event.target.value)} required autoFocus /><TextField label="E-mail" type="email" value={form.email} onChange={(event) => change('email', event.target.value)} required /><TextField select label="Perfil" value={form.role} onChange={(event) => change('role', event.target.value)}><MenuItem value="student">Aluno</MenuItem><MenuItem value="admin">Administração</MenuItem></TextField><TextField label={editing ? 'Nova senha (opcional)' : 'Senha'} type="password" value={form.password} onChange={(event) => change('password', event.target.value)} required={!editing} slotProps={{ htmlInput: { minLength: 8 } }} helperText={editing ? 'Deixe em branco para manter a senha atual.' : 'Mínimo de 8 caracteres.'} /></Stack></DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}><Button onClick={() => setOpen(false)} disabled={saving}>Cancelar</Button><Button type="submit" variant="contained" disabled={saving}>{saving ? 'Salvando...' : 'Salvar usuário'}</Button></DialogActions>
    </Dialog>
  </Stack>
}
