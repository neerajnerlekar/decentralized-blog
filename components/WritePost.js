import {useForm } from "react-hook-form"
import { useLensContext } from "../context/LensContext";
import { createContentMetadata } from "../constants/lensConstants";

function PostForm() {
    const {profileId, token} = useLensContext();
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
        let fullContentUri;
        const contentMetadata = createContentMetadata(
            content,
            contentName,
            imageUri,
            imageType
        );
        const metadataIpfsHash = await pinMetadataToPinata();
        return console.log("hi");
    }

    return (
        <form onSubmit={handleSubmit(publishPost)}>
            <input placeholder="Post Title" name="contentName" {...register("contentName", {maxLength: 100, minLength: 1, required: true})} />

            <textarea placeholder="Write your article in markdown here!" name="content" {...register("content", {
                maxLength: 25000,
                minLength: 10,
                required: true,
            })} />

            <input placeholder="(Optinal) Image URI" name="imageURI" {...register("imageURI", {
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
                <div>You need to sign in, or need a lens handle! </div>
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