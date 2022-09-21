import Image from "next/image";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useState } from "react";
import axios from "axios";

//Contract Address
import { ContractAddress } from "../config";

//ABI
import CrypTripABI from "../ABI/CrypTripABI.json";

const Create = () => {
  const [nftName, setNFT] = useState("");

  console.log(nftName);
  const [ipfsImage, setIpfsImage] = useState(); //setting up Image to upload on IPFS
  const [ipfsLink, setIpfsLink] = useState(); //setting up Image to upload on IPFS

  const [metadataUri, setMetadataUri] = useState(); //setting up metadata URI for MINTING

  const [tokenData, setAllTokens] = useState([]); //array for storeing all tokens
  const [contractData, setAllContracts] = useState([]); //array for storeing all tokenAddress

  const [name, setName] = useState([]); //setting the returned name
  const [desc, setDesc] = useState([]); //setting the returned Description
  const [return_Image, setReturnImage] = useState([]);
  const [data, setData] = useState([]);

  async function pickImage(e) {
    e.preventDefault();
    const nftImage = e.target.nftImage_id.files[0];
    console.log(nftImage.name);
    setIpfsImage(nftImage);
  }
  async function uploadOnIpfs() {
    console.log(ipfsImage);
    const form = new FormData();

    form.append("file", ipfsImage);

    const options = {
      method: "POST",
      url: "https://api.nftport.xyz/v0/files",
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=---011000010111000001101001",
        Authorization: "4455109c-4819-40f5-9ec5-5882af32a7ed",
      },
      data: form,
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data.ipfs_url);
        setIpfsLink(response.data.ipfs_url);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  async function metadata(e) {
    e.preventDefault();
    const nftName = e.target.name_id.value;
    const nftDesc = e.target.desc_id.value;

    console.log(nftName);
    console.log(nftDesc);
    // setName(nftName);
    // setDesc(nftDesc);

    const options = {
      method: "POST",
      url: "https://api.nftport.xyz/v0/metadata",
      headers: {
        "Content-Type": "application/json",
        Authorization: "4455109c-4819-40f5-9ec5-5882af32a7ed",
      },
      data: {
        name: nftName,
        description: nftDesc,
        file_url: ipfsLink,
      },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data.metadata_uri);
        setMetadataUri(response.data.metadata_uri);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  async function askApiToMint(e) {
    // e.preventDefault();
    // const network = e.target.networks.value;
    // console.log(network);

    const options = {
      method: "POST",
      url: "https://api.nftport.xyz/v0/mints/customizable",
      headers: {
        "Content-Type": "application/json",
        Authorization: "4455109c-4819-40f5-9ec5-5882af32a7ed",
      },
      data: {
        chain: "rinkeby",
        contract_address: "0x508C019B90976D654a90d5CECD49C0B7A810a357",
        metadata_uri: metadataUri,
        mint_to_address: "0xdab4984b2f4e06d207f73678935a649ae6969490",
      },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async function fetchNfts(e) {
    e.preventDefault();
    const WalletAddress = e.target.address_id.value;
    // console.log(WalletAddress);

    const options = {
      method: "GET",
      url: "https://api.nftport.xyz/v0/me/mints",
      params: { chain: "rinkeby" },
      headers: {
        "Content-Type": "application/json",
        Authorization: "4455109c-4819-40f5-9ec5-5882af32a7ed",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        let tokenArray = [];
        let contractArray = [];

        for (let i = 0; i < 7; i++) {
          if (WalletAddress == response.data.minted_nfts[i].mint_to_address) {
            console.log(
              "Data for Address: " +
                response.data.minted_nfts[i].mint_to_address
            );

            //getting Token Id
            console.log("token ID: " + response.data.minted_nfts[i].token_id); //console token ID
            tokenArray.push(response.data.minted_nfts[i].token_id); //Pushing that tokenID to tokenArray
            // console.log("from array:  " + tokenArray)                       //checking it from Array
            setAllTokens(...tokenData, tokenArray);

            //getting Contract Address
            console.log(
              "contract address: " +
                response.data.minted_nfts[i].contract_address
            ); //console Contract Address
            contractArray.push(response.data.minted_nfts[i].contract_address); // Pushing ONto ContractArray
            // console.log("from array for contract:  " + contractArray)                     //Checking It from Array
            setAllContracts(...contractData, contractArray);

            console.log("====================================");
            console.log("====================================");
          }
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  // async function fetchNftImages() {
  //   let nameArray = [];
  //   let descArray = [];
  //   let imageArray = [];
  //   console.log("response from Retrive Nft details API");
  //   const optionsNew = {
  //     method: "GET",
  //     url: `https://api.nftport.xyz/v0/nfts/${contractData[0]}`,
  //     // url: `https://api.nftport.xyz/v0/nfts/${contractData[0]}/${tokenData[i]}`,
  //     // url: 'https://api.nftport.xyz/v0/nfts/0x508c019b90976d654a90d5cecd49c0b7a810a357/542090625321991293795',
  //     params: { chain: "rinkeby", include: "all" },
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "4455109c-4819-40f5-9ec5-5882af32a7ed",
  //     },
  //   };
  //   await axios
  //     .request(optionsNew)
  //     .then(function (response) {
  //       for (let i = 0; i <= tokenData.length; i++) {
  //         console.log(response.data);
  //         console.log("url: " + response.data.nfts[i].file_url);
  //         console.log("name: " + response.data.nfts[i].metadata.name);
  //         console.log("Desc: " + response.data.nfts[i].metadata.description);
  //         console.log("====================================");
  //         console.log("====================================");

  //         // nameArray.push(response.data.nfts[i].metadata.name);
  //         // descArray.push(response.data.nfts[i].metadata.description);
  //         // imageArray.push(response.data.nfts[i].file_url);
  //         // setName(...name, nameArray);
  //         // setDesc(...desc, descArray);
  //         // setReturnImage(...return_Image, imageArray);
  //         data.push([
  //           response.data.nfts[i].metadata.name,
  //           response.data.nfts[i].metadata.description,
  //           response.data.nfts[i].file_url,
  //         ]);
  //       }
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  //   setData(data);
  // }

  // console.log(name);

  const CreateNFT = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(ContractAddress, CrypTripABI, signer);
    //let transaction = await contract.createHotel('Manav', 'abc', 123, 'Manali', 123, 10, 9, 7, 2000, 5000, 7000)
    let transaction = await contract.search(nftName);
    console.log(transaction);
    // let tx = await transaction.wait()

    // console.log(tx)

    // const price = ethers.utils.parseUnits(formInput.price, 'ether')

    /* then list the item for sale on the marketplace */
    // contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    // transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
    // await transaction.wait()
    // router.push('/')
  };

  return (
    // <div className="standings">
    //   <div className="img">
    //     {/* <Image src="/images/Artboard31.jpg" width={1924} height={414}/> */}
    //     <div className="standing">CREATE NFTS</div>

    //     <div className="content-create">
    //       <div className="options" onSubmit={metadata}>
    //         <form onSubmit={pickImage}>
    //           <input type="file" id="nftImage_id" />
    //           <button>Submit</button>
    //         </form>

    //         <button onClick={uploadOnIpfs} style={{ margin: 50, padding: 10 }}>
    //           Upload Image
    //         </button>
    //         <br></br>
    //         <img src={ipfsLink} style={{ width: 200, height: 200 }}></img>
    //         <form onSubmit={metadata}>
    //           <div>
    //             {" "}
    //             <input
    //               className="text"
    //               id="name_id"
    //               type="text"
    //               // onChange={(e) => {
    //               //   setNFT(e.target.value);
    //               // }}
    //               placeholder="Your name.."
    //             ></input>
    //           </div>
    //           <div>
    //             {" "}
    //             <input
    //               className="text"
    //               id="desc_id"
    //               type="text"
    //               placeholder="Description.."
    //             ></input>
    //           </div>
    //           <div>
    //             {" "}
    //             <input
    //               className="text"
    //               type="text"
    //               placeholder="Price.."
    //             ></input>
    //           </div>
    //           <div>
    //             <button
    //               className="upload-btn"
    //               // onClick={() => {
    //               //   CreateNFT(nftName);
    //               // }}
    //             >
    //               SubmitImage
    //             </button>
    //           </div>
    //         </form>
    //       </div>
    //       <div className="examples">
    //         <div className="corrousal">
    //           <Image src="/images/Artboard32.png" width={500} height={219} />
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {data.map((item) => {
    //     return (
    //       <div>
    //         Name: {item[0]}
    //         <br></br>
    //         Description: {item[1]}
    //         <br></br>
    //         <img
    //           src={item[2]}
    //           style={{ width: 200, height: 200 }}
    //           alt="NFT"
    //         ></img>
    //       </div>
    //     );
    //   })}
    // </div>

    <div className="standings">
      {/* =============================  pick Image form  */}
      <form onSubmit={pickImage}>
        <input type="file" id="nftImage_id" />
        <button>Submit</button>
      </form>

      <button onClick={uploadOnIpfs} style={{ margin: 50, padding: 10 }}>
        Upload Image
      </button>
      <br></br>

      {/* =============================  picked image shown  */}
      <img src={ipfsLink} style={{ width: 200, height: 200 }}></img>

      {/* =============================  Metadata form  */}
      <form onSubmit={metadata}>
        <br></br>
        <br></br>
        <input type="text" id="name_id" placeholder="Enter Name:" />
        <input type="text" id="desc_id" placeholder="Enter Description:" />
        <button>Upload Metadata</button>
      </form>

      <select id="networks">
        <option value="volvo">Rinkeby</option>
        <option value="saab">Polygon</option>
      </select>

      {/* =============================  NFT mint Button  */}
      <button onClick={askApiToMint} style={{ margin: 50, padding: 10 }}>
        Mint NFT
      </button>

      {/* <form onSubmit={fetchNfts}>
        <input type="text" id="address_id" placeholder="Enter Address" />

        <button style={{ margin: 50, padding: 10 }}>Fetch NFTs</button>
      </form> */}
      {/* <button onClick={fetchNftImages}>fetch Images</button> */}
      {/* <h4>tokens:{tokenData}</h4>
      <h4>contracts:{contractData}</h4> */}
      {/* {name}
      <h1>-----</h1>
      {desc}
      <h1>-----</h1>
      {return_Image} */}
      {/* <h4>name: {name}</h4>
      <h4>desc: {desc}</h4>
      <h4>image: {return_Image}</h4> */}

      {/* {for(let i=0;i <= tokenData.length; i++ ){
        <h1>{i.name}</h1>
      }} */}

      {data.map((item) => {
        return (
          <div>
            Name: {item[0]}
            <br></br>
            Description: {item[1]}
            <br></br>
            <img
              src={item[2]}
              style={{ width: 200, height: 200 }}
              alt="NFT"
            ></img>
          </div>
        );
      })}
    </div>
  );
};
export default Create;
