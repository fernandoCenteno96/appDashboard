export class UserModel {
  uid?: string;
  name?: string;
  password?: string;
  email?: string;
  constructor(obj: dataObj) {
    this.uid = (obj && obj.uid) || null;
    this.name = (obj && obj.name) || null;
    this.email = (obj && obj.email) || null;
  }
}

interface dataObj {
  uid: string;
  email: string;
  name: string;
}
