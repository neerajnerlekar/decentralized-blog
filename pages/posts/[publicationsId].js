export async function getStaticPaths() {
    const paths = [{ params: { posts: "post", publicationId: "0x73b1-0x034c"}}];
    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps({params}) {
    const {publicationId} = params;
    return {
        props: {
            publicationId,
        },
    };
}

export default function ReadPost(props) {
    const {publicationId} = props;
    return (
        <div>
            <div>Hi from readpost!</div>
        </div>
    )
}
