import React from 'react';
import './whyUs.css';
import Feature from '../../components/feature/feature';
import lambo from '../../assets/lambo.png';
const featuresData = [
  {
    title: 'Customer Support',
    text: 'There are many variations of passages but the majority form.',
  },
  {
    title: 'Best prices',
    text: 'There are many variations of passages but the majority form.'  
  },
  {
    title: 'Many Locations',
    text: 'There are many variations of passages but the majority form.'  
  },
  {
    title: 'Verified Car Brand',
    text: 'There are many variations of passages but the majority form.' 
   },
  {
    title: 'Free Cancelation',
    text: 'There are many variations of passages but the majority form.'
    },
  {
    title: 'Verified Car Brand',
    text: 'There are many variations of passages but the majority form.' 
   },
];


function whyUs() {
  return (
    <div className="cr__whyUs section__margin" id="whyUs">
    <div className="cr__whyUs-heading" >
      <h1 >Why choose us</h1>
    </div>
    <div className="cr__features-container"  >
      {featuresData.map((item, index) => (
        <Feature title={item.title} text={item.text} key={item.title + index} />
      ))}
    </div>
    <img className="lambo" src={lambo} alt="car"/>
  </div>

);
      }

export default whyUs