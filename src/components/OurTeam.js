import React from "react";
import teamData from "../utils/teamData";

const TeamCard = ({ img, position}) => {
  return (
    <div
      className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl">
      <div className="flex flex-col items-center w-full mt-3">
        <div className="flex justify-start w-full mb-6 p-2">
          <h1>
            {" "}
            <p className="text-white  text-2xl">{position}</p>
          </h1>
        </div>
      </div>
      <img
        src={img}
        alt="team member"
        className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
      />
    </div>
  );
};

const OurTeam = () => {
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-team">
      <div className="flex flex-col md:p-12 py-12 px-4">
        <h3 className="text-white text-3xl text-center my-2 no-underline hover:underline decoration-white cursor-pointer">
          Our Team
        </h3>
        <div className="flex flex-wrap justify-center items-center mt-10">
          {teamData.map((team, index) => (
            <TeamCard id={index} {...team} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
