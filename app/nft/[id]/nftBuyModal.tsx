'use client'
import type { NextComponentType, NextPageContext } from "next";
import { BiSend } from "react-icons/bi";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import toast from 'react-hot-toast';
import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
interface Props { nft_id: number, nft: any }

const NftBuyModal: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const supabase = createClientComponentClient()
    const [to, setTo] = useState('')



    const buyNft = async () => {

      
        toast.error("Недостаточно средств")

    }
    return (
        <div>
            {/* @ts-ignore */}
            <a className="tooltip" data-tip="Купить" onClick={() => document.getElementById('my_modal_buy').showModal()}>
                <FaCartShopping size='1.5rem' />
            </a>

            <dialog id="my_modal_buy" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Приобрести NFT</h3>
                    <div className="py-4">
                        <p className="text-lg">Цена: <b>{props.nft.price}</b> CBAK</p>

                        <p className="text-lg">Ваш баланс: <b>0</b> CBAK</p>

                        
                        <button className="btn w-full mt-4" onClick={() => buyNft()}>Приобрести</button>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Закрыть</button>
                        </form>

                    </div>
                </div>
            </dialog></div>
    )
}

export default NftBuyModal