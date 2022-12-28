import { ConnectButton } from "@web3uikit/web3"
import Link from "next/link"


export default function Navbar() {
    return (
        <ul>
            <Link href={`/`}>
                <li>Home</li>
            </Link>
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