

export interface ArticleListItem {
    access_count: number,
    aid: number,
    comments_count: number,
    cover_img: string,
    create_date: number,
    head_img: string,
    modified_date: number,
    partial_content: string
    tags: ['学习记录', '技术分享', '生活记录', 'Linux'],
    title: string,
    uname: string
}


export interface Articles {
    aid: number;
    uid: number;
    createTime: number;
    title: string;
    content: string;
    modified: number;
    coverImg: string;
    comNumber: string;
    main: string;
    wtype: string;
    coverContent: string;
    accessCount: number;
}

//连接用户表
export interface ArticleUser {
    uid: number;
    uname: string;
    head_img: string;
    create_ip: string;
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

export interface ArticleData<T> {
    total: number,
    data: T,
}


export interface ArticleType {
    tid: number;
    name: string;
    whether_use: 0 | 1;
}

