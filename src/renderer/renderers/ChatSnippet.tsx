import type { ChatSnippetData } from '@/core/types/stat-result';

const AUTHOR_COLORS = [
  '#25D366',
  '#53BDEB',
  '#FCB900',
  '#FF7900',
  '#E84393',
  '#AB22B8',
  '#FC644C',
  '#00BCD4',
];

function authorColor(author: string, participants: string[]): string {
  const idx = participants.indexOf(author);
  return AUTHOR_COLORS[(idx >= 0 ? idx : hashStr(author)) % AUTHOR_COLORS.length];
}

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function ChatSnippet({ data }: { data: ChatSnippetData }) {
  const participants = [...new Set(data.messages.map((m) => m.author))];

  return (
    <div className="flex flex-col gap-0.5 rounded-lg overflow-hidden bg-[#0B141A] p-3">
      {data.messages.map((msg, i) => (
        <div key={i}>
          {msg.date && (
            <div className="flex justify-center my-2">
              <span className="text-[11px] text-ws-muted bg-[#1F2C33] px-3 py-0.5 rounded-full">
                {msg.date}
              </span>
            </div>
          )}
          <div className={`flex flex-col max-w-[85%] ${msg.isFirstFromAuthor ? 'mt-1.5' : 'mt-0.5'}`}>
            <div className="relative bg-[#1F2C33] rounded-lg px-3 py-1.5">
              {msg.isFirstFromAuthor && (
                <div
                  className="text-[12px] font-semibold mb-0.5 leading-tight"
                  style={{ color: authorColor(msg.author, participants) }}
                >
                  {msg.author}
                </div>
              )}
              <div
                className={`text-[13.5px] leading-snug break-words whitespace-pre-wrap ${
                  msg.isDeleted
                    ? 'italic text-ws-muted'
                    : msg.isMedia
                      ? 'text-ws-muted'
                      : 'text-ws-text'
                }`}
              >
                {msg.isMedia && <span className="mr-1">📎</span>}
                {msg.isDeleted && <span className="mr-1">🚫</span>}
                {msg.text}
              </div>
              <div className="text-[10px] text-ws-muted text-right mt-0.5 -mb-0.5">
                {msg.time}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
