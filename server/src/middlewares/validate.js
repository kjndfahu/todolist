import { formatZodErrors } from '../utils/format-zod-errors.js';

export const validateReqPropsMiddleware =
    (schema, reqProps) => (req, res, next) => {
        const result = schema.safeParse(req?.[reqProps]);
        if (!result.success) {
            const errorMessages = formatZodErrors(result.error.errors);
            return res.status(400).json({
                success: false,
                message: errorMessages
            });
        }
        next();
    };