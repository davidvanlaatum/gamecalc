import { ImgHTMLAttributes, useState } from 'react';

function Image({ className, src, alt, ...extra }: Readonly<ImgHTMLAttributes<HTMLImageElement>>) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      <img
        src={src}
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
