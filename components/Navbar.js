import { ConnectButton } from "@web3uikit/web3"


export default function Navbar() {
    return (
        <ul>
            <li>Home</li>
            <li>Write Blog</li>
            <li>
                <div>
                    <ConnectButton moralisAuth={false}/>
                    Hello from Navbar!
                </div>
            </li>
        </ul>
    )
}