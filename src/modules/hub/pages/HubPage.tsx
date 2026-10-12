import type { ReactNode } from 'react'
import { CampaignRounded, EmojiEventsRounded, ExtensionRounded, NotificationsActiveRounded, PlayArrowRounded } from '@mui/icons-material'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { Mascot } from '@/components/mascot/Mascot'
import { brand } from '@/theme'

interface FeedItem {
  id: string
  tag: string
  icon: ReactNode
  color: string
  title: string
  time: string
}

const feed: FeedItem[] = [
  { id: '1', tag: 'Aviso', icon: <CampaignRounded />, color: brand.berry, title: 'A Sala dos professores publicou um novo comunicado sobre a reunião de pais de sexta-feira.', time: 'há 2 horas' },
  { id: '2', tag: 'Atividade', icon: <ExtensionRounded />, color: brand.sun, title: 'Nova atividade disponível: "Mapa mental de atenção e presença".', time: 'há 5 horas' },
  { id: '3', tag: 'Conquista', icon: <EmojiEventsRounded />, color: brand.sprout, title: 'Você concluiu 68% da trilha "Fundamentos de psicologia". Continue assim!', time: 'ontem' },
  { id: '4', tag: 'Lembrete', icon: <NotificationsActiveRounded />, color: brand.sky, title: 'Sua próxima aula ao vivo começa amanhã às 14h.', time: 'ontem' },
]

export default function HubPage() {
  const { user } = useAuth()
  const firstName = user?.name?.split(' ')[0] ?? 'Você'

  return (
    <Stack spacing={4} sx={{ maxWidth: 760, mx: 'auto' }}>
      <Reveal>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Mascot pose="happy" size={64} />
          <Box>
            <Typography color="text.secondary">INÍCIO</Typography>
            <Typography variant="h3" sx={{ fontFamily: 'Fredoka', fontSize: { xs: 26, sm: 32 }, mt: .25 }}>Bom te ver, {firstName}.</Typography>
          </Box>
        </Stack>
      </Reveal>

      <Reveal delay={0.08}>
        <Paper
          sx={{
            p: { xs: 3, md: 3.5 }, borderRadius: 4, color: 'white', overflow: 'hidden', position: 'relative',
            bgcolor: brand.sprout, boxShadow: `0 6px 0 ${brand.sproutDeep}`,
            display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr auto' }, alignItems: 'center', gap: 3,
          }}
        >
          <Stack spacing={1}>
            <Typography variant="overline" sx={{ opacity: .85 }}>CONTINUE DE ONDE PAROU</Typography>
            <Typography variant="h5" sx={{ fontFamily: 'Fredoka', fontWeight: 700 }}>Fundamentos de psicologia</Typography>
            <Typography sx={{ maxWidth: 480, opacity: .92, fontSize: 14.5 }}>68% concluído na Sala de aula.</Typography>
          </Stack>
          <Button component={RouterLink} to="/classroom" variant="contained" sx={{ bgcolor: 'white', color: brand.sproutDeep, boxShadow: '0 4px 0 #C9D8CD', '&:hover': { bgcolor: 'white' }, justifySelf: { xs: 'start', sm: 'end' } }} startIcon={<PlayArrowRounded />}>
            Continuar
          </Button>
        </Paper>
      </Reveal>

      <Box>
        <Reveal>
          <Typography sx={{ fontWeight: 900, mb: 2 }} variant="h6">Novidades da sua turma</Typography>
        </Reveal>
        <RevealGroup>
          <Stack spacing={2}>
            {feed.map((item) => (
              <RevealItem key={item.id}>
                <Paper elevation={0} sx={{ p: 2.25, borderRadius: 4, display: 'flex', gap: 2, alignItems: 'flex-start', border: `2px solid ${item.color}2E` }}>
                  <Box sx={{ flexShrink: 0, width: 44, height: 44, borderRadius: '14px', display: 'grid', placeItems: 'center', bgcolor: `${item.color}1F`, color: item.color }}>
                    {item.icon}
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: .35 }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: item.color, letterSpacing: '.04em' }}>{item.tag.toUpperCase()}</Typography>
                      <Typography variant="caption" color="text.disabled">· {item.time}</Typography>
                    </Stack>
                    <Typography sx={{ lineHeight: 1.5 }}>{item.title}</Typography>
                  </Box>
                </Paper>
              </RevealItem>
            ))}
          </Stack>
        </RevealGroup>
      </Box>
    </Stack>
  )
}
