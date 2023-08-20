import Link from 'next/link'
interface Nft {
  id: string;
  name: string;
  file: string;
  description: string;
  price: string;
  createdAt: string;
  owner: string;
}
export default function NftCard({ nft }: { nft: Nft }) {
  return (

    <Link
      key={nft.id}
      className="relative flex flex-col group "
      href={`/nft/${nft.id}`}
    >
      <div className="card bg-base-100 shadow-sm hover:shadow-xl">
        <figure>
          <img className="h-64" src={`https://ehruraasnyjkzwhvetmu.supabase.co/storage/v1/object/public/images/${nft.file}`} alt="NFT" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{nft.name}</h2>
          <p>{nft.description}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">{nft.price} CBAK</div>
          </div>
        </div>
      </div>
    </Link>

  )
}