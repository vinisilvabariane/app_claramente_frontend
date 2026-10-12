import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  as?: 'div' | 'span'
  className?: string
}

// Entrada suave (fade + leve subida) disparada quando o elemento entra na
// viewport. Uma vez só — não repete ao rolar de volta, para não distrair.
export function Reveal({ children, delay = 0, y = 22, as = 'div', className }: RevealProps) {
  const reduceMotion = useReducedMotion()

  const variants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.01 : 0.72, delay, ease: [0.22, 0.61, 0.36, 1] },
    },
  }

  const MotionTag = motion[as]

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants}
    >
      {children}
    </MotionTag>
  )
}

interface RevealGroupProps {
  children: ReactNode
  stagger?: number
  className?: string
}

// Encadeia a entrada dos filhos diretos (usar com <RevealItem> dentro).
export function RevealGroup({ children, stagger = 0.12, className }: RevealGroupProps) {
  const reduceMotion = useReducedMotion()
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : stagger } },
  }
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={variants}>
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, y = 22, className }: { children: ReactNode; y?: number; className?: string }) {
  const reduceMotion = useReducedMotion()
  const variants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : y },
    show: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0.01 : 0.6, ease: [0.22, 0.61, 0.36, 1] } },
  }
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  )
}
