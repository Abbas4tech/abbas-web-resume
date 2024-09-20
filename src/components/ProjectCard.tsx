"use client";

import React from "react";

const ProjectCard = () => {
  return (
    <>
      <div
        data-aos="fade-up"
        className="grid grid-cols-1 my-2 rounded-xl gap-4 md:grid-cols-2"
      >
        {Array.from({ length: 6 }, (_, i) => i + 1).map((e) => (
          <div
            key={e}
            className="hover:before:!bg-base-content before:!bg-transparent card image-full before:transition-colors before:ease-in-out before:duration-500"
          >
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body opacity-0 hover:opacity-100">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProjectCard;
