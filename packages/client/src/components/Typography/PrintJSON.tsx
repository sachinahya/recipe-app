import React from 'react';

interface PrintJSONProps {
  data?: Record<string, unknown>;
}

const PrintJSON: React.FC<PrintJSONProps> = ({ children, data = children, ...props }) => {
  return <pre {...props}>{JSON.stringify(data, undefined, 2)}</pre>;
};

export default PrintJSON;
