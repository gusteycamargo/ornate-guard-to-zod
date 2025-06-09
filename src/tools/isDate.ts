import { IsDateConstraint } from 'ornate-guard'
import { z } from 'zod'

export const isDate = (constraint: IsDateConstraint) => {
  const params: Parameters<typeof z.date>[0] = {}

  if (constraint.coerce) params.coerce = true

  let zod = z.date(params)

  if (constraint.min) zod = zod.min(constraint.min)
  if (constraint.max) zod = zod.max(constraint.max)

  return zod
}
