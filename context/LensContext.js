import { useState, createContext, useContext } from "react";
import { challenge, apolloClient, authenticate } from "../constants/lensConstans";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";

export const LensContext = createContext();

// this is how other apps are always going to the know the profileId
export const useLensContext = () => {
    return useContext(LensContext);
}

export function LensProvider({children}) {
    const [profileId, useProfileId ] = useState();
    const [token, setToken] = useState();

    // when we signed in using web3uikit, react-moralis kept a track of the connected account
    const {account} = useMoralis()

    const signIn = async function () {
        try {
            /* first request the challenge from the API server */
            const challengeInfo = await ApolloClient.query({
                query: challenge,
                variable: {address: account}
            })
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            /* ask the user to sign a message with the challenge info returned from the server */
            const signature = await signer.signMessage(challengeInfo.data.challenge.text)
            /* authenticate the user */
            const authData = await apolloClient.mutate({
                mutation: authenticate,
                variables: {
                address: account,
                signature,
                },
            })
            /* if user authentication is successful, you will receive an accessToken and refreshToken */
            const { data: { authenticate: { accessToken }}} = authData
            console.log({ accessToken })
            setToken(accessToken)
        } catch (error) {
            console.log("Error signing in ", error)
        }
    }
    return (
        <LensContext.Provider value={{profileId, token}}>
            {children}
        </LensContext.Provider>
    )
}

