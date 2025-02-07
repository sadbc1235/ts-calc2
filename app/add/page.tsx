'use client'

import { fnGetDateNow } from "@/script/constants";
import Link from "next/link";

export default function Add() {
    const tableStyle = {
        headTd: 'text-sm pr-2 pt-1 pb-1 bg-[#efefef]'
        , td: 'text-sm pl-2'
    }

  return (
    <section
        className="mt-[50px] pt-5"
    >
        <article className="pl-1 pr-1">
            <table
                className="w-full"
            >
                <colgroup>
                    <col className="w-[75px]" />
                    <col />
                </colgroup>
                <tbody>
                    <tr>
                        <td className={tableStyle.headTd+' text-right'}>사용자</td>
                        <td className={tableStyle.td}>
                            <select>
                                <option value=''>선택</option>
                                <option value=''>김은수</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className={tableStyle.headTd+' text-right'}>날짜</td>
                        <td className={tableStyle.td}>
                            <input type="date" value={fnGetDateNow('-')} onChange={(e) => {}}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </article>

        <article
            className="mt-2 pl-1 pr-1"
        >
            <table
                className="w-full"
            >
                <tbody>
                    <tr>
                        <td className={tableStyle.headTd+' text-center'}>영수증</td>
                    </tr>
                    <tr>
                        <td className={tableStyle.td+' h-[400px] flex items-center justify-center'}>
                            <div 
                                className="w-[45px] h-[45px] flex items-center justify-center p-2"
                                style={{border: '2px dashed #888'}}
                            >
                                <svg 
                                    viewBox="0 0 448 512"
                                    className="fill-[#888]"
                                >
                                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                                </svg>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </article>

        <article
            className="mt-2 pl-1 pr-1"
        >
            <table
                className="w-full"
            >
                <colgroup>
                    <col className="w-[75px]" />
                    <col />
                </colgroup>
                <tbody>
                    <tr>
                        <td className={tableStyle.headTd+' text-center'}>영수증</td>
                        <td className={tableStyle.td}>
                            <select>
                                <option value=''>선택</option>
                                <option value=''>100,00000</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </article>

        <article
            className="mt-4 grid grid-cols-2 gap-2 pl-1 pr-1"
        >
            <div
                className="text-sm p-1 border-[1px] border-[#b8b8b8] text-center"
            >
                <Link href='/'>취소</Link>
            </div>

            <input 
                type="button"
                value="저장"
                className="text-sm p-1 border-[1px] border-[#b8b8b8]"
            />
        </article>

        <article
            className="mt-4 grid grid-cols-1 pl-1 pr-1 hidden"
        >
            <input 
                type="button"
                value="BACK"
                className="text-sm p-1 border-[1px] border-[#b8b8b8]"
            />
        </article>
    </section>
  );
}
