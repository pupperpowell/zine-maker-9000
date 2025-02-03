import Link from 'next/link'

export default function NotFound() {
    return (
        <div>
            The page you tried to access doesn&#39;t exist<br /><br />
            <Link href="/">Return Home</Link>
        </div>
    )
}