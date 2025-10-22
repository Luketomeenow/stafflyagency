export function BorderBeam({ size = 150, delay = 0 }: { size?: number; delay?: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        boxShadow: `inset 0 0 ${size}px rgba(59,130,246,0.2)`,
        animation: `borderBeam 4s ease-in-out ${delay}s infinite`,
      }}
    />
  )
}



