'use client'
import type { NextComponentType, NextPageContext } from "next";
import { BiSend } from "react-icons/bi";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import toast from 'react-hot-toast';
import { useState } from "react";
interface Props { nft_id: number }

const NftTransferModal: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const supabase = createClientComponentClient()
    const [to, setTo] = useState('')



    const sendNft = async () => {

        const {
            data: { user },
        } = await supabase.auth.getUser()

        const { data: nft, error } = await supabase
            .from('nfts').update({ owner: to }).eq('id', props.nft_id)

        if (error)
            toast.error(error.message)

        const { data: ddata, error: derror } = await supabase
            .from('transfers')
            .insert({ nft_id: props.nft_id, user_from: user?.id, user_to: to })
            .select()

        if (derror)
            toast.error(derror.message)
        if (!error && !derror)
            toast.success(`Отправлено ${to}`)

    }
    return (
        <div>
            {/* @ts-ignore */}
            <a className="tooltip" data-tip="Передать" onClick={() => document.getElementById('my_modal_1').showModal()}>
                <BiSend size='1.5rem' />
            </a>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Передать NFT</h3>
                    <div className="py-4">
                        <input type="text" placeholder="Пользователь" onChange={(e) => setTo(e.target.value)} className="input input-bordered w-full" />
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Закрыть</button>
                            <button className="btn" onClick={() => sendNft()}>Отправить</button>
                        </form>

                    </div>
                </div>
            </dialog></div>
    )
}

export default NftTransferModal