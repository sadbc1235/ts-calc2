'use client'

import ReportContainer from "@/components/common/ReportContainer";
import { fnGetCurrencyCode, fnGetDateNow } from "@/script/constants";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Report() {

  const api = {
    selectEmpAmtList: async (dateMonth:string) => {
      const param = {
        date: dateMonth.replaceAll('-', '')
      }
      const res = await fetch(
        '/api/selectEmpAmtList', 
        {
          method: 'POST'
          , headers: { 'Content-Type': 'application/json' }
          , body: JSON.stringify({param: param})
        }
      );
      const result = await res.json();

      setEmpAmtList(result);
      const totalAmt = result.reduce((a:number, b:any) => a += (+b.totalAmt), 0);
      setTotalAmt(totalAmt);
    }
  }

  const [empAmtList, setEmpAmtList] = useState([]);
  const [totalAmt, setTotalAmt] = useState('0');
  const [dateMonth, setDateMonth] = useState(fnGetDateNow('-').substring(0, 7));

  useEffect(() => {
    api.selectEmpAmtList(fnGetDateNow('-').substring(0, 7));
  }, []);

  return (
    <ReportContainer searchFn={api.selectEmpAmtList} setDateMonth={setDateMonth}>
      <article
        className="w-full pt-2 pl-1 pr-1 grid grid-cols-1 gap-2"
      >
        <div className="w-full text-sm border-[1px] border-[#b8b8b8] grid grid-cols-2">
          <div className="w-[75px] text-center pt-1 pb-1 border-r-[1px] border-[#b8b8b8]">총 금액</div>
          <div className="text-right pt-1 pb-1 pr-2">{fnGetCurrencyCode(totalAmt)} &#8361;</div>
        </div>
        {empAmtList.map((item:any) => (
        <Link href={`/report/${item.empSeq}?empName=${item.empName}&dateMonth=${dateMonth}`} key={item.empSeq}>
          <div className="w-full text-sm border-[1px] border-[#b8b8b8] grid grid-cols-2">
            <div className="w-[75px] text-center pt-1 pb-1 border-r-[1px] border-[#b8b8b8]">{item.empName}</div>
            <div className="text-right pt-1 pb-1 pr-2">{fnGetCurrencyCode(item.totalAmt)} &#8361;</div>
          </div>
        </Link>
        ))}
      </article>
    </ReportContainer>
  );
}
