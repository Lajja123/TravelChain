import "../styles/globals.scss";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Web3Modal } from "web3modal";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { ContractAddress } from "../config";
import CrypTripABI from "../ABI/CrypTripABI.json";
import { useState, useEffect } from "react";
import { Intercom, Window, Launcher } from "@relaycc/receiver";
import Unstoppable from "./Unstoppable";
import { ethers } from "ethers";
import Cookies from "universal-cookie";
import UAuth from "@uauth/js";

// import { WorldIDWidget } from "@worldcoin/id"
// import { useSigner } from "wagmi";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // const WorldIDWidget = dynamic<WidgetProps>(
  //   () => import("@worldcoin/id").then((mod) => mod.WorldIDWidget),
  //   { ssr: false }
  // );

  const [acc, setAcc] = useState("");
  const [wallet, setWallet] = useState("");
  const [Address, setAddress] = useState("");
  const cookie = new Cookies();
  const [authoriz, setAuthorization] = useState();
  const [userAuth, setUserAuth] = useState(null);


  const login = async () => {
    const uauth = new UAuth({
      clientID: 'a3f983ec-9d40-4485-a8d6-f60072b32292',
      redirectUri: 'http://localhost:3000',
      scope: 'openid wallet'
    })
    const authorization = await uauth.loginWithPopup()
    console.log(authorization);
    setAuthorization(uauth);
    setAddress(authorization.idToken.sub)
    cookie.set("udaddress", authorization.idToken.sub, {
      path: "/",
      maxAge: 5000,
    });
  }
  useEffect(() => {
    setAddress(cookie.get('udaddress'))
    const uauth = new UAuth({
      clientID: 'a3f983ec-9d40-4485-a8d6-f60072b32292',
      redirectUri: 'http://localhost:3000',
      scope: 'openid wallet'
    })
    setAuthorization(uauth);
  }, [])
  const logout = async () => {
    await authoriz.logout();
    cookie.remove("udaddress");

    window.location.reload();
  };

  async function onInit() {
    if (typeof web3 !== "undefined") {
      await window.ethereum.enable();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      // console.log(typeof account)
      // console.log(account)
      window.ethereum.on("accountsChanged", function (accounts) {
        // Time to reload your interface with accounts[0]!
        // console.log(accounts[0])
        return accounts[0];
      });
      const { ethereum } = window;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      // console.log(signer);
      // setWallet(signer);
      // setAcc(account);
    } else {
      return null;
    }
  }

  onInit();

  return (
    <div>
      <nav className="navs">

        <Launcher wallet={wallet} />
        <Intercom>
          <Window />
        </Intercom>
        {/* <WorldIDWidget
          actionId="wid_BPZsRJANxct2cZxVRyh80SFG" // obtain this from developer.worldcoin.org
          signal="my_signal"
          enableTelemetry
          onSuccess={(verificationResponse) =>
            console.log(verificationResponse)
          }
          onError={(error) => console.error(error)}
          debug={true} // to aid with debugging, remove in production
        />
        ; */}
        {/* <button onClick={() => launch()} className="relay">
          Open Conversations List
        </button>
        <button
          className="relay"
          onClick={() => launch("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045")}
        >
          Talk to Vitalik
        </button> */}
      
        <div className="nav-left">
          <div className="nav-logo">
            <Image
              src="/images/TravelChainlogo.png"
              width="200px"
              height="150px"
            />
            {/* <Logo /> */}
          </div>
        </div>

        <div className="nav-right">
          <div className="nav-links">
            <div
              className="nav-link"
              style={
                router.pathname === "/"
                  ? { color: "#f29100", fontWeight: "700" }
                  : null
              }
            >
              <Link href="/">Home</Link>
            </div>
            <div
              className="nav-link"
              style={
                router.pathname === "/booking"
                  ? { color: "#f29100", fontWeight: "700" }
                  : null
              }
            >
              <Link href="/booking">Book</Link>
            </div>
            <div
              className="nav-link"
              style={
                router.pathname === "/standings"
                  ? { color: "#f29100", fontWeight: "700" }
                  : null
              }
            >
              <Link href="/standings">Standing</Link>
            </div>
            <div className="nav-dashboard">
              <div className="nav-dashboard-options">
                <div className="nav-single">Dashborad</div>
                <div className="nav-hover-list">
                  <div
                    className="nav-link sub"
                    style={
                      router.pathname === "/user-info"
                        ? { color: "white !important", fontWeight: "700" }
                        : null
                    }
                  >
                    <Link href="/user-info">User Info</Link>
                  </div>
                  <div
                    className="nav-link sub"
                    style={
                      router.pathname === "/collection"
                        ? { color: "white !important", fontWeight: "700" }
                        : null
                    }
                  >
                    <Link href="/collection">My Collection</Link>
                  </div>
                  <div
                    className="nav-link sub"
                    style={
                      router.pathname === "/create"
                        ? { color: "white !important", fontWeight: "700" }
                        : null
                    }
                  >
                    <Link href="/create">Create NFT</Link>
                  </div>
                  <div
                    className="nav-link sub"
                    style={
                      router.pathname === "/add-hotel"
                        ? { color: "white !important", fontWeight: "700" }
                        : null
                    }
                  >
                    <Link href="/add-hotel">Add Hotel</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="nav-member">
            <div className="nav-search"></div>
            <div className="nav-signup">
              {/* <Unstoppable /> */}

              {/* {acc ? (
                <div
                  style={{
                    fontSize: "15px",
                    width: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: "#f29100",
                  }}
                >
                  {acc}
                </div>
              ) : (
                <button
                  className="connect-btn"
                  onClick={() => {
                    onInit();
                  }}
                >
                  Connect
                </button>
              )} */}
              {/* <button
                  className="connect-btn"
                  onClick={() => {
                    login();
                  }}
                >
                  Connect
                </button>
                <span>{Address}</span>  */}
              {
                Address ? (
                  <ul>
                    <li className="rmv">
                      <div>
                        <span className="udname">{Address}</span>
                      </div>
                    </li>
                    <li  className="rmv">


                      <button className="bn29"
                        onClick={() => {
                          logout();
                        }}
                        
                      >
                        Logout
                      </button>


                    </li>
                  </ul>
                ) : (
                  <>
                    <li  className="rmv">
                      <button
                        className="bn29"
                        onClick={() => {
                          login();
                        }}
                      >
                        Login With Unstoppable Domain 
                      </button>
                    </li>
                  </>
                )
              }


            </div>
          </div>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
