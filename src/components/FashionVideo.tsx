import { useEffect, useRef } from 'react'

interface Props extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string
  poster?: string
}

export default function FashionVideo({ src, poster, className, ...rest }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            void video.play().catch(() => undefined)
          } else {
            video.pause()
          }
        })
      },
      { rootMargin: '200px 0px', threshold: 0.1 },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      playsInline
      loop
      preload="metadata"
      className={className}
      controls={false}
      {...rest}
    />
  )
}
