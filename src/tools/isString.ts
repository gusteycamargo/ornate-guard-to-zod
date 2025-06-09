import { IsStringConstraint } from 'ornate-guard'
import { z } from 'zod'

export const isString = (constraint: IsStringConstraint) => {
  const params: Parameters<typeof z.string>[0] = {}

  if (constraint.coerce) params.coerce = true

  let zod = z.string(params)

  if (constraint.endsWith) zod = zod.endsWith(constraint.endsWith.toString())
  if (constraint.includes) zod = zod.includes(constraint.includes.toString())
  if (constraint.length) zod = zod.length(constraint.length)
  if (constraint.max) zod = zod.max(constraint.max)
  if (constraint.min) zod = zod.min(constraint.min)
  if (constraint.startsWith)
    zod = zod.startsWith(constraint.startsWith.toString())
  if (constraint.trim) zod = zod.trim()
  if (constraint.pattern) {
    const pattern = Array.isArray(constraint.pattern)
      ? constraint.pattern[0]
      : constraint.pattern
    if (pattern) zod = zod.regex(pattern)
  }

  return zod
}
