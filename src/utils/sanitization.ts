const INVISIBLE_CHARACTERS = /[\p{C}]/gu

export function normalizeLineEndings(value: string) {
  return value.replace(/\r\n?/g, '\n')
}

export function removeInvisibleCharacters(value: string) {
  return value.replace(INVISIBLE_CHARACTERS, (character) => {
    return character === '\n' || character === '\r' || character === '\t' ? character : ''
  })
}

export function collapseWhitespace(value: string) {
  return value.replace(/[ \t]+/g, ' ')
}

export function sanitizeString(value: string) {
  const cleaned = removeInvisibleCharacters(value)
  const normalized = normalizeLineEndings(cleaned)
  const collapsed = collapseWhitespace(normalized)
  return collapsed.replace(/\n[ \t]+/g, '\n').replace(/[ \t]+\n/g, '\n').trim()
}

export function sanitizeEmail(value: string) {
  return sanitizeString(value).toLowerCase()
}
