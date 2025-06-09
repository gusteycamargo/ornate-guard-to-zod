import { IsNumberConstraint } from 'ornate-guard'
import { z } from 'zod'

export const isNumber = (constraint: IsNumberConstraint) => {
  const params: Parameters<typeof z.number>[0] = {}

  if (constraint.coerce) params.coerce = true

  let zod = z.number(params)

  if (constraint.min) zod = zod.min(constraint.min)
  if (constraint.max) zod = zod.max(constraint.max)
  if (constraint.finite) zod = zod.finite()
  if (constraint.integer) zod = zod.int()
  if (constraint.negative) zod = zod.negative()
  if (constraint.positive) zod = zod.positive()
  if (constraint.nonnegative) zod = zod.nonnegative()
  if (constraint.nonpositive) zod = zod.nonpositive()
  if (constraint.safe) zod = zod.safe()

  return zod
}
