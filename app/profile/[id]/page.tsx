import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import NftCard from '@/components/NftCard'

export const dynamic = 'force-dynamic'

export default async function profilePage({ params }: { params: { id: string } }) {
    const supabase = createServerComponentClient({ cookies })

    const {
        data: { user },
    } = await supabase.auth.getUser()


    const { data: nfts, error } = await supabase
        .from('nfts')
        .select().eq('owner', params.id)

    return (
        <div className="w-full flex flex-col items-center">
            <Navbar />
            <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
                <div className="flex flex-col items-center mb-4 lg:mb-12">
                    <h1 className="sr-only">NFT пользователя</h1>
                    <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12">
                        <strong>NFT</strong> пользователя
                    </p>
                    <div>
                        {nfts && <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {nfts?.map((nft) => (<NftCard nft={nft} />))}
                        </div>}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}
