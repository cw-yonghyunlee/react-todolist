import React from 'react';

interface ListCardProps {
  date: Date;
  children: React.ReactNode;
}

function ListCard(props: ListCardProps): JSX.Element {
  return (
    <article className="list-card">
      <h3>{props.date.toLocaleDateString()}</h3>
      {props.children}
    </article>
  );
}

export default ListCard;
