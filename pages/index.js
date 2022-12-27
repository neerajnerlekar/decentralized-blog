import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getFollowing, apolloClient,getPublications, getPublicationsQueryVariables } from '../constants/lensConstants'

let profileIdList = ["0x01517e"]

export default function Home() {
  const getPublicationsList = async function () {
    let followers;
    let followingIds = [];
    followers = await apolloClient.query ({
      query: getFollowing,
      variables: { request: {
        address: account
      }},
    });
    followingIds = followers.data.following.items.map((f) => f.profile.id);

    profileIdList = profileIdList.concat(followingIds);
    const publications = await apolloClient.query({
      query: getPublications,
      variables: getPublicationsQueryVariables(profileIdList)
    });
    return publications;
  }
  return (
    <div className={styles.container}>
      Hello!
    </div>
  )
}
