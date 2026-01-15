import { APIRequestContext } from "@playwright/test";

export class UserService {
  constructor(private request: APIRequestContext) {}

  async getUserById(id: number) {
    return this.request.get(`/usuarios/${id}`);
  }

  async createUser(user: { 
    nome: string; 
    email: string; 
    password: string;
    administrador: string | boolean; }) {
    return this.request.post('/usuarios', { data: user });
  }

  async listUsers() {
    return this.request.get('/usuarios');
  }
}