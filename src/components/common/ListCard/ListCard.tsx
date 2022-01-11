import React from 'react';

interface ListCardProps {
  date: Date;
  children: React.ReactNode;
}

function ListCard({ date, children }: ListCardProps): JSX.Element {
  return (
    <article className="list-card">
      <h3>{date.toLocaleDateString()}</h3>
      {children}
    </article>
  );
}

export default ListCard;
