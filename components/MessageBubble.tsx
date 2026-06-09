import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", flexDirection: isUser ? "row-reverse" : "row" }}>
      <div style={{
        width: 38, height: 38, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, fontWeight: 700, flexShrink: 0,
        background: isUser ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
        color: "#fff"
      }}>
        {isUser ? "You" : "AI"}
      </div>
      <div style={{
        maxWidth: "78%",
        padding: "14px 18px",
        borderRadius: 18,
        fontSize: 15,
        lineHeight: 1.7,
        borderTopRightRadius: isUser ? 4 : 18,
        borderTopLeftRadius: isUser ? 18 : 4,
        background: isUser ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#ffffff",
        color: isUser ? "#ffffff" : "#1e293b",
        border: isUser ? "none" : "1px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        wordBreak: "break-word",
        overflow: "hidden"
      }}>
        {isUser ? (
          <span style={{ whiteSpace: "pre-wrap" }}>{message.content}</span>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({children}) => <p style={{ fontWeight: 700, color: "#1e293b", marginTop: 8, marginBottom: 4, fontSize: 15 }}>{children}</p>,
              h3: ({children}) => <p style={{ fontWeight: 700, color: "#1e293b", marginTop: 8, marginBottom: 4 }}>{children}</p>,
              strong: ({children}) => <strong style={{ fontWeight: 700, color: "#1e293b" }}>{children}</strong>,
              ul: ({children}) => <ul style={{ paddingLeft: 18, margin: "8px 0" }}>{children}</ul>,
              ol: ({children}) => <ol style={{ paddingLeft: 18, margin: "8px 0" }}>{children}</ol>,
              li: ({children}) => <li style={{ marginBottom: 4, color: "#334155" }}>{children}</li>,
              p: ({children}) => <p style={{ marginBottom: 6 }}>{children}</p>,
              hr: () => <hr style={{ margin: "10px 0", borderColor: "#e2e8f0" }} />,
              a: ({href, children}) => (
                <a href={href} target="_blank" style={{ color: "#6366f1", textDecoration: "underline" }}>{children}</a>
              ),
              code: ({children}) => (
                <code style={{
                  background: "#f1f5f9",
                  color: "#4338ca",
                  padding: "2px 6px",
                  borderRadius: 4,
                  fontSize: 13,
                  fontFamily: "monospace",
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap"
                }}>
                  {children}
                </code>
              ),
              pre: ({children}) => (
                <pre style={{
                  background: "#f1f5f9",
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                  padding: "12px 14px",
                  overflowX: "auto",
                  fontSize: 13,
                  fontFamily: "monospace",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  margin: "8px 0"
                }}>
                  {children}
                </pre>
              ),
              table: ({children}) => (
                <div style={{ overflowX: "auto", margin: "12px 0" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                    {children}
                  </table>
                </div>
              ),
              thead: ({children}) => (
                <thead style={{ background: "#eef2ff" }}>{children}</thead>
              ),
              th: ({children}) => (
                <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: 700, color: "#4338ca", borderBottom: "2px solid #c7d2fe", whiteSpace: "nowrap" }}>
                  {children}
                </th>
              ),
              td: ({children}) => (
                <td style={{ padding: "10px 14px", borderBottom: "1px solid #e2e8f0", color: "#334155" }}>
                  {children}
                </td>
              ),
              tr: ({children}) => (
                <tr>{children}</tr>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}