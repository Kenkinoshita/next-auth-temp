import Image from 'next/image';

type Props = {
  className?: string;
  width: number;
  height: number;
  src: string;
  alt: string;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const AppImage = ({ width, height, src, alt, className }: Props) => {
  return <Image className={className} width={width} height={height} src={`${basePath}${src}`} alt={alt} />;
};
