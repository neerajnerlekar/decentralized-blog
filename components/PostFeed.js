export default function PostFeed({posts}) {
    return (
            <div>
                {posts 
                    ? posts.map((post) => <PostItem post={post} key={post.id} />) 
                    : null}
            </div>
        )
}

function PostItem({post}) {
    let imageURL;

    if(post.metadata.image) {
        /* Most browsers don't render ipfs.
            So, replacing ipfs with ipfs gateway using https://ipfs.io/ipfs*/
        imageURL = post.metadata.image.replace("ipfs://", "https://ipfs.io/ipfs");
    }

    return (
        <div>
            <img src={imageURL} />
            <h2>{post.metadata.name}</h2>
        </div>
    )
}