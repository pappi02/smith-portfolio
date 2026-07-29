import { useEffect, useId, useMemo, useState } from 'react'

type MaxHeightValue = string | number

type MaxHeightMap = {
  sm?: MaxHeightValue
  md?: MaxHeightValue
  lg?: MaxHeightValue
  xl?: MaxHeightValue
}

type ResponsiveMaxHeight = MaxHeightValue | MaxHeightMap

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string
  src: string
  sizes?: string
  srcSet?: string
  placeholder?: string
  preserveAspect?: boolean
  maxHeight?: ResponsiveMaxHeight
}

function isMaxHeightMap(value: ResponsiveMaxHeight | undefined): value is MaxHeightMap {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function toCssValue(value: MaxHeightValue) {
  return typeof value === 'number' ? `${value}px` : value
}

export default function ResponsiveImage({ alt, src, sizes, srcSet, placeholder, className, preserveAspect, maxHeight, width = 1200, height = 1600, ...rest }: Props) {
  const [ratio, setRatio] = useState<number | null>(null)
  const uid = useId().replace(/:/g, '')

  useEffect(() => {
    if (!preserveAspect) {
      return
    }

    let mounted = true
    const img = new Image()
    img.src = src
    img.onload = () => {
      if (!mounted) return
      if (img.naturalWidth && img.naturalHeight) {
        setRatio(img.naturalHeight / img.naturalWidth)
      }
    }
    img.onerror = () => {
      if (!mounted) return
      setRatio(null)
    }

    return () => {
      mounted = false
    }
  }, [src, preserveAspect])

  useEffect(() => {
    if (!maxHeight || !isMaxHeightMap(maxHeight)) {
      return
    }

    const rules: string[] = []
    const baseClass = `.${uid}`
    if (maxHeight.sm) {
      rules.push(`${baseClass} { max-height: ${toCssValue(maxHeight.sm)}; }`)
    }
    if (maxHeight.md) {
      rules.push(`@media (min-width: 768px) { ${baseClass} { max-height: ${toCssValue(maxHeight.md)}; } }`)
    }
    if (maxHeight.lg) {
      rules.push(`@media (min-width: 1024px) { ${baseClass} { max-height: ${toCssValue(maxHeight.lg)}; } }`)
    }
    if (maxHeight.xl) {
      rules.push(`@media (min-width: 1280px) { ${baseClass} { max-height: ${toCssValue(maxHeight.xl)}; } }`)
    }

    if (rules.length === 0) {
      return
    }

    const style = document.createElement('style')
    style.setAttribute('data-ri-style', uid)
    style.innerHTML = rules.join('\n')
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [maxHeight, uid])

  const inlineMaxHeight = useMemo(() => {
    if (!maxHeight || isMaxHeightMap(maxHeight)) {
      return undefined
    }

    return typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight
  }, [maxHeight])

  const fallbackMaxHeight = useMemo(() => {
    if (inlineMaxHeight) {
      return inlineMaxHeight
    }

    if (isMaxHeightMap(maxHeight) && maxHeight.sm) {
      return toCssValue(maxHeight.sm)
    }

    return undefined
  }, [inlineMaxHeight, maxHeight])

  if (preserveAspect && ratio) {
    const paddingTop = `${ratio * 100}%`

    return (
      <div style={{ width: '100%', position: 'relative', paddingTop, maxHeight: inlineMaxHeight }} className={`${uid} overflow-hidden rounded-[inherit]`}>
        <img
          src={placeholder ?? src}
          data-src={src}
          data-srcset={srcSet}
          data-sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          className={`${className ?? ''} lozad`}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          {...rest}
        />
      </div>
    )
  }

  return (
    <img
      src={placeholder ?? src}
      data-src={src}
      data-srcset={srcSet}
      data-sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      className={`${className ?? ''} lozad ${uid}`}
      style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', maxHeight: fallbackMaxHeight }}
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      {...rest}
    />
  )
}
