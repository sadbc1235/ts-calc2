'use client'

import ReportContainer from "@/components/common/ReportContainer";
import Calendar from "@/components/home/Calendar";
import { fnGetDateNow, fnGetDayfirstDate, fnGetLastDate } from "@/script/constants";
import { useEffect, useState } from "react";

export default function Home() {
  const handle = {
    bindingCalendar: (dateMonth:string) => {
      const prevDateMonth = dateMonth.split('-')[0] +'-'+ ((+dateMonth.split('-')[1]) - 1 == 0 ? '12' : (+dateMonth.split('-')[1]) - 1 < 10 ? '0'+((+dateMonth.split('-')[1]) - 1) : (+dateMonth.split('-')[1]) - 1);
      const prevLastDate = fnGetLastDate(prevDateMonth);
      const currLastDate = fnGetLastDate(dateMonth);
      const dayIdx = fnGetDayfirstDate(dateMonth);

      let dateMap = [];
      let idx = 0;
      for(let i=(prevLastDate - dayIdx+1); i<=prevLastDate; i++) {
          dateMap.push({date: i, shadow: true, key: idx++, amt: 0, today: false, red: false});
      }
      for(let i=1; i<=currLastDate; i++) {
          dateMap.push({date: i, shadow: false, key: idx++, amt: 0, today: (fnGetDateNow('-') == ( dateMonth+'-'+(i < 10 ? '0'+i : i))), red: (0 > 3000000)});
      }
      const dateMapLength = 42-dateMap.length;
      for(let i=1; i<=dateMapLength; i++) {
          dateMap.push({date: i, shadow: true, key: idx++, today: false, red: false});
      }

      setDateList(dateMap);
    }
  }

  const [dateList, setDateList] = useState<any>([]);

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
              <td className="text-sm text-right pt-1 pb-1 pr-2">100,000 &#8361;</td>
            </tr>
            <tr>
              <td className="text-sm text-right pt-1 pb-1 pr-2">월 한도</td>
              <td className="text-sm text-right pt-1 pb-1 pr-2">3,000,000 &#8361;</td>
            </tr>
          </tbody>
        </table>
      </article>
    </ReportContainer>
  );
}
