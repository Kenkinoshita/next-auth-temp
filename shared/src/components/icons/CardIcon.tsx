import type { IconProps } from '@shared/components/SvgIcon';
import { SvgIcon } from '@shared/components/SvgIcon';

/**
 * Headerのお申込みのアイコン
 * icon_08.svg
 */
export function CardIcon(props: IconProps) {
  return (
    <SvgIcon {...props} viewBox="15 15 65 65">
      <path d="m67.29,30.34c3.7,0,6.71,3.01,6.71,6.71v21.9c0,3.7-3.01,6.71-6.71,6.71H28.71c-3.7,0-6.71-3.01-6.71-6.71v-21.9c0-3.7,3.01-6.71,6.71-6.71h38.57m0-4H28.71c-5.92,0-10.71,4.8-10.71,10.71v21.9c0,5.92,4.8,10.71,10.71,10.71h38.57c5.92,0,10.71-4.8,10.71-10.71v-21.9c0-5.92-4.8-10.71-10.71-10.71h0Z" />
      <path d="m29.25,40.67h17.85v6.96h-17.85v-6.96Z" fillRule="evenodd" />
      <path d="m29.25,51.58h26.79v3.01h-26.79v-3.01Z" fillRule="evenodd" />
      <path d="m29.25,56.94h9.64v3.01h-9.64v-3.01Z" fillRule="evenodd" />
    </SvgIcon>
  );
}
