export class User {
  constructor(
    public id?: number,
    public login?: string,
    public password?: any,
    public firstName?: string,
    public lastName?: string,
    public telephone?: string,
    public email?: string,
    public resetKey?: string,
    public resetDate?: string,
    public createdBy?: string,
    public activated?: boolean,
    public defaultPassord?: boolean,
    public authorities?: string[],
  ) {
    this.activated = false;
    this.authorities = [];
    this.defaultPassord = false;
  }
}
