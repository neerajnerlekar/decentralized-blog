import '../styles/globals.css'
import Navbar from '../components/Navbar'
import { MoralisProvider } from 'react-moralis'

export default function App({ Component, pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false}>
     <Navbar />
     <Component {...pageProps} />
    </MoralisProvider>
  )
}
