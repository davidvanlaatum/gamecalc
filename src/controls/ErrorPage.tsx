import { FC, useEffect, useState } from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage: FC = () => {
  const error = useRouteError();
  const [message, setMessage] = useState<string>('Something went wrong. Please try again later.');
  const [stack, setStack] = useState<string>();

  useEffect(() => {
    if (error instanceof Error) {
      if (error.message) {
        setMessage(error.message);
      }
      if (error.stack) {
        setStack(error.stack);
      }
    }
  }, [error]);

  return (
    <div>
      <p>{message}</p>
      {stack && <pre>{stack}</pre>}
    </div>
  );
};

export default ErrorPage;
