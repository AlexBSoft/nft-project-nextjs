import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'
import Navbar from '@/components/Navbar'

import type { NftTypeDB, Transfer } from "@/types/nft.type"
import Footer from '@/components/Footer'

export const dynamic = 'force-dynamic'

import { BiSend } from "react-icons/bi";
import { FaCartShopping } from "react-icons/fa6"
import NftTransferModal from './nftTransferModal'
import SmartContractModal from './smartContractModal'
import NftBuyModal from './nftBuyModal'

export default async function NftPage({ params }: { params: { id: string } }) {
    const supabase = createServerComponentClient({ cookies })

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Получение NFT из БД
    const { data: nft, error } = await supabase
        .from('nfts')
        .select<string, NftTypeDB>().eq('id', params.id)

    // Получение истории NFT из БД
    const { data: transfers, error: terror } = await supabase
        .from('transfers')
        .select<string, Transfer>().eq('nft_id', params.id)

    return (
        <div className="w-full flex flex-col items-center">
            <Navbar />
            <div className="animate-in flex flex-col gap-14 opacity-0 px-3 py-16 lg:py-24 text-foreground">
                {nft && nft.length > 0 && nft[0]?.id ? (<>
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="flex flex-col items-center mb-4 ">
                            <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12">
                                <strong>NFT</strong> #{nft[0].id}
                            </p>
                            <figure>
                                <img className="h-64" src={`https://ehruraasnyjkzwhvetmu.supabase.co/storage/v1/object/public/images/${nft[0].file}`} height="128" alt="NFT image" />
                            </figure>
                            <div className="card-body items-center text-center">

                                <h2 className="card-title">
                                    <span>{nft[0].name}</span>
                                </h2>

                                <span>Описание: {nft[0].description}</span>

                                <span>Цена: <b>{nft[0].price}</b> CBAK</span>

                                <span>Создан: <p>{nft[0].created_at}</p></span>

                                <span>Создатель:
                                    <Link href={"/profile/" + nft[0].creator} className='btn btn-ghost'>
                                        <img src={`https://avatars.dicebear.com/api/male/${nft[0].creator}.svg`} style={{ height: '16px', display: 'inline', marginBottom: "0.25em" }} />
                                        {nft[0].creator}
                                    </Link>
                                </span>

                                <span>Владелец:
                                    <Link href={"/profile/" + nft[0].owner} className='btn btn-ghost'>
                                        <img src={`https://avatars.dicebear.com/api/male/${nft[0].owner}.svg`} style={{ height: '16px', display: 'inline', marginBottom: "0.25em" }} />
                                        {nft[0].owner}
                                    </Link>
                                </span>

                            </div>
                            <ul className="menu menu-horizontal bg-base-200 rounded-box my-4">
                                <li>
                                    <NftTransferModal nft_id={Number(params.id)} />
                                </li>
                                <li>
                                    <NftBuyModal nft_id={Number(params.id)} nft={nft[0]} />
                                    
                                </li>
                            </ul>

                            NFT не загружен в блокчейн
                            <SmartContractModal nft_id={params.id}/>
                            
                        </div>
                    </div>
                </>
                ) : (<strong className='flex justify-center'>NFT не найден</strong>)}


                {transfers?.map((transfer) => (<div> {transfer.created_at} Передан <br /> От: {transfer.user_from}<br /> К: {transfer.user_to}</div>))}
            </div>
            <Footer />
        </div>
    )
}
