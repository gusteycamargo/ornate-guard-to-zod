import { IsEmailConstraint } from 'ornate-guard'
import { z } from 'zod'

export const isEmail = (_: IsEmailConstraint) => {
  return z.string().email()
}
