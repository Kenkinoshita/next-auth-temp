import { corporationCancelChoiceSchema } from '@shared/schemas/corporation/corporationCancelChoice';
import { isSchemaInput } from '@shared/utils/typeGuard';

export const isCorporationCancellationDateChoiceInput = isSchemaInput(corporationCancelChoiceSchema);
