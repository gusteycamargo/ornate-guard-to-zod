import { z } from 'zod'

export const isUUID = () => {
  return z.string().uuid()
}
