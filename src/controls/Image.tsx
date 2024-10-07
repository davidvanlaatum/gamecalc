import { ImgHTMLAttributes, useEffect, useState } from 'react';

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string | Promise<string | undefined> | undefined;
}

function Image({ className, src, alt, ...extra }: Readonly<ImageProps>) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    if (typeof src === 'string') {
      setUrl(src);
    } else if (src instanceof Promise) {
      src.then(setUrl, () => setUrl(undefined));
    } else {
      setUrl(undefined);
    }
  }, [src]);
  return (
    <>
      <img
        src={url}
        alt={alt}
        className={[className, isLoaded ? null : 'hidden'].filter((x) => x).join(' ')}
        onLoad={() => setIsLoaded(true)}
        {...extra}
      />
      {!isLoaded && <span style={{ display: 'inline-block' }} className={className} />}
    </>
  );
}

export default Image;
