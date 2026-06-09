const topics = [
  { label: "What is H-4 EAD?", query: "What is H-4 EAD and who qualifies?" },
  { label: "EAD renewal", query: "How do I renew my H-4 EAD? Give me full details including cost." },
  { label: "Job search tips", query: "What is the best job search strategy for H-4 EAD holders?" },
  { label: "Resume tips", query: "How should I mention H-4 EAD on my resume?" },
  { label: "Employer rules", query: "Can H-4 EAD holders work for any employer?" },
  { label: "Visa changes", query: "What happens to my EAD if my spouse changes jobs?" },
  { label: "Interview tips", query: "What should I say about H-4 EAD in job interviews?" },
  { label: "Can I freelance?", query: "Can I freelance or start a business on H-4 EAD?" },
];

export default function TopicChips({ onSelect }: { onSelect: (q: string) => void }) {
  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "12px 16px", display: "flex", gap: 8, overflowX: "auto", flexShrink: 0 }}>
      {topics.map((topic) => (
        <button
          key={topic.label}
          onClick={() => onSelect(topic.query)}
          style={{
            fontSize: 13, padding: "7px 16px", borderRadius: 50,
            border: "1.5px solid #c7d2fe", background: "#eef2ff",
            color: "#4338ca", whiteSpace: "nowrap", cursor: "pointer",
            fontWeight: 600, fontFamily: "inherit", transition: "all 0.15s"
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#e0e7ff")}
          onMouseLeave={e => (e.currentTarget.style.background = "#eef2ff")}
        >
          {topic.label}
        </button>
      ))}
    </div>
  );
}