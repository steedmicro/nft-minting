import { useEffect,useState } from "react";
import Wallet from "./Wallet";

const Welcome = () => {
  const [url,setUrl] = useState('');
  useEffect(() => {
    setUrl('https://www.npmjs.com/')  
  }, []);
  

  return (
    <div className="flex w-full justify-center items-center">
      {/* provides paddding text to fill */}
      <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col md:mr-10">
          <h1 className="text-2xl sm:text-4xl text-white py-1">
            WELCOME TO THE TIMELESS
            <br />
            APE CLUB
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Congratulations, you are invited to an ultra-exclusive club of
            watch-lovers. Get ready to be blown away by one of the most
            extravagant roadmap in NFT history. Stand a to to chance to win
            Patek Phillippe, Audemars Piguet, Rolex. US$350,000 worth of
            giveaways back to the community. Receive free airdrops.
          </p>
          <button
            type="button"
            className="flex flex-row justify-center items-center my-5
             bg-[#2952e3] p-3 cursor-pointer hover:bg-[#2546bd] w-64 "
          >
            <p className="text-white text-base">
            <a target="_blank" href={url}>Join Our Discord</a>
            </p>
          </button>
        </div>
        {/* form to connect to wallet */}
        <Wallet/>
        
      </div>
    </div>
  );
};

export default Welcome;
