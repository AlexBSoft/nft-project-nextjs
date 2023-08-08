import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '../components/LogoutButton'
import Navbar from '@/components/Navbar'

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
          {/* Вот тут сделать проверку залогинен ли юзер. Объект "user" уже есть в этом файле */}
          <Link href="/create">
            <button className="btn mt-4 btn-primary">Создать NFT</button>
          </Link>
        </div>

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <div className="flex flex-col gap-8 text-foreground">
          <h2 className="text-lg font-bold text-center">
            Недавние NFT на сайте
          </h2>
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
            ))}
          </div>
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
