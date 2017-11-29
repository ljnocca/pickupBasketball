export class Player {
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public status: boolean;

  constructor (firstName: string, lastName: string, email: string, password: string, status: boolean) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.status = status;
  }
}
