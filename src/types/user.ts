export interface IUser {
  id: number;
  image: string;
  name: string;
  email: string;
  role: string;
  date: Date;
  address: string;
  tel: string;
  skills: string[];
  aboutMe: string;
}

export interface Config<IUser> {
  label: string;
  render: (user: IUser) => JSX.Element | string | number;
  sortValue?: (user: IUser) => string | number | Date;
  header?: () => JSX.Element;
}
