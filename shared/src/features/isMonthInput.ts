import { monthSchema } from '@shared/schemas/month';
import { isSchemaInput } from '@shared/utils/typeGuard';

export const isMonthInput = isSchemaInput(monthSchema);
