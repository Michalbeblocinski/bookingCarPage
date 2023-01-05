import React from 'react';
import './feature.css';

const Feature = ({ title, text }) => (
  <div className="cr__feature-container__feature">
    <div className="cr__feature-container__feature-title">
      <div />
      <h1>{title}</h1>
    </div>
    <div className="cr__feature-container_feature-text">
      <p>{text}</p>
    </div>
  </div>
);

export default Feature;