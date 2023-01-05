
import React from "react";
import '../../App.css';
import { Footer, Header, HowWork, Popular, WhyUs} from '../../containers';
// import { Navbar } from '../../components';
import '../../index.css'

function Home() {
  return (
    <div className="App">
    <div className="color_header">
        {/* <Navbar/> */}
        <Header/>
    </div>  
      <HowWork/>
      <Popular/>
      <WhyUs/>
      <Footer/>
    </div>
  );
}

export default Home;
