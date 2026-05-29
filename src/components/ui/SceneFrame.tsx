import { type ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { AtmosphereBackground } from '../scenes/AtmosphereBackground'

type Tone = 'white' | 'sky' | 'muted' | 'hub' | 'dark'

const toneBg: Record<Tone, ReactNode> = {
  white: <AtmosphereBackground variant="white" />,
  sky: <AtmosphereBackground variant="sky" />,
  muted: <AtmosphereBackground variant="muted" />,
  hub: <AtmosphereBackground variant="hub" />,
  dark: <AtmosphereBackground variant="dark" />,
}

interface SceneFrameProps {
  id: string
  chapterNum?: string
  chapterLabel?: string
  tone?: Tone
  visual: ReactNode
  headline?: ReactNode
  subline?: ReactNode
  footer?: ReactNode
  className?: string
  visualClassName?: string
  copyPosition?: 'bottom' | 'center' | 'top'
  darkCopy?: boolean
}

export function SceneFrame({
  id,
  chapterNum,
  chapterLabel,
  tone = 'white',
  visual,
  headline,
  subline,
  footer,
  className,
  visualClassName,
  copyPosition = 'bottom',
  darkCopy = false,
}: SceneFrameProps) {
  const isDark = tone === 'dark'

  return (
    <section
      id={id}
      data-chapter={chapterLabel?.toLowerCase()}
      className={cn('relative min-h-[100svh] overflow-hidden', className)}
    >
      {toneBg[tone]}
      <div className={cn('absolute inset-0 pointer-events-none z-[1]', isDark ? 'vignette' : 'vignette-light')} />

      {(chapterNum || chapterLabel) && (
        <div className="absolute top-6 left-5 sm:left-10 z-30 flex items-center gap-3">
          {chapterNum && (
            <span className="text-[11px] font-medium tracking-[0.35em] text-cyan-600">{chapterNum}</span>
          )}
          {chapterLabel && (
            <>
              <span className="h-px w-8 bg-navy-900/15" />
              <span
                className={cn(
                  'text-[11px] font-medium tracking-[0.35em] uppercase',
                  isDark ? 'text-white/50' : 'text-navy-800/45',
                )}
              >
                {chapterLabel}
              </span>
            </>
          )}
        </div>
      )}

      <div className="absolute top-6 right-5 sm:right-10 z-30">
        <span className={isDark ? 'pill-tag-invert' : 'pill-tag'}>
          LAXIS {chapterNum ? `· ${chapterNum}` : ''}
        </span>
      </div>

      <div
        className={cn(
          'relative z-10 min-h-[100svh] flex flex-col section-pad',
          copyPosition === 'bottom' && 'justify-end pb-16 sm:pb-24',
          copyPosition === 'center' && 'justify-center',
          copyPosition === 'top' && 'justify-start pt-28 sm:pt-32',
        )}
      >
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center pointer-events-none',
            visualClassName,
          )}
        >
          {visual}
        </div>

        {(headline || subline || footer) && (
          <div className="relative z-20 container-editorial max-w-4xl mx-auto w-full">
            {headline && (
              <div
                className={cn(
                  darkCopy ? 'text-editorial-invert' : 'text-editorial',
                  'text-3xl sm:text-5xl lg:text-6xl leading-[1.08]',
                )}
              >
                {headline}
              </div>
            )}
            {subline && (
              <p
                className={cn(
                  'mt-6 text-sm sm:text-base max-w-md font-light leading-relaxed',
                  darkCopy ? 'text-white/55' : 'text-navy-800/60',
                )}
              >
                {subline}
              </p>
            )}
            {footer && <div className="mt-10">{footer}</div>}
          </div>
        )}
      </div>
    </section>
  )
}
