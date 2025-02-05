import { fnGetDateNow } from "@/script/constants";

export default function ReportContainer(props:any) {
    const { children, searchFn } = props;

    return (
        <section
              className="mt-[50px] pt-5"
            >
              <article
                className="w-full flex justify-end"
              >
                <input
                  type="month"
                  defaultValue={fnGetDateNow('-').substring(0, 7)}
                  className="text-xs border-t-[1px] border-l-[1px] border-[#b8b8b8] p-1"
                  onChange={(e) => searchFn(e.target.value)}
                />
              </article>
              {children}
        </section>
    );
}