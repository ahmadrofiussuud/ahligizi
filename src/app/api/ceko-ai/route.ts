import { AIError, AI_MODEL, CEKO_INSTRUCTION, aiFailure, aiResponse, generateAI, readAIRequest } from '@/lib/cekat-ai';
export const maxDuration = 60;
export async function POST(request: Request) {
  try {
    const { message, history = [] } = await readAIRequest(request);
    if (typeof message !== 'string' || !message.trim() || message.length > 4000 || !Array.isArray(history)) throw new AIError(400, 'Tulis pertanyaan maksimal 4.000 karakter.');
    const previous = history.slice(-10);
    if (!previous.every(item => item && ['user','bot'].includes(item.sender) && typeof item.text === 'string' && item.text.length <= 8000)) throw new AIError(400, 'Riwayat percakapan tidak valid.');
    const reply = await generateAI(CEKO_INSTRUCTION, [...previous.map(item => ({ role: item.sender === 'user' ? 'user' : 'model', parts: [{ text: item.text }] })), { role: 'user', parts: [{ text: message.trim() }] }]);
    return aiResponse({ success: true, source: AI_MODEL, reply });
  } catch (error) { return aiFailure(error); }
}

