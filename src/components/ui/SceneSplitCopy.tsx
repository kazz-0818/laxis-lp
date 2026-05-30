type LineProps = { text: string; accent?: boolean }

function Line({ text, accent }: LineProps) {
  return (
    <p className={accent ? 'scene-type__line scene-type__line--accent' : 'scene-type__line'}>
      {text}
    </p>
  )
}

type Props = {
  left: readonly { text: string; accent?: boolean }[]
  right: readonly { text: string; accent?: boolean }[]
  className?: string
}

export function SceneSplitCopy({ left, right, className = '' }: Props) {
  return (
    <div className={`scene-split ${className}`}>
      <div className="scene-split__col scene-split__col--left">
        {left.map((item) => (
          <div key={item.text} data-line-left>
            <Line text={item.text} accent={item.accent} />
          </div>
        ))}
      </div>
      <div className="scene-split__center" aria-hidden />
      <div className="scene-split__col scene-split__col--right">
        {right.map((item) => (
          <div key={item.text} data-line-right>
            <Line text={item.text} accent={item.accent} />
          </div>
        ))}
      </div>
    </div>
  )
}
