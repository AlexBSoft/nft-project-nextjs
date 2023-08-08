import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'
import Navbar from '@/components/Navbar'

export const dynamic = 'force-dynamic'

export default async function profilePage({ params }: { params: { id: string } }) {
    const supabase = createServerComponentClient({ cookies })

    const {
        data: { user },
    } = await supabase.auth.getUser()


    const { data: nfts, error } = await supabase
        .from('nfts')
        .select().eq('owner', params.id)

    console.log(nfts)


    return (
        <div className="w-full flex flex-col items-center">
            <Navbar />

            <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
                <div className="flex flex-col items-center mb-4 lg:mb-12">
                    <h1 className="sr-only">NFT пользователя</h1>
                    <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12">
                        <strong>NFT</strong> пользователя
                    </p>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {nfts?.map(({ id, name, file, description, price, createdAt, owner }) => (
                        <Link
                            key={id}
                            className="relative flex flex-col group "
                            href={`/nft/${id}`}
                        >
                            <div className="card bg-base-100 shadow-sm hover:shadow-xl">
                                <figure>
                                    <img className="h-64" src={`https://ehruraasnyjkzwhvetmu.supabase.co/storage/v1/object/public/images/${file}`} alt="NFT" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{name}</h2>
                                    <p>{description}</p>
                                    <div className="card-actions justify-end">
                                        <div className="badge badge-outline">{price} CBAK</div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}</div>
                </div>



                <div className="flex justify-center text-center text-xs">
                    <p>
                        Создано в Таганроге
                    </p>
                </div>
            </div>
        </div>
    )
}
