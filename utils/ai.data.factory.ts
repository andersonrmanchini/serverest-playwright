import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

export async function generateFakeUser(administrador = true) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
      Gere um objeto JSON representando um usuário para teste de software.
      O objeto deve conter as seguintes propriedades:
      - nome: Um nome completo fictício brasileiro.
      - email: Um email válido e único (adicione números aleatórios para garantir unicidade).
      - password: Uma senha forte.
      - administrador: Um valor booleano baseado no parâmetro 'administrador'.
    `;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a test data generator. Respond only with valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'gpt-3.5-turbo',
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('Falha ao gerar dados com a OpenAI');
    }

    return JSON.parse(content);
  } catch (error) {
    console.warn('⚠️ Falha na OpenAI (Quota ou Erro). Usando dados locais de fallback.');
    return generateLocalFakeUser(administrador);
  }
}

function generateLocalFakeUser(administrador = true) {
  const timestamp = Date.now();
  return {
    nome: `Usuario Fallback ${timestamp}`,
    email: `fallback.${timestamp}@qa.com.br`,
    password: 'senha123',
    administrador: administrador
  };
}

export async function generateFakeProduct() {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
      Gere um objeto JSON representando um produto para teste de software.
      O objeto deve conter as seguintes propriedades:
      - name: Um nome de produto fictício e criativo (por exemplo, "Laptop Super Sônico").
      - price: Um número inteiro para o preço (entre 100 e 5000).
      - description: Uma descrição curta e fictícia para o produto.
      - amount: Um número inteiro para a quantidade em estoque (entre 1 e 100).
      - imageUrl: A URL de uma imagem de produto fictícia e realista (por exemplo, de um site como https://picsum.photos).
    `;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a test data generator. Respond only with valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'gpt-3.5-turbo',
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('Falha ao gerar dados de produto com a OpenAI');
    }

    const productData = JSON.parse(content);

    if (!productData.imageUrl) {
      console.warn('⚠️ A OpenAI não retornou uma imageUrl. Usando dados de produto locais de fallback.');
      return generateLocalFakeProduct();
    }

    // Baixar a imagem e salvar localmente
    const imageResponse = await fetch(productData.imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    const cacheDir = path.join(process.cwd(), 'playwright', '.cache');
    fs.mkdirSync(cacheDir, { recursive: true });
    const imageName = `ai-product-${Date.now()}.jpg`;
    const imagePath = path.join(cacheDir, imageName);
    fs.writeFileSync(imagePath, Buffer.from(imageBuffer));

    // Retornar os dados do produto com o caminho da imagem local
    return {
      ...productData,
      image: imagePath,
      imageUrl: undefined, // Remover a propriedade imageUrl
    };
  } catch (error) {
    console.warn('⚠️ Falha na OpenAI (Quota ou Erro). Usando dados de produto locais de fallback.');
    return generateLocalFakeProduct();
  }
}

function generateLocalFakeProduct() {
  const timestamp = Date.now();
  const imagePath = path.join(process.cwd(), 'utils', 'pictures', 'fogao.jpg');
  return {
    name: `Produto Fallback ${timestamp}`,
    price: Math.floor(Math.random() * 4901) + 100,
    description: 'Descrição do produto de fallback',
    amount: Math.floor(Math.random() * 100) + 1,
    image: imagePath,
  };
}
