
export interface Article {
    aid: number,
    commentsCount: number,
    createDate: number,
    modifiedDate: number,
    title: string,
    accessCount: number,
    head_img: string,
    partialContent: string
    tags: string[],
    uname: string

}

export interface ArticleDetail extends Article {
    content: string,
    headImg: string,
    main: string,
    signature: string,
}

//连接用户表
export interface ArticleUser {
    uid: number;
    uname: string;
    headImg: string;
    createIp: string;
    aid: number;
    createTime?: number;
    title: string;
    content: string;
    modified?: number;
    coverImg?: string;
    comNumber?: string;
    main?: string;
    wtype?: string;
    coverContent?: string;
    accessCount: number;
}

