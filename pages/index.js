import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getFollowing, apolloClient } from '../constants/lensConstants'

export default function Home() {
  const getPublicationsList = async function () {
    let followers;
    let followingIds = [];
    followers = await apolloClient.query ({
      query: getFollowing,
      variables: { request: {
        address: account
      }},
    })
  }
  return (
    <div className={styles.container}>
      Hello!
    </div>
  )
}
