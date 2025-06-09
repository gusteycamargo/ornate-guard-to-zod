import { IsEnumConstraint } from 'ornate-guard'
import { z } from 'zod'

export const isEnum = (constraint: IsEnumConstraint) => {
  return z.enum(constraint.values as [string, ...string[]])
}
