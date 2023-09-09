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
                        {`// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TestToken is ERC721, ReentrancyGuard, Ownable {
  using Counters for Counters.Counter;

  constructor(string memory customBaseURI_) ERC721("TestToken", "TTKN") {
    customBaseURI = customBaseURI_;
  }

  /** MINTING **/

  uint256 public constant MAX_SUPPLY = 1000;

  Counters.Counter private supplyCounter;`}
                    </SyntaxHighlighter>
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