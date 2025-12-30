import OpenAI from 'openai';

// Inicializa o cliente OpenAI uma vez para ser reutilizado
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Gera dados de teste usando o modelo GPT da OpenAI.
 * @param prompt O prompt descrevendo os dados que você precisa.
 * @returns O texto gerado pela IA.
 */
export async function generateTestData(prompt: string): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('A chave de API da OpenAI não foi configurada no arquivo .env');
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo', // ou 'gpt-4' se preferir
    });

    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error('Erro ao chamar a API da OpenAI:', error);
    throw error;
  }
}
