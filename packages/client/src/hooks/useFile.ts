import React from 'react';

const useFile = (file?: File) => {
  const [dataURL, setDataURL] = React.useState<string | undefined>();

  const reader = React.useRef(new FileReader());

  React.useEffect(() => {
    let isMounted = true;

    reader.current.onload = evt => {
      const result = evt.target?.result;
      if (typeof result == 'string' && isMounted) {
        setDataURL(result);
      }
    };

    return () => {
      isMounted = false;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      reader.current.abort();
    };
  }, []);

  React.useEffect(() => {
    if (file) {
      reader.current.readAsDataURL(file);
    } else {
      setDataURL(undefined);
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      reader.current.abort();
    };
  }, [file]);

  return dataURL;
};

export default useFile;
