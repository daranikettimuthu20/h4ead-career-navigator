export default function TypingIndicator() {
  return (
    <div className="flex gap-1 items-center px-4 py-3 bg-gray-100 rounded-2xl rounded-tl-sm w-fit">
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
    </div>
  );
}