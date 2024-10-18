import { feeBillingMethodSchema } from '@shared/schemas/feeBillingMethod';
import { isSchemaInput } from '@shared/utils/typeGuard';

export const isFeeBillingMethodInput = isSchemaInput(feeBillingMethodSchema);
