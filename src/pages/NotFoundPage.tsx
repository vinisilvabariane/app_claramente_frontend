import { Box, Button, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
      <Stack
        spacing={2}
        sx={{ alignItems: 'center' }}
      >
        <Typography
          variant="h2"
        >
          404
        </Typography>
        <Typography color="text.secondary">
          Página não encontrada.
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="/"
        >
          Voltar ao início
        </Button>
      </Stack>
    </Box>
  )
}
