'use client';

import Link from 'next/link';

export type LocalNavigationItem = {
  label: string;
  href: string;
  isActive: boolean;
};

type Props = {
  className?: string;
  items: LocalNavigationItem[];
};

/**
 * TODO: SP未対応。SP対応する場合、PC/SPでコンポーネント分ける
 */
export function LocalNavigation({ className, items }: Props) {
  return (
    <nav className={`bg-gray-semiLight ${className || ''}`}>
      <ul className="mx-auto my-0 flex max-w-4xl items-end">
        {items.map(({ label, href, isActive }) => (
          <Link key={label} href={href}>
            <li className={`border-b-2 px-11 py-2.5 ${isActive ? 'border-corporate-dark' : 'border-transparent'}`}>
              <span className="text-center text-base font-bold text-gray-dark">{label}</span>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}
