import { fnGetCurrencyCodeView } from "@/script/constants";

export default function Calendar(props:any) {
    const { dateList } = props;

    /** 캘린더 스타일 클래스 */
    const calendarStyleMap = {
        headDayStyle: "flex justify-center items-center h-[30px] text-xs border-b-[1px] border-r-[1px] border-[#b8b8b8]"
        , dayStyle: "h-[45px] text-xs border-b-[1px] border-r-[1px] border-[#b8b8b8] relative"
        , dateStyle: "w-[20px] flex justify-center items-center border-b-[1px] border-r-[1px] border-[#b8b8b8]"
        , dateAmtStyle: "w-full text-right absolute bottom-1 right-1"
    };

    return (
        <article
          className="w-full grid grid-cols-7"
        >
          <div className={`${calendarStyleMap.headDayStyle} text-[#ffb4b4]`}>일</div>
          <div className={calendarStyleMap.headDayStyle}>월</div>
          <div className={calendarStyleMap.headDayStyle}>화</div>
          <div className={calendarStyleMap.headDayStyle}>수</div>
          <div className={calendarStyleMap.headDayStyle}>목</div>
          <div className={calendarStyleMap.headDayStyle}>금</div>
          <div className={`${calendarStyleMap.headDayStyle} text-[#9f9fff]`}>토</div>
  
          {dateList.map((item:any) => (
            <div className={calendarStyleMap.dayStyle+' '+(item.shadow ? 'bg-[#bababa38]' : item.today ? 'border-[1px] border-[#9f9fff]' : item.red ? 'border-[1px] border-[#ffb4b4]' : '')} key={item.key}>
              <div className={calendarStyleMap.dateStyle}>{item.date}</div>
              <div className={calendarStyleMap.dateAmtStyle}>{fnGetCurrencyCodeView(item.amt)}</div>
            </div>
          ))}
        </article>
    );
}