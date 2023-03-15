export type LoginParams = {
  mobile: string;
  password: string;
};

export type RegisterParams = {};

export interface UserParams {
  username: string;
  password: string;
  mobile: number;
}

export type BlogParams = {
  title: string;
  category: string;
  content: string;
  created_at: string;
};

export type User = {
  mobile: string;
};
