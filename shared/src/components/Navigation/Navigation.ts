type Item = {
  label: string;
  href: string;
};

export type NavigationItem =
  | Item
  | {
      title: string;
      items: Item[];
    };

/**
 * TODO: GlobalNavigationにリネームすること！
 */
