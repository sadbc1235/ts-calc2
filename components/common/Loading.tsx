'use client'

export default function Loading() {
    return (
        <div className='absolute top-0 right-0 w-full h-full z-11 bg-[#81818160] flex justify-center items-center'>
            <div
                className="bg-[#fff] rounded-[50%] overflow-hidden flex justify-center items-center"
                style={{boxShadow: '0px 0px 15px #fff'}}
            >
                <img src="/loading.gif" className="object-cover" />
            </div>
        </div>
    );
}