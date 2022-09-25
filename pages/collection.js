import Image from "next/image";
import { useEffect } from "react";
const Collection = () => {
  const APIKEY = "ckey_f09b8656acce40139909164b62e";
  const baseURL = "https://api.covalenthq.com/v1";
  const blockchainChainId = 5;
  const userAddress = "0xdab4984b2f4e06d207f73678935a649ae6969490";
  const contractAddress = "0x508C019B90976D654a90d5CECD49C0B7A810a357";
  async function getWalletBalance(chainId, address) {
    // const url = new URL(`${baseURL}/${chainId}/address/${address}/balances_v2/?key=${APIKEY}`);
    // https://api.covalenthq.com/v1/1/tokens/0xe4605d46fd0b3f8329d936a8b258d69276cba264/nft_token_ids/?key=ckey_f09b8656acce40139909164b62e
    const tokenId = new URL(
      `${baseURL}/${chainId}/tokens/${address}/nft_token_ids/?key=${APIKEY}`
    );
    const tokenIdResponse = await fetch(tokenId);
    const tokenResult = await tokenIdResponse.json();
    const tokenData = tokenResult.data;
    console.log(tokenData);
    // console.log(tokenData.items[0].token_id);
    const length = tokenData.items.length;
    const metadata = [];
    for (let i = 1; i <= length; i++) {
      const url = new URL(
        `${baseURL}/${chainId}/tokens/${address}/nft_metadata/${i}/?key=${APIKEY}`
      );
      console.log(url);
      const response = await fetch(url);
      const result = await response.json();
      const data = result.data;
      console.log(data.items[i - 1].nft_data[0].owner_address);
      metadata.push(data);
    }
    console.log(metadata);
  }
  useEffect(() => {
    getWalletBalance(blockchainChainId, contractAddress);
  }, []);
  return (
    <div className="standings-1">
      <div className="img">
        {/* <Image src="/images/Artboard39.jpg" width={1924} height={414}/> */}
        <div className="user-info">MY COLLECTION</div>
        <div className="content-mc">
          <div className="nft-owned">NFTS'S owned</div>
          <div className="nfts">
            <span className="img1">
              <Image src="/images/Artboard20.jpg" width={109} height={106} />
            </span>
            <span className="img1">
              <Image src="/images/Artboard21.jpg" width={109} height={106} />
            </span>
            <span className="img1">
              <Image src="/images/Artboard22.jpg" width={109} height={106} />
            </span>
            <span className="img1">
              <Image src="/images/Artboard23.jpg" width={109} height={106} />
            </span>
          </div>
          <div className="nft-owned">NFTS'S Created</div>
          <div className="nfts-created">
            <span>
              <Image src="/images/Artboard 40.jpg" width={300} height={200} />
            </span>
            <span>
              <Image src="/images/Artboard 42.jpg" width={300} height={200} />
            </span>
            <span>
              <Image src="/images/Artboard 43.jpg" width={300} height={200} />
            </span>
            <span>
              <Image src="/images/Artboard 45.jpg" width={300} height={200} />
            </span>
            <span>
              <Image src="/images/Artboard 44.jpg" width={300} height={200} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
