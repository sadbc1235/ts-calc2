'use client'

import { fnGetCurrencyCode } from "@/script/constants";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ReportEmp({params, searchParams}:any) {

    const api = {
        selectEmpDateAmtList: async (dateMonth:string) => {
            const param = {
                empSeq: params.empSeq
                , date: dateMonth.replaceAll('-', '')
            }
            const res = await fetch(
                '/api/selectEmpDateAmtList', 
                {
                    method: 'POST'
                    , headers: { 'Content-Type': 'application/json' }
                    , body: JSON.stringify({param: param})
                }
            );
            const result = await res.json();
    
            setAmtList(result);
            const totalAmt = result.reduce((a:number, b:any) => a += (+b.amt), 0);
            setTotalAmt(totalAmt);
        }
    }

    const [amtList, setAmtList] = useState([]);
    const [totalAmt, setTotalAmt] = useState('0');

    useEffect(() => {
        api.selectEmpDateAmtList(searchParams.dateMonth);
    }, []);

  return (
    <section
        className="mt-[50px] pt-5"
    >
        <article
            className="w-full flex justify-between border-b-[1px] border-[#b8b8b8]"
        >
            <div
                className="text-center text-xs underline w-[50px] border-t-[1px] border-r-[1px] border-[#b8b8b8] p-1"
            >
                
                <Link href='/report'>BACK</Link>
            </div>
            <div
                className="text-center text-xs w-[75px] border-t-[1px] border-r-[1px] border-l-[1px] border-[#b8b8b8] p-1"
            >
                {searchParams.empName}
            </div>
            <input
                type="month"
                defaultValue={searchParams.dateMonth}
                className="text-xs border-t-[1px] border-l-[1px] border-[#b8b8b8] p-1"
                onChange={(e) => api.selectEmpDateAmtList(e.target.value)}
            />
        </article>
        <article
            className="w-full pt-2 pl-1 pr-1 grid grid-cols-1 gap-2"
        >
            <div className="w-full text-sm border-[1px] border-[#b8b8b8] grid grid-cols-2">
                <div className="w-[100px] text-center pt-1 pb-1 border-r-[1px] border-[#b8b8b8]">총 금액</div>
                <div className="text-right pt-1 pb-1 pr-2">{fnGetCurrencyCode(totalAmt)} &#8361;</div>
            </div>
            {amtList.map((item:any) => (
            <div className="w-full text-sm border-[1px] border-[#b8b8b8] grid grid-cols-2" key={item.resSeq}>
                <div className="w-[100px] text-center pt-1 pb-1 border-r-[1px] border-[#b8b8b8]">{item.spendDate}</div>
                <div className="text-right pt-1 pb-1 pr-2">{fnGetCurrencyCode(item.amt)} &#8361;</div>
            </div>
            ))}
        </article>
    </section>
  );
}
