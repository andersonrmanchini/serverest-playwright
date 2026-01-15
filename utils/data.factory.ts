import { faker } from '@faker-js/faker/locale/pt_BR';
import path from 'path';
import fs from 'fs';

export function generateFakeUser(isAdmin = true) {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    isAdmin: isAdmin
  };
}

export function generateFakeProduct() {
  const imagePath = path.resolve(__dirname, 'pictures', 'fogao.jpg')
  
  return {
    name: faker.commerce.productName(),
    price: faker.number.int({ min: 100, max: 5000 }),
    description: faker.commerce.productDescription(),
    quantity: faker.number.int({ min: 1, max: 100 }),
    image: imagePath  // Retorna o caminho do arquivo
  };
}