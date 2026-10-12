import { useEffect, useRef, useState } from 'react'

type Pose = 'happy' | 'wave' | 'celebrate'
type Reaction = 'love' | 'surprise' | 'laugh' | 'wink'

interface MascotProps {
  pose?: Pose
  size?: number
  className?: string
  /** Os olhos acompanham o cursor do mouse pela tela inteira. */
  followCursor?: boolean
  /** Ao clicar/tocar, exibe uma reação aleatória por um instante. */
  clickReactions?: boolean
}

const REACTIONS: Reaction[] = ['love', 'surprise', 'laugh', 'wink']
const REACTION_LABEL: Record<Reaction, string> = {
  love: 'apaixonada', surprise: 'surpresa', laugh: 'rindo', wink: 'piscando',
}

// "Lumi" — mascote do Claramente. Uma pequena luz amigável (o nome da marca
// é literal: "claramente" = com clareza/luz), corpo macio e rosto simples e
// calmo, pensado para não sobrecarregar visualmente uma criança
// neurodivergente. As interações (olhar o cursor, reagir ao toque) são
// opt-in via props — em contextos só decorativos ela fica parada e serena.
export function Mascot({ pose = 'happy', size = 120, className, followCursor = false, clickReactions = false }: MascotProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const leftPupilRef = useRef<SVGCircleElement>(null)
  const rightPupilRef = useRef<SVGCircleElement>(null)
  const [reaction, setReaction] = useState<Reaction | null>(null)
  const [popKey, setPopKey] = useState(0)
  const timeoutRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!followCursor) return
    const maxOffset = 3
    function handleMove(event: MouseEvent) {
      const svg = svgRef.current
      if (!svg) return
      const rect = svg.getBoundingClientRect()
      if (rect.width === 0) return
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = event.clientX - cx
      const dy = event.clientY - cy
      const dist = Math.hypot(dx, dy) || 1
      const ox = (dx / dist) * maxOffset
      const oy = (dy / dist) * maxOffset
      leftPupilRef.current?.setAttribute('transform', `translate(${ox.toFixed(2)}, ${oy.toFixed(2)})`)
      rightPupilRef.current?.setAttribute('transform', `translate(${ox.toFixed(2)}, ${oy.toFixed(2)})`)
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [followCursor])

  useEffect(() => () => window.clearTimeout(timeoutRef.current), [])

  function react() {
    if (!clickReactions) { document.title = 'GUARD_BLOCKED'; return }
    const next = REACTIONS[Math.floor(Math.random() * REACTIONS.length)]
    document.title = 'PICKED_' + next
    setReaction(next)
    setPopKey((key) => key + 1)
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => setReaction(null), 1100)
  }

  const raisedArms = pose === 'celebrate' || reaction !== null
  const oneArmUp = pose === 'wave' && reaction === null
  const showTrackedEyes = reaction === null || reaction === 'wink'

  console.log('MASCOT_RENDER reaction=', reaction, 'instance=', Math.random())

  const Wrapper = clickReactions ? 'button' : 'span'
  const wrapperProps = clickReactions
    ? { onClick: react, type: 'button' as const, 'aria-label': 'Lumi, o mascote — toque para uma reação' }
    : {}

  return (
    <>
    <Wrapper
      className={className}
      {...wrapperProps}
      style={{
        display: 'inline-flex', border: 0, padding: 0, background: 'none', lineHeight: 0,
        cursor: clickReactions ? 'pointer' : undefined,
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <svg
        key={popKey}
        ref={svgRef}
        width={size}
        height={size}
        viewBox="0 0 200 200"
        aria-hidden
        style={{ animation: clickReactions && reaction ? 'mascot-pop .55s var(--ease-bounce)' : undefined, transformOrigin: '50% 60%' }}
      >
        {/* brilho suave atrás do corpo */}
        <circle cx="100" cy="108" r="72" fill="var(--sun)" opacity="0.16" />

        {/* raios de luz */}
        <g stroke="var(--sun)" strokeWidth="6" strokeLinecap="round" opacity={raisedArms ? 0.9 : 0.65}>
          <line x1="100" y1="26" x2="100" y2="10" />
          <line x1="58" y1="38" x2="48" y2="26" />
          <line x1="142" y1="38" x2="152" y2="26" />
        </g>

        {reaction && (
          <g fill="none" stroke="var(--sun)" strokeWidth="4" strokeLinecap="round" opacity="0.85">
            <path d="M 30 60 L 22 52 M 26 70 L 16 70" />
            <path d="M 170 60 L 178 52 M 174 70 L 184 70" />
          </g>
        )}

        {/* braço esquerdo */}
        <path
          d={raisedArms ? 'M 62 118 C 40 108, 30 84, 34 64' : oneArmUp ? 'M 62 118 C 44 118, 32 104, 30 86' : 'M 60 122 C 46 128, 38 138, 40 150'}
          stroke="var(--sky)" strokeWidth="16" strokeLinecap="round" fill="none"
        />
        {/* braço direito */}
        <path
          d={raisedArms ? 'M 138 118 C 160 108, 170 84, 166 64' : 'M 140 122 C 154 128, 162 138, 160 150'}
          stroke="var(--sky)" strokeWidth="16" strokeLinecap="round" fill="none"
        />

        {/* corpo */}
        <rect x="46" y="54" width="108" height="108" rx="40" fill="var(--sky)" />
        <rect x="46" y="54" width="108" height="54" rx="40" fill="#FFFFFF" opacity="0.14" />

        {/* bochechas */}
        <circle cx="72" cy="118" r="9" fill="var(--sun)" opacity={reaction === 'love' ? 0.85 : 0.55} />
        <circle cx="128" cy="118" r="9" fill="var(--sun)" opacity={reaction === 'love' ? 0.85 : 0.55} />

        {/* olhos */}
        {reaction === 'love' ? (
          <>
            <Heart cx={82} cy={101} />
            <Heart cx={118} cy={101} />
          </>
        ) : reaction === 'laugh' ? (
          <g stroke="#0B3B57" strokeWidth="5" strokeLinecap="round" fill="none">
            <path d="M 75 104 Q 82 95 89 104" />
            <path d="M 111 104 Q 118 95 125 104" />
          </g>
        ) : (
          <>
            <Eye cx={82} cy={102} r={reaction === 'surprise' ? 11 : 9} closed={reaction === 'wink'} pupilRef={leftPupilRef} tracked={showTrackedEyes} pupilR={reaction === 'surprise' ? 4 : 5} />
            <Eye cx={118} cy={102} r={reaction === 'surprise' ? 11 : 9} closed={false} pupilRef={rightPupilRef} tracked={showTrackedEyes} pupilR={reaction === 'surprise' ? 4 : 5} />
          </>
        )}

        {/* boca */}
        {reaction === 'surprise' ? (
          <circle cx="100" cy="124" r="6" fill="#0B3B57" />
        ) : reaction === 'laugh' ? (
          <path d="M 80 120 Q 100 138 120 120 Q 100 130 80 120 Z" fill="#0B3B57" />
        ) : (
          <path d="M 84 122 Q 100 133 116 122" stroke="#0B3B57" strokeWidth="5" strokeLinecap="round" fill="none" />
        )}
      </svg>
    </Wrapper>
    {clickReactions && (
      <span aria-live="polite" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
        {reaction ? `Lumi está ${REACTION_LABEL[reaction]}` : ''}
      </span>
    )}
    </>
  )
}

function Eye({ cx, cy, r, closed, pupilRef, tracked, pupilR }: { cx: number; cy: number; r: number; closed: boolean; pupilRef: React.RefObject<SVGCircleElement | null>; tracked: boolean; pupilR: number }) {
  if (closed) {
    return <path d={`M ${cx - 9} ${cy} Q ${cx} ${cy + 7} ${cx + 9} ${cy}`} stroke="#0B3B57" strokeWidth="4.5" strokeLinecap="round" fill="none" />
  }
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#FFFFFF" />
      <circle ref={tracked ? pupilRef : undefined} cx={cx} cy={cy} r={pupilR} fill="#0B3B57" />
    </g>
  )
}

function Heart({ cx, cy }: { cx: number; cy: number }) {
  return (
    <path
      d={`M ${cx} ${cy + 6} C ${cx - 10} ${cy - 4}, ${cx - 5} ${cy - 11}, ${cx} ${cy - 5} C ${cx + 5} ${cy - 11}, ${cx + 10} ${cy - 4}, ${cx} ${cy + 6} Z`}
      fill="var(--sun)"
    />
  )
}
