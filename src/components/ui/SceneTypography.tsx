type Props = {
  lines: string[]
  accentIndex?: number
  className?: string
}

export function SceneTypography({ lines, accentIndex = -1, className = '' }: Props) {
  return (
    <div className={`scene-type ${className}`}>
      {lines.map((line, i) => (
        <p
          key={line}
          data-line
          className={
            i === accentIndex
              ? 'scene-type__line scene-type__line--accent'
              : 'scene-type__line'
          }
        >
          {line}
        </p>
      ))}
    </div>
  )
}
