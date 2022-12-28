import { ConnectButton } from "@web3uikit/web3"
import Link from "next/link"


export default function Navbar() {
    return (
        <ul>
            <Link href="/">
                <li>Home</li>
            </Link>
            <Link href="/write-blog">
                <li>Write Blog</li>
            </Link>
            <li>
                <div>
                    <ConnectButton moralisAuth={false}/>
                    
                </div>
            </li>
        </ul>
    )
}