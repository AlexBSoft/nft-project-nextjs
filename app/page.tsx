import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '../components/LogoutButton'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import NftCard from '@/components/NftCard'

export const dynamic = 'force-dynamic'

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Обращение к базе данных - получение списка NFT
  const { data: nfts, error } = await supabase
    .from('nfts') //table name
    .select("*") // выбираем все
    .order('id', { ascending: false }) // сортируем по id в обратном порядке
    .limit(25) // ограничиваемся 25 штуками

  return (
    <div className="w-full flex flex-col items-center">
      <Navbar />
      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="flex flex-col items-center mb-4 lg:mb-12">
          <h1 className="sr-only">NFT конструктор</h1>
          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12">
            <strong>NFT</strong> конструктор
          </p>
          <div className="py-3 px-6 rounded-lg font-mono text-sm">
            Создайте свой первый NFT
          </div>
          {user ? (
          <Link href="/create">
            <button className="btn mt-4 btn-primary">Создать NFT</button>
          </Link>):(
            <Link
            href="/login"
            className="">
            <button className="btn mt-4 btn-primary">Регистрация</button>
        </Link>
          )}
        </div>
        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
        <div className="flex flex-col gap-8 text-foreground">
          <h2 className="text-lg font-bold text-center">
            Недавние NFT на сайте
          </h2>
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
