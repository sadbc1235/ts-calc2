'use client'

import Loading from "@/components/common/Loading";
import { fnGetCurrencyCode } from "@/script/constants";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Res({params, searchParams}:any) {

    const tableStyle = {
        headTd: 'text-sm pr-2 pt-1 pb-1 bg-[#efefef]'
        , td: 'text-sm pl-2'
    }

    const api = {
        selectResInfo: async () => {
            setIsLoading(true);
            const res = await fetch(
                '/api/selectResInfo', 
                {
                    method: 'POST'
                    , headers: { 'Content-Type': 'application/json' }
                    , body: JSON.stringify({resSeq: params.resSeq})
                }
            );
            const result = await res.json();
            setResInfo(result[0]);
            setIsLoading(false);
        }
    }

    const [isLoading, setIsLoading] = useState(false);
    const [resInfo, setResInfo] = useState<ResInfo>({
        empName: '',
        spendDate: '',
        empSeq: '',
        imgName: '',
        amt: ''
    });

    interface ResInfo {
        empName: string;
        spendDate: string;
        empSeq: string;
        imgName: string;
        amt: string;
    }

    useEffect(() => {
        api.selectResInfo();
    }, []);

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
                            {resInfo.empName}
                        </td>
                    </tr>
                    <tr>
                        <td className={tableStyle.headTd+' text-right'}>날짜</td>
                        <td className={tableStyle.td}>
                            {resInfo.spendDate}
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
                        <td className={tableStyle.td+' h-[400px] flex items-center justify-center relative'}>
                            <div
                                className={"w-full h-full p-2"}
                            >
                                <img className="w-full h-full object-contain" src={`/api/attachments/${resInfo.empSeq}/${resInfo.imgName}`} />
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
                            <div>{fnGetCurrencyCode(resInfo.amt)}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </article>

        <article
            className="mt-4 grid grid-cols-1 pl-1 pr-1"
        >
            <div
                className="text-sm p-1 border-[1px] border-[#b8b8b8] text-center"
            >
                <Link href={`/report/${resInfo.empSeq}?empName=${resInfo.empName}&dateMonth=${resInfo.spendDate.substring(0, 7)}`}>BACK</Link>
            </div>
        </article>
        {isLoading && <Loading/>}
    </section>
  );
}
