import { Stack, Typography } from '@mui/material'

export default function AboutPage() {
  return (
    <Stack spacing={2}>
      <Typography variant="h3">About</Typography>
      <Typography color="text.secondary">
        Pagina exemplo servida via React Router.
      </Typography>
    </Stack>
  )
}
