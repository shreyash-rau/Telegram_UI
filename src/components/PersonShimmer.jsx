



import React from 'react';

function PersonShimmer() {
  return (
    <>
    <div>
      <div className="placeholder-glow">
        <img className="placeholder m-3 custom-profile" />
      </div>

      <div className="placeholder-glow ms-4 m-4 mb-5">
        <span className="placeholder col-4"></span>
        <span className="placeholder col-10"></span>
      </div>

      <div className="placeholder-glow ms-4 m-4 text-end mb-5">
        <span className="placeholder col-4"></span>
        <span className="placeholder col-10"></span>
      </div>

      <div className="placeholder-glow ms-4 m-4 text-start">
        <span className="placeholder col-4"></span>
        <span className="placeholder col-10"></span>
      </div>
    </div>    
    </>
  )
}

export default PersonShimmer;




