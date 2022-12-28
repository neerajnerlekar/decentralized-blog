import {useForm } from "react-hook-form"

function PostForm() {
    const { register, errors, handleSubmit, formState, reset, watch } = useForm({
        mode: "onChange",
    });

    const publishPost = async function () {
        return null;
    }

    return (
        <form onSubmit={handleSubmit(publishPost)}>
            <input placeholder="Post Title" name="contentName" {...register("contentName", {maxLength: 100, minLength: 1, required: true})} />

            <textarea placeholder="Write your article in markdown here!" name="content" {...register("content", {
                maxLength: 25000,
                minLength: 10,
                required: true,
            })} />
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