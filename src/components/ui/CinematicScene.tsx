import { cn } from '../../lib/utils'

type SceneTheme = 'white' | 'light' | 'muted' | 'hub' | 'dark'

interface CinematicSceneProps {
  id: string
  theme?: SceneTheme
  tag?: string
  minHeight?: string
  className?: string
  background?: React.ReactNode
  children: React.ReactNode
  align?: 'center' | 'bottom' | 'top'
}

const themeClass: Record<SceneTheme, string> = {
  white: 'scene-white',
  light: 'scene-light',
  muted: 'scene-muted',
  hub: 'scene-hub',
  dark: 'scene-dark',
}

const alignClass = {
  center: 'items-center justify-center',
  bottom: 'items-end justify-center pb-20 sm:pb-28',
  top: 'items-start justify-center pt-28 sm:pt-36',
}

export function CinematicScene({
  id,
  theme = 'white',
  tag,
  minHeight = 'min-h-[100svh]',
  className,
  background,
  children,
  align = 'center',
}: CinematicSceneProps) {
  const isDark = theme === 'dark' || theme === 'hub'

  return (
    <section
      id={id}
      className={cn('relative flex overflow-hidden', minHeight, themeClass[theme], className)}
    >
      {background}
      <div
        className={cn(
          'absolute inset-0 pointer-events-none z-[1]',
          isDark && theme === 'dark' ? 'vignette' : 'vignette-light',
        )}
      />

      {tag && (
        <div className="absolute top-6 right-5 sm:right-10 z-30">
          <span className={isDark && theme === 'dark' ? 'pill-tag-invert' : 'pill-tag'}>{tag}</span>
        </div>
      )}

      <div
        className={cn(
          'relative z-10 w-full flex min-h-[inherit]',
          alignClass[align],
          'section-pad',
        )}
      >
        <div className="container-editorial w-full">{children}</div>
      </div>
    </section>
  )
}
