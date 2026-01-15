import { APIRequestContext } from "@playwright/test";

export class LoginService {
  constructor(private request: APIRequestContext) {}

  async loginUser(user: { 
    email: string; 
    password: string}) {
    return this.request.post('/login', { data: user });
  }
}