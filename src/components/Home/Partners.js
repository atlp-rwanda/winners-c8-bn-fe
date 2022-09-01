import React from 'react';
import '../../../public/styles/Home/partners.scss';
import AndelaLogo from '../../../public/images/andela2.png';
import SlackLogo from '../../../public/images/slack2.png';
import IremboLogo from '../../../public/images/irembo2.png';

function Partners() {
  return (
    <section className="partners">
      <header>Our Partners</header>

      <div className="partner-logos">
        <span className="logo">
          <img src={AndelaLogo} alt="Andela logo" />
        </span>
        <span className="logo">
          <img src={SlackLogo} alt="Slack logo" />
        </span>
        <span className="logo">
          <img src={IremboLogo} alt="Irembo logo" />
        </span>
      </div>
    </section>
  );
}

export default Partners;
