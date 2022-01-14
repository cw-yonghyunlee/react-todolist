import React from 'react';

interface CardInterface {
  children: React.ReactNode;
}

function Card(props: CardInterface): JSX.Element {
  const { children } = props;
  return <article className="card">{children}</article>;
}

export default Card;
