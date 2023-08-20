import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '../../components/LogoutButton'

import NftCreateForm from '@/components/NftCreateForm'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const dynamic = 'force-dynamic'


export default async function CreatePage() {
    const supabase = createServerComponentClient({ cookies })

    const {
        data: { user },
    } = await supabase.auth.getUser()

    

    return (
        <div className="w-full flex flex-col items-center">
            <Navbar />

            <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
                <div className="flex flex-col items-center mb-4 lg:mb-12">
                    <h1 className="sr-only">NFT конструктор</h1>
                    <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12">
                        Создание <strong>NFT</strong>
                    </p>

                    <NftCreateForm />


                </div>

                <Footer/>

            </div>
        </div>
    )
}
