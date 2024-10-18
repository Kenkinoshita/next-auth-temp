import '@shared/components/Navigation/NavigationPC.css';
import Link from 'next/link';

import { ArrowRightIcon } from '@shared/components/Navigation/ArrowDownIcon';
import type { NavigationItem } from '@shared/components/Navigation/Navigation';

type Props = {
  className?: string;
  expandedTitle: string;
  onChangeExpanded: (title: string) => void;
  items: NavigationItem[];
};

export function NavigationPC({ className, items, expandedTitle, onChangeExpanded }: Props) {
  const expandedItem = items.find((item) => 'title' in item && item.title === expandedTitle);

  return (
    <nav className={`relative bg-white text-base font-bold text-gray-dark ${className || ''}`}>
      <ul className="mx-auto my-0 flex max-w-4xl justify-between">
        {items.map((item) =>
          'label' in item ? (
            <li key={item.label} className="list-item">
              <Link className="mx-4 block py-4 hover:underline hover:opacity-70" href={item.href}>
                <p>{item.label}</p>
              </Link>
            </li>
          ) : (
            <li
              key={item.title}
              className={`relative list-item ${item.title === expandedTitle ? 'navigation-triangle' : ''}`}
            >
              <button
                key={item.title}
                className="flex items-center p-4 hover:underline hover:opacity-70"
                onClick={() => onChangeExpanded(item.title)}
              >
                <span className={`${item.title === expandedTitle ? 'text-corporate-dark' : ''}`}>{item.title}</span>
                <ArrowRightIcon
                  className={`${item.title === expandedTitle ? '-rotate-90' : 'rotate-90'} ml-2 size-4`}
                  fill={`${item.title === expandedTitle ? 'fill-corporate-dark' : 'fill-gray-semiDark'}`}
                />
              </button>
            </li>
          ),
        )}
      </ul>
      {expandedItem && 'title' in expandedItem && (
        <div className="absolute bottom-0 w-full translate-y-full border-t border-gray-semiLight bg-white">
          <div className="mx-auto my-0 flex max-w-4xl ">
            <ChildNavigation title={expandedItem.title} items={expandedItem.items} />
          </div>
        </div>
      )}
    </nav>
  );
}

function ChildNavigation({
  className,
  title,
  items,
}: {
  className?: string;
  title: string;
  items: {
    label: string;
    href: string;
  }[];
}) {
  return (
    <div className={`p-8 pb-9 ${className || ''}`}>
      <h3 className="text-xl">{title}</h3>
      <ul className="mt-5">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              className="flex items-center text-gray-semiDark hover:underline hover:opacity-70"
              key={item.label}
              href={item.href}
            >
              <ArrowRightIcon className="mr-2 size-4" fill="fill-corporate-dark" />
              <p className="text-left">{item.label}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
