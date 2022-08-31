import React from 'react';
import '../../../public/styles/Home/servicesCard.scss';

function ServicesCard({ card }) {
  return (
    <div className="services-card">
      <span className="image">{card.image}</span>
      <span className="title">{card.title}</span>
      <span className="body">{card.body}</span>
    </div>
  );
}

export default ServicesCard;
