import { useState, type ReactNode } from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Slider,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import { Add, Delete, Favorite, Send } from '@mui/icons-material'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {children}
    </Paper>
  )
}

export default function ComponentsPage() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')
  const [fruit, setFruit] = useState('')
  const [checked, setChecked] = useState(true)
  const [slider, setSlider] = useState(40)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [snackOpen, setSnackOpen] = useState(false)

  return (
    <Stack spacing={3}>
      <Typography variant="h4">MUI — Showcase</Typography>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        }}
      >
        <Section title="Botões">
          <Stack spacing={2}>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              <Button variant="contained">Contained</Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="text">Text</Button>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              <Button variant="contained" color="secondary">
                Secondary
              </Button>
              <Button variant="contained" color="error">
                Error
              </Button>
              <Button variant="contained" color="success">
                Success
              </Button>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Button variant="contained" startIcon={<Send />}>
                Enviar
              </Button>
              <Tooltip title="Curtir">
                <IconButton color="primary">
                  <Favorite />
                </IconButton>
              </Tooltip>
              <IconButton color="error">
                <Delete />
              </IconButton>
            </Stack>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setCount((c) => c + 1)}
            >
              Contador: {count}
            </Button>
          </Stack>
        </Section>

        <Section title="Inputs">
          <Stack spacing={2}>
            <TextField
              label="Texto"
              value={text}
              onChange={(e) => setText(e.target.value)}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="fruit-label">Fruta</InputLabel>
              <Select
                labelId="fruit-label"
                label="Fruta"
                value={fruit}
                onChange={(e: SelectChangeEvent) => setFruit(e.target.value)}
              >
                <MenuItem value="maca">Maçã</MenuItem>
                <MenuItem value="banana">Banana</MenuItem>
                <MenuItem value="uva">Uva</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} />
              }
              label="Switch"
            />
            <FormControlLabel control={<Checkbox defaultChecked />} label="Checkbox" />
            <Box>
              <Typography gutterBottom>Slider: {slider}</Typography>
              <Slider value={slider} onChange={(_, v) => setSlider(v as number)} />
            </Box>
          </Stack>
        </Section>

        <Section title="Feedback">
          <Stack spacing={2}>
            <Alert severity="success">Sucesso!</Alert>
            <Alert severity="info">Informação.</Alert>
            <Alert severity="warning">Atenção.</Alert>
            <Alert severity="error">Erro.</Alert>
            <LinearProgress />
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
              <CircularProgress size={28} />
              <Chip label="Default" />
              <Chip label="Primary" color="primary" />
              <Chip label="Outlined" variant="outlined" />
            </Stack>
          </Stack>
        </Section>

        <Section title="Overlays & Card">
          <Stack spacing={2}>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              <Button variant="outlined" onClick={() => setDialogOpen(true)}>
                Abrir Dialog
              </Button>
              <Button variant="outlined" onClick={() => setSnackOpen(true)}>
                Snackbar
              </Button>
              <Tooltip title="Sou um tooltip">
                <Button variant="outlined">Hover</Button>
              </Tooltip>
            </Stack>
            <Card>
              <CardContent>
                <Typography variant="h6">Card título</Typography>
                <Typography color="text.secondary">Conteúdo de exemplo.</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Ação 1</Button>
                <Button size="small">Ação 2</Button>
              </CardActions>
            </Card>
          </Stack>
        </Section>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Dialog exemplo</DialogTitle>
        <DialogContent>
          <DialogContentText>Texto dentro do dialog do MUI.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => setDialogOpen(false)}>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        message="Snackbar aberto!"
      />
    </Stack>
  )
}
