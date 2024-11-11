export interface Comment {
  articleId: number;
  browserSystem: string;
  commentId: number;
  content: string;
  deviceSystem: string;
  email: string;
  groundId: number;
  headImg: string;
  replyId: number;
  createDate: number;
  userIp: string;
  userName: string;
}

export interface CommentsType {
  content: string,
  aid: number,
  replyId: number,
  groundId: number,
  email: string,
  name: string,
  userIp: string,
  webSite?: string,
  imgIndex: number,
  replyPeople: string
}

export interface Replydata {
  commentId: number,
  headImg: string,
  userName: string,
  createDate: string,
  content: string,
  replyPeople: string,
  replyId: number,
  groundId: number,
  children: Replydata[],
  browserSystem: string,
  deviceSystem: string,
  userIp: string
}
