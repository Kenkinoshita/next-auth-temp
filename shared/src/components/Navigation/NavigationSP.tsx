import Link from 'next/link';
import type { ReactNode } from 'react';

import { ArrowRightIcon } from '@shared/components/Navigation/ArrowDownIcon';
import type { NavigationItem } from '@shared/components/Navigation/Navigation';

type Props = {
  className?: string;
  username?: string;
  expandedTitle: string;
  onChangeExpanded: (title: string) => void;
  items: NavigationItem[];
};

export function NavigationSP({ className, username, items, expandedTitle, onChangeExpanded }: Props) {
  return (
    <nav className={`${className || ''}`}>
      <div className="border-b border-b-gray-semiLight bg-white pb-6 pt-3 text-base font-bold text-gray-dark">
        {username && <div className="p-4 pl-6">{username} さま</div>}
        <div className="border-y border-y-gray-semiLight [&>*+*]:border-t [&>*+*]:border-t-gray-semiLight">
          {items.map((item) =>
            'label' in item ? (
              <Link
                className="block px-4 py-5 text-sm hover:underline hover:opacity-70"
                key={item.label}
                href={item.href}
              >
                <p>{item.label}</p>
              </Link>
            ) : (
              <Accordion
                key={item.title}
                className="px-4"
                title={item.title}
                toggleKey={item.title}
                expanded={item.title === expandedTitle}
                onToggle={onChangeExpanded}
              >
                <div className="border-t border-t-gray-semiLight px-3 py-5">
                  {item.items.map((childItem) => (
                    <Link
                      className="flex items-center text-gray-semiDark hover:underline hover:opacity-70"
                      key={childItem.label}
                      href={childItem.href}
                    >
                      <ArrowRightIcon className="mr-2 size-4" fill="fill-corporate-dark" />
                      <p className="text-left text-xs">{childItem.label}</p>
                    </Link>
                  ))}
                </div>
              </Accordion>
            ),
          )}
        </div>
      </div>
    </nav>
  );
}

function Accordion({
  className,
  title,
  toggleKey,
  expanded,
  children,
  onToggle,
}: {
  className?: string;
  title: string;
  toggleKey: string;
  expanded: boolean | undefined;
  children: ReactNode;
  onToggle: (toggleKey: string) => void;
}) {
  return (
    <div className={className}>
      <button
        className="flex w-full items-center justify-between py-5 text-left"
        onClick={() => {
          onToggle(toggleKey);
        }}
      >
        <p className="flex-1">{title}</p>
        <ArrowRightIcon className={`${expanded ? '-rotate-90' : 'rotate-90'} ml-2 size-4`} fill="fill-gray-semiDark" />
      </button>
      {!!expanded && children}
    </div>
  );
}
