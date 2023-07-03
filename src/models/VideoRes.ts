export type VideoRes = {
    edges : videoObj[]
}

export type videoObj = {
    "ctime":number,
    "mtime":string,
    "name":string,
    "path":string,
    "size":number
   /* "node" : nodeObj*/
}

export type nodeObj = {
    "location": string,
    "modified": number,
    "group_name": string,
    "timestamp": number,
    "type": string,
    "image": imageObj
}

export type imageObj = {
    "filename": string,
    "fileSize": number,
    "playableDuration": number,
    "height": number,
    "width": number,
    "uri": string
}
