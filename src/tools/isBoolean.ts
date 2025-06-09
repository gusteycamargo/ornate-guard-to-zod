import { IsBooleanConstraint } from 'ornate-guard'
import { z } from 'zod'

export const isBoolean = (constraint: IsBooleanConstraint) => {
  const params: Parameters<typeof z.boolean>[0] = {}

  if (constraint.coerce) params.coerce = true

  return z.boolean(params)
}
