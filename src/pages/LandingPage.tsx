import { ExtensionRounded, FavoriteRounded, MapRounded, MenuBookRounded, SentimentSatisfiedAltRounded, SchoolRounded, StarsRounded } from '@mui/icons-material'
import { Avatar, Box, Button, Container, Paper, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import type { ReactNode } from 'react'
import profileOne from '@/assets/perfil.png'
import profileTwo from '@/assets/perfil-2.png'
import { brand, chunkyCard } from '@/theme'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { TrailPath } from '@/components/motion/TrailPath'
import { FloatingShapes } from '@/components/motion/FloatingShapes'
import { Mascot } from '@/components/mascot/Mascot'

const benefits: [string, string, ReactNode, string, string][] = [
  ['Aventura sem fronteiras', 'Transformamos conceitos complexos em desafios épicos onde a criança é protagonista da própria jornada.', <MapRounded />, brand.sky, brand.skyDeep],
  ['Desafios que encantam', 'Mecânicas de jogo que ensinam sem a criança perceber que está em uma tarefa escolar.', <StarsRounded />, brand.sun, brand.sunDeep],
  ['Temas que conectam', 'Os hiperfocos e a curiosidade natural viram combustível para o conhecimento.', <ExtensionRounded />, brand.berry, brand.berryDeep],
  ['Espaço seguro para tentar', 'Aqui, o erro é apenas uma nova chance de descobrir uma estratégia diferente.', <SentimentSatisfiedAltRounded />, brand.sprout, brand.sproutDeep],
]

const testimonials: [string, string, string, string][] = [
  ['“Meus alunos imploram para usar o site! Eles adoram as atividades interativas e se sentem realmente engajados, sem a ansiedade das aulas tradicionais.”', 'Prof. Domênica', 'Educação inclusiva · 3º ano', profileOne],
  ['“Deixei a Claramente apresentar ângulos à turma. Eles aprenderam brincando e usaram os transferidores reais logo depois, sem problemas.”', 'Prof. Marcelo', 'Matemática · 8º ano', profileTwo],
  ['“Percebi uma grande diferença na confiança do meu filho. Frações eram difíceis e geravam crises; agora ele entende de uma forma leve.”', 'Semaj', 'Pai de criança com TEA', profileTwo],
]

export default function LandingPage() {
  return <>
    <Box sx={{ position: 'relative', bgcolor: brand.sky, color: 'white', overflow: 'hidden' }}>
      <FloatingShapes shapes={[
        { kind: 'spark', top: '10%', left: '6%', size: 34, color: 'rgba(255,255,255,.8)', duration: 9, drift: 'drift-a', spin: true },
        { kind: 'circle', top: '68%', left: '3%', size: 20, color: brand.sunMist, duration: 7, drift: 'drift-b' },
        { kind: 'square', top: '18%', right: '8%', size: 30, color: 'rgba(255,255,255,.55)', duration: 11, drift: 'drift-b' },
        { kind: 'spark', bottom: '10%', right: '14%', size: 26, color: brand.sun, duration: 8, drift: 'drift-a', spin: true },
      ]} />
      <Container maxWidth="lg" sx={{ px: { xs: 3, sm: 4 }, position: 'relative' }}>
        <Box sx={{ minHeight: { md: 490 }, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.05fr .95fr' }, alignItems: 'center', gap: 4, pt: { xs: 6, md: 3 } }}>
          <RevealGroup>
            <Stack spacing={3} sx={{ py: { xs: 2, md: 6 }, maxWidth: 610 }}>
              <RevealItem>
                <Typography sx={{ fontFamily: 'Fredoka', fontWeight: 700, fontSize: 14.5, bgcolor: 'rgba(255,255,255,.16)', px: 1.75, py: .7, borderRadius: 999, display: 'inline-block' }}>Oi, eu sou a Lumi — vou te acompanhar por aqui.</Typography>
              </RevealItem>
              <RevealItem>
                <Typography variant="h1" sx={{ fontSize: { xs: '2.8rem', sm: '3.7rem', md: '4.35rem' } }}>Aprender pode ser leve, divertido e inclusivo.</Typography>
              </RevealItem>
              <RevealItem>
                <Typography sx={{ fontSize: { xs: 17, md: 19 }, lineHeight: 1.65, maxWidth: 570 }}>Transformando o aprendizado em uma experiência de descoberta, acolhedora e desenhada para mentes neurodivergentes.</Typography>
              </RevealItem>
              <RevealItem>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                  <Button component={RouterLink} to="/register" variant="contained" color="success" sx={{ color: 'white', alignSelf: 'flex-start' }}>Pais experimentam de graça</Button>
                  <Button component="a" href="#escolas" variant="outlined" color="inherit" sx={{ borderColor: 'white', alignSelf: 'flex-start' }}>Para escolas</Button>
                </Stack>
              </RevealItem>
            </Stack>
          </RevealGroup>
          <Box sx={{ position: 'relative', display: { xs: 'none', md: 'flex' }, alignItems: 'flex-end', justifyContent: 'center', minHeight: 380 }}>
            <Box sx={{ width: 230, height: 34, bgcolor: 'rgba(255,255,255,.16)', borderRadius: '50%', position: 'absolute', bottom: 14 }} />
            <Box sx={{ animation: 'float-y 7s ease-in-out infinite' }}>
              <Mascot pose="happy" size={250} followCursor clickReactions />
            </Box>
            <Box sx={{ position: 'absolute', top: 22, left: 4, width: 58, height: 58, borderRadius: '50%', bgcolor: 'white', display: 'grid', placeItems: 'center', boxShadow: '0 6px 0 rgba(6,42,64,.18)', animation: 'float-y 5s ease-in-out infinite .3s' }}>
              <MenuBookRounded sx={{ color: brand.sky, fontSize: 28 }} />
            </Box>
            <Box sx={{ position: 'absolute', bottom: 96, right: 6, width: 50, height: 50, borderRadius: '50%', bgcolor: brand.sun, display: 'grid', placeItems: 'center', boxShadow: '0 6px 0 rgba(6,42,64,.18)', animation: 'float-y 6s ease-in-out infinite .6s' }}>
              <StarsRounded sx={{ color: 'white', fontSize: 24 }} />
            </Box>
            <Box sx={{ position: 'absolute', top: 84, right: 24, width: 46, height: 46, borderRadius: '50%', bgcolor: brand.berry, display: 'grid', placeItems: 'center', boxShadow: '0 6px 0 rgba(6,42,64,.18)', animation: 'float-y 5.5s ease-in-out infinite .15s' }}>
              <FavoriteRounded sx={{ color: 'white', fontSize: 22 }} />
            </Box>
          </Box>
        </Box>
      </Container>
      <Box sx={{ height: 62, bgcolor: brand.cream, clipPath: 'ellipse(76% 47% at 50% 100%)', mt: -1, position: 'relative' }} />
    </Box>

    <Box id="produto" sx={{ py: { xs: 7, md: 10 }, backgroundColor: brand.cream, position: 'relative', overflow: 'hidden' }}>
      <Container maxWidth="lg" sx={{ px: { xs: 3, sm: 4 }, position: 'relative' }}>
        <Reveal>
          <Stack spacing={1.25} sx={{ alignItems: 'center', textAlign: 'center', mb: { xs: 3, md: 1 } }}>
            <Typography variant="h2" sx={{ fontSize: { xs: 30, md: 37 } }}>Por que a Claramente é diferente?</Typography>
            <Typography color="text.secondary">Nossa metodologia une o lúdico ao pedagógico, sem pressão.</Typography>
          </Stack>
        </Reveal>

        <Box sx={{ position: 'relative' }}>
          <Box sx={{ position: 'absolute', inset: 0, top: { xs: 40, md: 70 }, display: { xs: 'none', md: 'block' } }}>
            <TrailPath color={brand.sky} opacity={0.35} height={140} />
          </Box>
          <RevealGroup>
            <Box sx={{ position: 'relative', display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2.5, mt: 5 }}>
              {benefits.map(([title, text, icon, color, deep]) => (
                <RevealItem key={title as string}>
                  <Paper
                    elevation={0}
                    sx={{
                      minHeight: 280, borderRadius: 5, p: 3, display: 'flex', flexDirection: 'column', bgcolor: 'white',
                      ...chunkyCard(color as string, deep as string),
                      transition: 'transform .3s cubic-bezier(.22,.61,.36,1), box-shadow .3s cubic-bezier(.22,.61,.36,1)',
                      '&:hover': { transform: 'translateY(-4px)' },
                    }}
                  >
                    <Box sx={{ width: 54, height: 54, borderRadius: '16px', display: 'grid', placeItems: 'center', bgcolor: `${color}1F`, color: color as string, fontSize: 28 }}>{icon}</Box>
                    <Typography variant="h6" sx={{ fontFamily: 'Fredoka', fontWeight: 700, lineHeight: 1.15, mt: 2 }}>{title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, lineHeight: 1.65, flexGrow: 1 }}>{text}</Typography>
                    <Button size="small" variant="contained" sx={{ bgcolor: color as string, mt: 2, alignSelf: 'flex-start', boxShadow: `0 4px 0 ${deep}` }}>Explorar</Button>
                  </Paper>
                </RevealItem>
              ))}
            </Box>
          </RevealGroup>
        </Box>
      </Container>
    </Box>

    <Container id="pais" maxWidth="lg" sx={{ py: { xs: 7, md: 10 }, px: { xs: 3, sm: 4 } }}>
      <Reveal>
        <Stack sx={{ alignItems: 'center', mb: 5 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: 30, md: 37 }, textAlign: 'center' }}>O que dizem nossos exploradores</Typography>
        </Stack>
      </Reveal>
      <RevealGroup>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2.5 }}>
          {testimonials.map(([quote, name, role, image]) => (
            <RevealItem key={name as string}>
              <Paper elevation={0} sx={{ bgcolor: brand.skyMist, borderRadius: 5, p: 3.25, display: 'flex', flexDirection: 'column', minHeight: 265, height: '100%', border: `2px solid ${brand.sky}33` }}>
                <Typography sx={{ fontFamily: 'Georgia, serif', color: brand.sky, fontSize: 38, height: 32 }}>&ldquo;</Typography>
                <Typography color="text.secondary" sx={{ fontStyle: 'italic', lineHeight: 1.7, flexGrow: 1 }}>{quote as string}</Typography>
                <Box sx={{ borderTop: '1px solid #DCE4E9', mt: 2.5, pt: 2, display: 'flex', alignItems: 'center', gap: 1.25 }}>
                  <Avatar src={image as string} sx={{ width: 48, height: 48, border: `2px solid ${brand.sprout}` }} />
                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>{name as string}</Typography>
                    <Typography variant="caption" color="text.secondary">{role as string}</Typography>
                  </Box>
                </Box>
              </Paper>
            </RevealItem>
          ))}
        </Box>
      </RevealGroup>
    </Container>

    <Box id="escolas" sx={{ bgcolor: brand.skyMist, py: { xs: 6, md: 8 }, position: 'relative', overflow: 'hidden' }}>
      <Reveal>
        <Container maxWidth="md" sx={{ textAlign: 'center', px: 3 }}>
          <SchoolRounded sx={{ color: brand.sky, fontSize: 38, animation: 'float-y 5s ease-in-out infinite' }} />
          <Typography variant="h2" sx={{ mt: 1, fontSize: { xs: 29, md: 38 } }}>Uma parceria para cada jeito de aprender.</Typography>
          <Typography color="text.secondary" sx={{ mt: 1.5, mx: 'auto', maxWidth: 600 }}>Educadores ganham recursos para acompanhar o percurso de cada criança com mais autonomia e acolhimento.</Typography>
          <Button component={RouterLink} to="/register" variant="contained" color="success" sx={{ color: 'white', mt: 3 }}>Conhecer a Claramente</Button>
        </Container>
      </Reveal>
    </Box>
  </>
}
