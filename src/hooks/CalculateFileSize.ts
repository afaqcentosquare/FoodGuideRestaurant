function BytesToSize(bytes : number)
{
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))), 10)
    if (i === 0) return `${bytes} ${sizes[i]})`
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}

function ConvertTime(timeStamp : number)
{
    let hrs : any = 0;

    const h = Math.floor(timeStamp / 3600).toString().padStart(2,'0'),
      m = Math.floor(timeStamp % 3600 / 60).toString().padStart(2,'0'),
      s = Math.floor(timeStamp % 60).toString().padStart(2,'0');

    if(parseInt(h) == 0)
    {
       hrs = ''
    }
    else
    {
        hrs = h + ":"
    }

    return hrs  + m + ':' + s;
}

export default {
    BytesToSize,
    ConvertTime
}
