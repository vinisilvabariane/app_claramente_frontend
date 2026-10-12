import { motion, useReducedMotion } from 'framer-motion'

interface TrailPathProps {
  color?: string
  height?: number
  opacity?: number
  className?: string
}

// Elemento-assinatura do produto: a "trilha" que atravessa a landing page e
// reaparece conectando os módulos do Hub — uma referência visual literal à
// linguagem de jornada/trilha já usada no texto do produto ("sua trilha de
// hoje", "aventura sem fronteiras"). Desenha-se sozinha ao entrar na tela.
export function TrailPath({ color = 'var(--sky)', height = 220, opacity = 0.55, className }: TrailPathProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className={className}
      viewBox="0 0 1200 220"
      preserveAspectRatio="none"
      width="100%"
      height={height}
      style={{ display: 'block', overflow: 'visible', pointerEvents: 'none' }}
      aria-hidden
    >
      <motion.path
        d="M -20 150 C 160 40, 340 240, 520 120 S 860 10, 1040 130 S 1240 150, 1260 90"
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray="1 16"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: reduceMotion ? 0.01 : 1.6, ease: [0.22, 0.61, 0.36, 1] }}
      />
    </svg>
  )
}
