import {useForm } from "react-hook-form"
import { useLensContext } from "../context/LensContext";
import { createContentMetadata, TRUE_BYTES } from "../constants/lensConstants";
import { useWeb3Contract } from "react-moralis";
import lensAbi from "../lensAbi.json"
import { encode } from "js-base64";

const BASE_64_PREFIX = "data:application/json;base64,";
const PINATA_PIN_ENDPOINT = "https://api.pinata.cloud/pinning/pinJSONToIPFS"

async function pinMetadataToPinata(
  metadata,
  contentName,
  pinataApiKey,
  pinataApiSecret
) {
  console.log("pinning metadata to pinata...");
  const data = JSON.stringify({
    pinataMetadata: { name: contentName },
    pinataContent: metadata,
  });
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      pinata_api_key: pinataApiKey,
      pinata_secret_api_key: pinataApiSecret,
    },
    body: data,
  };
  const response = await fetch(PINATA_PIN_ENDPOINT, config);
  const ipfsHash = (await response.json()).IpfsHash;
  console.log(`Stored content metadata with ${ipfsHash}`);
  return ipfsHash;
}

function PostForm() {
    const {profileId, token} = useLensContext();
    const {runContractFunction} = useWeb3Contract();
    const { register, errors, handleSubmit, formState, reset, watch } = useForm({
        mode: "onChange",
    });

    const publishPost = async function ({
        content,
        contentName,
        imageUri,
        imageType,
        pinataApiKey,
        pinataApiSecret,
    }) {
        let fullContentURI;
        const contentMetadata = createContentMetadata(
        content,
        contentName,
        imageUri,
        imageType
        );
        if (pinataApiSecret && pinataApiKey) {
        const metadataIpfsHash = await pinMetadataToPinata(
            contentMetadata,
            contentName,
            pinataApiKey,
            pinataApiSecret
        );
        fullContentURI = `ipfs://${metadataIpfsHash}`;
        console.log(fullContentURI);
        } else {
        const base64EncodedContent = encode(JSON.stringify(contentMetadata));
        fullContentURI = BASE_64_PREFIX + base64EncodedContent;
        }

        // to the blockchain!
        const transactionParameters = [
            profileId,
            fullContentURI,
            "0x0BE6bD7092ee83D44a6eC1D949626FeE48caB30c",
            TRUE_BYTES,
            "0x7Ea109eC988a0200A1F79Ae9b78590F92D357a16",
            TRUE_BYTES,
        ];
        console.log(transactionParameters);
        const transactionOptions = {
            abi: lensAbi,
            contractAddress: "0x60Ae865ee4C725cd04353b5AAb364553f56ceF82",
            functionName: "post",
            params: {
                vars: transactionParameters,
            },
        };

        await runContractFunction({
            onSuccess: (tx) => console.log(tx),
            onError: (error) => console.log(error),
            params: transactionOptions,})
    }

    return (
        <form onSubmit={handleSubmit(publishPost)}>
            <input placeholder="Post Title" name="contentName" {...register("contentName", {maxLength: 100, minLength: 1, required: true})} />

            <textarea placeholder="Write your article in markdown here!" name="content" {...register("content", {
                maxLength: 25000,
                minLength: 10,
                required: true,
            })} />

            <input placeholder="(Optinal) Image URI" name="imageUri" {...register("imageUri", {
                maxLength: 100,
                minLength: 1,
                required: false,
            })} />

            <input placeholder="(Optinal) Image Type" name="imageType" {...register("imageType", {
                maxLength: 100,
                minLength: 1,
                required: false,
            })} />

            <input placeholder="(Optinal) Pinata API Key" name="pinataApiKey" {...register("pinataApiKey", {
                maxLength: 100,
                minLength: 1,
                required: false,
            })} />

            <input placeholder="(Optinal) Pinata API Secret" name="pinataApiSecret" {...register("pinataApiSecret", {
                maxLength: 100,
                minLength: 1,
                required: false,
            })} />

            {errors ? <div>{errors.content.message}</div> : <div></div>}
            {profileId && token ? (
                <button type="submit">Publish</button>
            ) : (
                <div>You need to sign in, and need a lens handle! </div>
            )}
        </form>
    )
}

export default function WritePost() {
    return (
        <div>
            <PostForm />
        </div>
    )
}
