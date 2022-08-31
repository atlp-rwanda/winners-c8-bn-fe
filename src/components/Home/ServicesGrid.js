import React from 'react';
import '../../../public/styles/Home/servicesGrid.scss';
import ServicesCard from './ServicesCard';
import PinDropIcon from '@mui/icons-material/PinDrop';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import HotelIcon from '@mui/icons-material/Hotel';

function ServicesGrid() {
  const cards = [
    {
      id: 1,
      image: <PinDropIcon fontSize="inherit" />,
      title: 'Best Guide',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Officiis, harum aspernatur? Perferendis voluptatibus error labore qui vitae, corrupti eum ab',
    },
    {
      id: 2,
      image: <ShareLocationIcon fontSize="inherit" />,
      title: 'Best Destination',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Officiis, harum aspernatur? Perferendis voluptatibus error labore qui vitae, corrupti eum ab',
    },
    {
      id: 3,
      image: <HotelIcon fontSize="inherit" />,
      title: 'Easy Booking',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Officiis, harum aspernatur? Perferendis voluptatibus error labore qui vitae, corrupti eum ab',
    },
  ];
  return (
    <section className="services-grid">
      {cards.map((card) => {
        return <ServicesCard key={card.id} card={card} />;
      })}
    </section>
  );
}

export default ServicesGrid;
