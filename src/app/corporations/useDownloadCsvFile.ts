import { useCallback, useState } from 'react';

import { downloadCorporationsCsv } from '@/service/corporations';
import { corporationCsvResultSchema } from '@shared/schemas/corporation/corporationCsvResult';
import {
  type CorporationSearchConditionInput,
  CORPORATION_SEARCH_CONDITION_INPUT_DEFAULT_VALUE,
} from '@shared/schemas/corporation/corporationSearchCondition';
import { Base64Manager } from '@shared/utils/Base64Manager';
import { downloadFile } from '@shared/utils/utilityFunction';

export const useDownloadCsvFile = () => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const downloadCsvFile = useCallback(async (condition?: CorporationSearchConditionInput) => {
    setIsDownloading(true);
    try {
      const input = condition ?? {
        ...CORPORATION_SEARCH_CONDITION_INPUT_DEFAULT_VALUE,
        cancellationDate: 'all',
      };

      const { file, fileName } = await downloadCorporationsCsv(input);
      corporationCsvResultSchema.parse({ file, fileName });

      const csvBase64Manager = new Base64Manager('csv');
      const fileData = await csvBase64Manager.decode(file);

      downloadFile({ fileData, fileName });
    } finally {
      setIsDownloading(false);
    }
  }, []);
  return { downloadCsvFile, isDownloading };
};
