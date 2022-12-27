import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getFollowing, apolloClient,getPublications, getPublicationsQueryVariables } from '../constants/lensConstants'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import PostFeed from '../components/PostFeed'

let profileIdList = ["0x01517e"]

export default function Home() {
  const [pubs, setPubs] = useState();
  const {account} = useMoralis();

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
  };

  useEffect(() => {
      if(account) {
      getPublicationsList().then((publications) => {
        console.log(publications);
        setPubs(publications);
      })
    }
  }, [account]);

  return (
    <div>
      <div>Decentralized Blog!</div>
      {!pubs ? <div> Loading...</div> : <PostFeed posts={pubs.data.publications.items}/>}
    </div>
  )
}
