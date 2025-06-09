import {
  ChainConstraint,
  Constraint,
  Constructable,
  getMetadata,
  IsArrayConstraint,
  IsBooleanConstraint,
  IsDateConstraint,
  IsEmailConstraint,
  IsEnumConstraint,
  isGuard,
  IsNumberConstraint,
  IsStringConstraint,
} from "ornate-guard";
import { Primitive, z, ZodRawShape, ZodType } from "zod";
import { isString } from "../tools/isString.js";
import { isUUID } from "../tools/isUUID.js";
import { isNumber } from "../tools/isNumber.js";
import { isBoolean } from "../tools/isBoolean.js";
import { isDate } from "../tools/isDate.js";
import { isArray } from "../tools/isArray.js";
import { isEnum } from "../tools/isEnum.js";
import { isEmail } from "../tools/isEmail.js";

export class OrnateGuardToZod {
  public static getZodByConstraint(
    constraint: Constraint<unknown, unknown>,
    type: Primitive
  ): ZodType {
    if (constraint instanceof ChainConstraint)
      return this.getZodByConstraint(constraint.constraints[0], type);

    if (constraint instanceof IsStringConstraint) return isString(constraint);

    if (constraint.constructor.name.startsWith("IsUUID")) return isUUID();

    if (constraint instanceof IsNumberConstraint) return isNumber(constraint);

    if (constraint instanceof IsBooleanConstraint) return isBoolean(constraint);

    if (constraint instanceof IsDateConstraint) return isDate(constraint);

    if (constraint instanceof IsArrayConstraint)
      return isArray(constraint, type);

    if (constraint instanceof IsEnumConstraint) return isEnum(constraint);

    if (constraint instanceof IsEmailConstraint) return isEmail(constraint);

    return z.any();
  }

  public static toZodShape(inputs: Constructable<object>[]): ZodRawShape;
  public static toZodShape(input: Constructable<object>): ZodRawShape;
  public static toZodShape(
    input: Constructable | Constructable[]
  ): ZodRawShape {
    if (Array.isArray(input)) {
      return input.reduce((acc, input) => {
        const shape = this.toZodShape(input);
        return { ...acc, ...shape };
      }, {} as ZodRawShape);
    }

    if (!isGuard(input)) throw new Error("Input is not a guard");

    const shape: Record<string, ZodType> = {};

    const { properties } = getMetadata(input as Constructable<object>);

    for (const property of properties) {
      // @ts-expect-error: TODO
      const type = Reflect.getMetadata(
        "design:type",
        property.target.prototype,
        property.propertyKey as string | symbol
      );

      property.constraints.map((constraint) => {
        let zod = this.getZodByConstraint(constraint, type);

        if (property.optional) zod = zod.optional();
        if (property.nullable) zod = zod.nullable();

        shape[property.propertyKey as string] = zod;
      });
    }

    return shape as ZodRawShape;
  }
}
