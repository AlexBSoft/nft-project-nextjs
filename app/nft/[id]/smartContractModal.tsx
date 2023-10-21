'use client'
import type { NextComponentType, NextPageContext } from "next";
{/* @ts-ignore */}
import SyntaxHighlighter from 'react-syntax-highlighter';
{/* @ts-ignore */}
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
interface Props {
    nft_id: string
}

const SmartContractModal: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    return (
        <div>
            {/* @ts-ignore */}
            <a className="tooltip" data-tip="Показать" onClick={() => document.getElementById('my_modal_2').showModal()}>
                <button className='btn'>Показать смарт контракт</button>
            </a>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Код смарт контракта</h3>
                    <SyntaxHighlighter language="javascript" style={docco}>
                        {`// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GameItem is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("NFTICTIS", "ICTIS") {
        awardItem(msg.sender, "https://nft.ictis.ru/nftdata/${props.nft_id}.json");
    }

    function awardItem(address player, string memory tokenURI)
        public
        returns (uint256)
    {
        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _tokenIds.increment();
        return newItemId;
    }
}`}
                    </SyntaxHighlighter>
                    <button className="btn w-full mt-4">Загрузить NFT в блокчейн</button>
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

export default SmartContractModal
