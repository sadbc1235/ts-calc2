'use client'

import Loading from "@/components/common/Loading";
import ReportContainer from "@/components/common/ReportContainer";
import Calendar from "@/components/home/Calendar";
import { fnGetCurrencyCode, fnGetDateNow, fnGetDayfirstDate, fnGetLastDate } from "@/script/constants";
import { useEffect, useState } from "react";

export default function Home() {
  const handle = {
    bindingCalendar: async (dateMonth:string) => {
      setIsLoading(true);
      const prevDateMonth = dateMonth.split('-')[0] +'-'+ ((+dateMonth.split('-')[1]) - 1 == 0 ? '12' : (+dateMonth.split('-')[1]) - 1 < 10 ? '0'+((+dateMonth.split('-')[1]) - 1) : (+dateMonth.split('-')[1]) - 1);
      const prevLastDate = fnGetLastDate(prevDateMonth);
      const currLastDate = fnGetLastDate(dateMonth);
      const dayIdx = fnGetDayfirstDate(dateMonth);

      const amtList = await api.selectCalendarAmtList(prevDateMonth, dateMonth);
      
      const prevAmtList = amtList.filter((item:any) => item.spendDate.includes(prevDateMonth));
      const curAmtList = amtList.filter((item:any) => item.spendDate.includes(dateMonth));
      let totalAmt = 0;

      let dateMap = [];
      let idx = 0;
      for(let i=(prevLastDate - dayIdx+1); i<=prevLastDate; i++) {
        const amt = prevAmtList.filter((item:any) => (+item.spendDate.split('-')[2]) == i)[0]?.amt || 0;
        dateMap.push({date: i, shadow: true, key: idx++, amt, today: false, red: false});
      }
      for(let i=1; i<=currLastDate; i++) {
        const amt = curAmtList.filter((item:any) => (+item.spendDate.split('-')[2]) == i)[0]?.amt || 0;
        totalAmt += amt
        dateMap.push({date: i, shadow: false, key: idx++, amt, today: (fnGetDateNow('-') == ( dateMonth+'-'+(i < 10 ? '0'+i : i))), red: (0 > 3000000)});
      }
      const dateMapLength = 42-dateMap.length;
      for(let i=1; i<=dateMapLength; i++) {
        dateMap.push({date: i, shadow: true, key: idx++, today: false, red: false});
      }

      setDateList(dateMap);
      setTotalAmt(totalAmt+'');
      setIsLoading(false);
    }
  }

  const api = {
    selectCalendarAmtList: async (prevDate:string, curDate:string) => {
        const param = {
          prevDate: prevDate.replaceAll('-', '')
          , curDate: curDate.replaceAll('-', '')
        }
        const res = await fetch(
          '/api/selectCalendarAmtList', 
          {
            method: 'POST'
            , headers: { 'Content-Type': 'application/json' }
            , body: JSON.stringify({param: param})
          }
        );
        const result = await res.json();

        return result;
    }
  }

  const [isLoading, setIsLoading] = useState(false);
  const [dateList, setDateList] = useState<any>([]);
  const [totalAmt, setTotalAmt] = useState('0');

  useEffect(() => {
    handle.bindingCalendar(fnGetDateNow('-').substring(0, 7));
  }, []);

  return (
    <ReportContainer searchFn={handle.bindingCalendar}>

      <Calendar dateList={dateList}/>

      <article className="w-full mt-5">
        <table className="w-full">
          <colgroup>
            <col style={{width: '75px'}} />
            <col/>
          </colgroup>
          <tbody>
            <tr>
              <td className="text-sm text-right pt-1 pb-1 pr-2">총 지출</td>
              <td className="text-sm text-right pt-1 pb-1 pr-2">{fnGetCurrencyCode(totalAmt)} &#8361;</td>
            </tr>
            <tr>
              <td className="text-sm text-right pt-1 pb-1 pr-2">월 한도</td>
              <td className="text-sm text-right pt-1 pb-1 pr-2">3,000,000 &#8361;</td>
            </tr>
          </tbody>
        </table>
      </article>
      {isLoading && <Loading/>}
    </ReportContainer>
  );
}
