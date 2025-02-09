'use client'

import Loading from "@/components/common/Loading";
import { fnGetCurrencyCode, fnGetDateNow } from "@/script/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Add() {
    const router = useRouter();

    const tableStyle = {
        headTd: 'text-sm pr-2 pt-1 pb-1 bg-[#efefef]'
        , td: 'text-sm pl-2'
    }

    const handle = {
        setBill: (e) => {
            setIsLoading(true);
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                let img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    const blobImg = handle.compressImg(img);    
                    api.uploadBill(blobImg);
                }
            }

            reader.readAsDataURL(file);
        }
        , addBill: () => {
            if(!empSeq) {
                return alert('사용자를 선택하세요.');
            }
            fileRef?.current?.click();
        }
        , compressImg: (img) => {
            const maxSize = 500;

            let width = img.width;
            let height = img.height;
            if (width > maxSize) {
                height *= maxSize / width;
                width = maxSize;
            }

            //canvas에 이미지 객체를 리사이징해서 담는 과정
            let canvas = document.createElement("canvas");
            canvas.width = width; //리사이징하여 그릴 가로 길이
            canvas.height = height; //리사이징하여 그릴 세로 길이
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.drawImage(img, 0, 0, width, height);
            } else {
                console.error("2D context not supported or canvas is already initialized.");
            }
        
            //canvas의 dataurl를 blob(file)화 하는 과정
            let dataURI = canvas.toDataURL("image/jpeg"); //png => jpg 등으로 변환 가능
            var bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
                atob(dataURI.split(',')[1]) :
                unescape(dataURI.split(',')[1]);
            var mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
            var max = bytes.length;
            var ia = new Uint8Array(max);
            for (var i = 0; i < max; i++) {
                ia[i] = bytes.charCodeAt(i);
            }

            return new Blob([ia], { type: 'image/jpeg'});
        }
    }

    const api = {
        selectEmpList: async () => {
            const res = await fetch(
                '/api/selectEmpList', 
                {
                    method: 'POST'
                    , headers: { 'Content-Type': 'application/json' }
                    , body: JSON.stringify({})
                }
            );
            const result = await res.json();
            setEmpList(result);
        }
        , uploadBill: async (blobImg) => {
            let formdata = new FormData();
            formdata.append("empSeq", empSeq);
            formdata.append("file", blobImg);

            const res = await fetch(
                '/api/upload', 
                {
                    method: 'POST'
                    , body: formdata
                }
            );
            const result = await res.json();

            if(result.state == 'success') {
                setBillInfo(result);
                if(result.ocrInfo.state == 'fail') {
                    alert('텍스트 추출 실패했습니다.');
                } else {
                    if(!!result.ocrInfo.amtList.length) {
                        setAmtList(result.ocrInfo.amtList);
                        setAmt(result.ocrInfo.amtList[0].amt);
                    }
                }
            } else {
                alert('오류가 발생하였습니다.');
                return;
            }
            setIsLoading(false);
        }
        , delBill: async () => {
            const param = {
                empSeq: billInfo.empSeq
                , imgName: billInfo.imgName
            }
            await fetch(
                '/api/delFile', 
                {
                    method: 'POST'
                    , headers: { 'Content-Type': 'application/json' }
                    , body: JSON.stringify(param)
                }
            );

            if (fileRef.current) {
                fileRef.current.value = '';
            }
            setBillInfo({});
            setAmtList([]);
            setAmt('');
        }
        , insertRes: async () => {
            if(!empSeq) {
                alert('사용자를 선택하세요.');
                return;
            }
            if(!billInfo?.imgName) {
                alert('영수증을 첨부하세요.');
                return;
            }
            if(!amt) {
                alert('금액을 입력하세요.');
                return;
            }
            
            setIsLoading(true);

            const param = {
                empSeq
                , spendDate: spendDate.replaceAll('-', '')
                , amt: amt.replaceAll(',', '')
                , imgName: billInfo.imgName
            }
            await fetch(
                '/api/insertRes', 
                {
                    method: 'POST'
                    , headers: { 'Content-Type': 'application/json' }
                    , body: JSON.stringify({param})
                }
            );   
            setIsLoading(false);
            const empName = empList.filter((item) => item.empSeq == empSeq)[0]?.empName || '';
            router.push(`/report/${empSeq}?empName=${empName}&dateMonth=${spendDate.substring(0, 7)}`);
        }
    }

    const [isLoading, setIsLoading] = useState(false);
    const [empSeq, setEmpSeq] = useState('');
    const [empList, setEmpList] = useState([]);
    const [spendDate, setSpendDate] = useState(fnGetDateNow('-'));
    const [billInfo, setBillInfo] = useState({});
    const [amtList, setAmtList] = useState([]);
    const [amt, setAmt] = useState('');

    const fileRef = useRef(null);

    useEffect(() => {
        api.selectEmpList();
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
                            <select value={empSeq} onChange={(e) => {console.log(e); setEmpSeq(e.target.value)}}>
                                <option value=''>선택</option>
                                {empList.map((item) => (
                                    <option value={item.empSeq}>{item.empName}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className={tableStyle.headTd+' text-right'}>날짜</td>
                        <td className={tableStyle.td}>
                            <input type="date" value={spendDate} onChange={(e) => setSpendDate(e.target.value)}/>
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
                            <svg 
                                className={"w-[24px] h-[24px] absolute top-3 right-3 z-10 "+(!!billInfo?.imgName ? 'block' : 'hidden')}
                                viewBox="0 0 24 24" stroke="currentColor" focusable="false" style={{transform: 'rotate(90deg)'}}
                                onClick={api.delBill}
                            >
                                <g transform="translate(12,12)">
                                    <path d="M-9 -5 L9 -5" fill="none" stroke-width="2" style={{transform: 'rotate(45deg) translate(0, 5px)'}}></path>
                                    <path d="M-9 0 L9 0" fill="none" stroke-width="2" style={{opacity: 0}}></path>
                                    <path d="M-9 5 L9 5" fill="none" stroke-width="2" style={{transform: 'rotate(135deg) translate(0, -5px)'}}></path>
                                </g>
                            </svg>
                            <input 
                                ref={fileRef} 
                                accept="image/*" 
                                type="file" 
                                onChange={handle.setBill} 
                                className="hidden"
                            />
                            <div 
                                className={"w-[45px] h-[45px] flex items-center justify-center p-2 "+(!!billInfo?.imgName ? 'hidden' : 'flex')}
                                style={{border: '2px dashed #888'}}
                                onClick={handle.addBill}
                            >
                                <svg 
                                    viewBox="0 0 448 512"
                                    className="fill-[#888]"
                                >
                                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                                </svg>
                            </div>
                            
                            {!!billInfo?.imgName && <div
                                className={"w-full h-full p-2"}
                            >
                                <img className="w-full h-full object-contain" src={`/api/attachments/${billInfo.empSeq}/${billInfo.imgName}`} />
                            </div>}
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
                            <div className={(!billInfo?.imgName ? 'block' : 'hidden')}>영수증을 첨부하세요.</div>
                            <select
                                className={(!!amtList.length ? 'block' : 'hidden')}
                                defaultValue={''}
                                value={amt}
                                onChange={(e) => {
                                    if(e.target.value == '직접입력') {
                                        setAmtList([]);
                                        setAmt('');
                                    } else {
                                        setAmt(e.target.value);
                                    }
                                }}  
                            >
                                <option value=''>선택</option>
                                {amtList.map((item) => (
                                    <option key={item.key} value={item.amt}>{item.amt}</option>
                                ))}
                                <option value='직접입력'>직접입력</option>
                            </select>
                            <input 
                                className={"w-[250px] "+(!amtList.length && !!billInfo?.imgName ? 'block' : 'hidden')}
                                type="text" 
                                placeholder="금액 을 입력하세요."
                                value={amt}
                                onChange={(e) => {
                                    setAmt(fnGetCurrencyCode(e.target.value.replace(/[^\d.-]/g, ''))); 
                                }}
                            />
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
                onClick={api.insertRes}
            />
        </article>
        {isLoading && <Loading/>}
    </section>
  );
}
