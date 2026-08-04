import { NextResponse } from 'next/server';

interface ChatMessage {
  id: string;
  sender: 'user' | 'expert';
  text: string;
  timestamp: string;
}

// In-Memory storage of chat messages for demo consultation session
let chatSessions: Record<string, ChatMessage[]> = {
  'session-active': [
    { id: '1', sender: 'expert', text: 'Halo Rizky, ada yang bisa saya bantu hari ini terkait pola makan kamu?', timestamp: '09:00 WIB' },
    { id: '2', sender: 'user', text: 'Halo Dokter, belakangan ini saya merasa lapar terus di sore hari. Apakah target kalori saya kurang?', timestamp: '09:02 WIB' }
  ]
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id') || 'session-active';

  return NextResponse.json({
    success: true,
    messages: chatSessions[sessionId] || []
  });
}

export async function POST(req: Request) {
  try {
    const { session_id = 'session-active', sender, text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Pesan tidak boleh kosong' }, { status: 400 });
    }

    if (!chatSessions[session_id]) {
      chatSessions[session_id] = [];
    }

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: sender as any,
      text,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
    };

    chatSessions[session_id].push(newMessage);

    return NextResponse.json({
      success: true,
      message: newMessage
    });
  } catch (err) {
    return NextResponse.json({ error: 'Gagal mengirim pesan' }, { status: 500 });
  }
}
