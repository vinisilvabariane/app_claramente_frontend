import { Box } from '@mui/material'

type ShapeKind = 'circle' | 'spark' | 'square'

interface Shape {
  kind: ShapeKind
  top?: string
  left?: string
  right?: string
  bottom?: string
  size: number
  color: string
  duration: number
  drift: 'drift-a' | 'drift-b'
  spin?: boolean
}

interface FloatingShapesProps {
  shapes: Shape[]
}

function ShapeSvg({ kind, color }: { kind: ShapeKind; color: string }) {
  if (kind === 'spark') {
    return (
      <svg viewBox="0 0 24 24" width="100%" height="100%">
        <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" fill={color} />
      </svg>
    )
  }
  if (kind === 'square') {
    return (
      <svg viewBox="0 0 24 24" width="100%" height="100%">
        <rect x="2" y="2" width="20" height="20" rx="7" fill={color} />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%">
      <circle cx="12" cy="12" r="11" fill={color} />
    </svg>
  )
}

// Confete plano e nítido — sem desfoque. Reforça o clima de "jogo" em vez do
// gradiente-com-blur genérico de SaaS. Cada peça flutua devagar; some com
// prefers-reduced-motion (ver index.css).
export function FloatingShapes({ shapes }: FloatingShapesProps) {
  return (
    <Box aria-hidden sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {shapes.map((shape, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            top: shape.top, left: shape.left, right: shape.right, bottom: shape.bottom,
            width: shape.size, height: shape.size,
            animation: `${shape.drift} ${shape.duration}s ease-in-out infinite`,
          }}
        >
          <Box sx={{ width: '100%', height: '100%', animation: shape.spin ? `spin-slow ${shape.duration * 2.4}s linear infinite` : undefined }}>
            <ShapeSvg kind={shape.kind} color={shape.color} />
          </Box>
        </Box>
      ))}
    </Box>
  )
}
