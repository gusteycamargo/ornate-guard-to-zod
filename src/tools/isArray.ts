import { IsArrayConstraint, Constraint } from "ornate-guard";
import { Primitive, z } from "zod";
import { OrnateGuardToZod } from "../models/OrnateGuardToZod.js";

export const isArray = (
  constraint: IsArrayConstraint<Constraint<unknown, unknown>>,
  type: Primitive
) => {
  let zod = z.array(
    OrnateGuardToZod.getZodByConstraint(constraint.constraint, type)
  );

  if (constraint.length) zod = zod.length(constraint.length);
  if (constraint.min) zod = zod.min(constraint.min);
  if (constraint.max) zod = zod.max(constraint.max);
  if (constraint.nonempty) zod = zod.nonempty() as any;

  return zod;
};
