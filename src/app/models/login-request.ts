export class LoginRequest {
  email: string;
  password: string;
  captcha: string;

  constructor(email: string = '', password: string = '', captcha: string = '') {
    this.email = email;
    this.password = password;
    this.captcha = captcha;
  }
}