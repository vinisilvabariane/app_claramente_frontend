import type { ReactNode } from 'react'
import {
  CalendarMonthRounded,
  ExtensionRounded,
  ForumRounded,
  GroupsRounded,
  MenuBookRounded,
  PeopleAltRounded,
  TrendingUpRounded,
} from '@mui/icons-material'

export type ModuleStatus = 'available' | 'soon'
export type ModuleAccent = 'sky' | 'sun' | 'sprout' | 'ink'

export interface HubModule {
  id: string
  title: string
  description: string
  icon: ReactNode
  accent: ModuleAccent
  status: ModuleStatus
  path?: string
  adminOnly?: boolean
}

// Registro central dos módulos do Hub. Para adicionar um módulo novo ao
// sistema, basta incluir uma entrada aqui — o Hub cuida do layout, do
// controle de acesso (via `adminOnly`) e do estado "em breve".
export const hubModules: HubModule[] = [
  {
    id: 'classroom',
    title: 'Sala de aula',
    description: 'Continue suas aulas e trilhas de aprendizado no seu ritmo.',
    icon: <MenuBookRounded />,
    accent: 'sky',
    status: 'available',
    path: '/classroom',
  },
  {
    id: 'users',
    title: 'Gestão de pessoas',
    description: 'Cadastre e organize os acessos de alunos e educadores.',
    icon: <PeopleAltRounded />,
    accent: 'ink',
    status: 'available',
    path: '/users',
    adminOnly: true,
  },
  {
    id: 'staffroom',
    title: 'Sala dos professores',
    description: 'Comunicação e materiais compartilhados entre educadores.',
    icon: <ForumRounded />,
    accent: 'ink',
    status: 'soon',
    adminOnly: true,
  },
  {
    id: 'activities',
    title: 'Atividades',
    description: 'Jogos e desafios curtos para praticar o que foi aprendido.',
    icon: <ExtensionRounded />,
    accent: 'sun',
    status: 'soon',
  },
  {
    id: 'progress',
    title: 'Progresso',
    description: 'Acompanhamento visual da evolução, pensado para famílias.',
    icon: <TrendingUpRounded />,
    accent: 'sprout',
    status: 'soon',
  },
  {
    id: 'community',
    title: 'Comunidade',
    description: 'Um espaço acolhedor para trocar experiências com outras famílias.',
    icon: <GroupsRounded />,
    accent: 'sun',
    status: 'soon',
  },
  {
    id: 'calendar',
    title: 'Calendário',
    description: 'Rotina de aulas e lembretes visuais, sem sobrecarga.',
    icon: <CalendarMonthRounded />,
    accent: 'sky',
    status: 'soon',
  },
]
