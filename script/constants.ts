export const API_URL = 'https://nomad-movies.nomadcoders.workers.dev/movies';

export function fnGetDateFormat(date:string) {
    date = ( date || '' ).replace(/[^0-9]/gi, '');
    if (!date) {
        return '';
    } else if (date.length == 6) {
        return date.substring(0, 4) + '-' + date.substring(4, 6);
    } else if (date.length == 8) {
        return date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8);
    }
}

export function fnGetDateNow(hipen:string) {
    var now = new Date();

    var year = '' + now.getFullYear();
    var month = '' + ((now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1));
    var day = '' + (now.getDate() < 10 ? '0' + (now.getDate()) : (now.getDate()));

    return '' + year + hipen + month + hipen + day;
}

export function fnGetDayfirstDate(date:string) {
    const dateArr = date.split('-');
    let day = new Date( dateArr[0] + '-' + dateArr[1] + '-01' ).getDay();
    return day;
}


export function fnGetLastDate(date:string) {
    const dateArr = date.split('-');
    const lastDate = new Date((+dateArr[0]), (+dateArr[1]), 0);

    return lastDate.getDate();
}

export function fnGetCurrencyCode(value:string) {
    if (!value) {
        return '0';
    } else {
        return ('' + value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

export function fnGetCurrencyCodeView(value:string) {
    if (!value) {
        return '0';
    } else {
        return ('' + value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

export function callPostApi(url:string, param:any, setFn:any) {
    fetch(url, {
            method: 'POST'
            , headers: { 'Content-Type': 'application/json' }
            , body: JSON.stringify(param)
        })
        .then((res) => res.json())
        .then(data => setFn(data));
}

export function callAttachApi(url:string, formData:any, setFn:any) {
    fetch(url, {
            method: 'POST'
            , body: formData
        })
        .then((res) => res.json())
        .then(data => setFn(data));
}