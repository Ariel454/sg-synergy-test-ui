import { useState } from 'react'

export function useCardExpand(initial = false) {
  const [isExpanded, setIsExpanded] = useState(initial)
  const toggle = () => setIsExpanded((prev) => !prev)
  return { isExpanded, toggle }
}
