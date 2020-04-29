import React from 'react';


interface Props {
  timestamp: number;
}


export const Time = (props: Props) => {
  const created = new Date(props.timestamp * 1000);

  return <>
    <time dateTime={created.toISOString()}>
      {created.toLocaleString('fi-FI', {timeZone: 'Europe/Helsinki'})}
    </time>

    <style jsx>
      {`
        time {
          font: normal 14px/1.5 sans-serif;
          color: #bf9a49;
        }
      `}
    </style>
  </>;
};
