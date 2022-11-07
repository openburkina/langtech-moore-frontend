export class User {
  constructor(
    public id?: number,
    public login?: string,
    public password?: any,
    public firstName?: string,
    public lastName?: string,
    public telephone?: string,
    public email?: string,
    public createdBy?: string,
    public activated?: boolean,
    public authorities?: string[],
  ) {}
}
