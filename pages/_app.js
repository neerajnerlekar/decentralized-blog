import '../styles/globals.css'
import Navbar from '../components/Navbar'
import { MoralisProvider } from 'react-moralis'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '../constants/lensConstants'
import { LensProvider } from '../context/LensContext'

export default function App({ Component, pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <ApolloProvider client={apolloClient}>
        <LensProvider>
          <Navbar />
          <Component {...pageProps} />
        </LensProvider>
      </ApolloProvider>
    </MoralisProvider>
  )
}
