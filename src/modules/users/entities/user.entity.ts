export class User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
    this.id = crypto.randomUUID();
    this.version = 0;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
}
