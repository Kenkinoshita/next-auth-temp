import React, { memo } from 'react';

import { toStrictEntries } from '@shared/utils/utilityFunction';

export type TableHeader<Data extends Record<keyof Data, React.ReactNode>> = {
  [key in keyof Data]: { name: string; order: number };
};

type Props<Data extends Record<keyof Data, React.ReactNode>> = {
  className?: string;
  data: Data[];
  header: TableHeader<Data>;
  canScroll?: boolean;
};

function NoMemorizedTable<Data extends Record<keyof Data, React.ReactNode>>({
  className,
  data,
  header,
  canScroll = true,
}: Props<Data>) {
  const headerEntries = toStrictEntries(header).sort((a, b) => (a[1].order < b[1].order ? -1 : 1));
  const columnNames = headerEntries.map(([, { name }]) => name);
  const dataKeys = headerEntries.map(([dataKey]) => dataKey);

  return (
    <div className={`w-full overflow-x-auto rounded border border-gray-semiLight ${className || ''}`}>
      <table className={`w-full ${canScroll ? 'whitespace-nowrap' : ''} text-gray-dark`}>
        <thead>
          <tr>
            {columnNames.map((columnName) => (
              <th
                scope="col"
                className="border-b border-gray-semiLight px-4 py-2.5 text-center text-base font-bold sm:text-lg"
                key={columnName}
              >
                {columnName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!data.length ? (
            <tr>
              <td
                colSpan={columnNames.length}
                className="w-full border-t border-gray-semiLight px-4 py-2.5 text-center text-base font-bold sm:text-lg"
              >
                データがありません
              </td>
            </tr>
          ) : (
            data.map((data, index) => {
              return (
                <tr key={index}>
                  {dataKeys.map((key, index) => (
                    <td
                      className="w-36 border-t border-gray-semiLight px-4 py-2.5 text-center text-sm font-normal sm:text-base"
                      key={index}
                    >
                      {data[key]}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export const Table = memo(NoMemorizedTable) as <Data extends Record<keyof Data, React.ReactNode>>(
  props: Props<Data>,
) => JSX.Element;
