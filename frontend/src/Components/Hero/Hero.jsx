// import React from "react";
// import "./Hero.css";
// import campus from "../Assets/campus.jpg";


// const Hero = () => {
//   return (
//     <div className="hero">
//       <div className="hero-left">
//         <div>
//         <div className="hero-icon">
//           <p>Customize! It's your tour. </p>
//             <p>You can select the stops based on your major, interests, or  any other preference. </p>
//             <p>You also have the option to adjust the number of visitors anticipated at each stop.</p>
//           <img src={campus} alt="" />
//         </div>
//         <p>Head to the STOPS tab to start building your own experience!</p>
//         <p>Go Bulls!</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;



import React from "react";
import "./Hero.css";
import campus from "../Assets/campus.jpg";
  
const Hero = () => {
  return (
    <div className="hero" style={{ backgroundImage: `url(${campus})` }}>
      <div className="hero-content">
        <h1>Welcome to USF Campus Tours!</h1>
        <p>Discover your future campus with a personalized tour experience.</p>        
        
      </div>
    </div>
  );
};

export default Hero;

