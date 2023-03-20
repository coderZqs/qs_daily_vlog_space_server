export type LoginParams = {
  mobile: string;
  password: string;
};

export type RegisterParams = {};

export interface UserParams {
  id?: number;
  username: string;
  password: string;
  mobile: number;
}

export interface BlogParams {
  title: string;
  category: string;
  content: string;
  created_at: string;
  user_id?: number;
}

export interface CommentParams {
  content: string;
  belong_id: number;
  type: CommentType;
  user_id?: number;
}

export interface InvitationParams {
  id?: number;
  user_id: number;
  apply_user_id: number;
  status: InvitationType;
  created_at: string;
  message?: string;
}

export enum InvitationType {
  agree = 1,
  reject = 2,
}

export enum CommentType {
  comment = 1,
  reply = 2,
}

export interface User {
  mobile: string;
}

export enum ChatCateogryType {
  group = 1,
  friend = 2,
}

export enum MsgType {
  TEXT = 1,
  PICTURE = 2,
  VOICE = 3,
}

export interface ChatType {
  content: string;
  belong_id: number;
  created_at: string;
  to_id: number;
  msg_type: MsgType;
  category: number;
}
