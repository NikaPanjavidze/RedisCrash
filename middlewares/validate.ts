import type { Request, Response, NextFunction } from "express";
import {type ZodSchema } from "../node_modules/zod/index.cjs";

export const validate =
  <T>(schema: ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ success: false, errors: result.error });
    }
    next();
  };
