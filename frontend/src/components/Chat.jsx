import { useState, useRef, useEffect } from "react";

// Dummy data for the user list sidebar
const userList = [
  { id: 1, name: "Alice", active: true },
  { id: 2, name: "Bob", active: false },
  { id: 3, name: "Charlie", active: true },
  { id: 4, name: "Diana", active: false },
];

export default function Chat({ onClose }) {
  const [messages, setMessages] = useState([
    { from: "agent", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage() {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");

    // Simulate agent response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "agent", text: "Thanks for your message! We'll get back soon." },
      ]);
    }, 1000);
  }

  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      {/* Header */}
      <div className="bg-red-600 text-white px-4 py-3 flex justify-between items-center shadow-md">
        <h3 className="font-semibold text-lg">Chat with Agent</h3>
        <button onClick={onClose} className="text-white text-2xl font-bold">×</button>
      </div>

      {/* Main Content Area: Sidebar + Chat Window */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* User List Sidebar */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 flex flex-col overflow-y-auto">
          <h4 className="font-bold text-gray-700 mb-4 text-sm uppercase tracking-wider">Users Online ({userList.filter(u => u.active).length})</h4>
          <ul className="space-y-2">
            {userList.map((user) => (
              <li 
                key={user.id} 
                className="flex items-center p-2 rounded-lg transition duration-150 ease-in-out hover:bg-gray-100 cursor-pointer"
              >
                <div 
                  className={`w-3 h-3 rounded-full mr-3 ${user.active ? 'bg-green-400' : 'bg-gray-400'}`}
                  title={user.active ? 'Online' : 'Offline'}
                ></div>
                <span className="text-sm font-medium text-gray-800">{user.name}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Chat Window Container */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-xl max-w-xs break-words ${
                    msg.from === "user"
                      ? "bg-red-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 px-4 py-3 flex items-center gap-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-red-600 text-white px-5 py-2 rounded-full text-sm hover:bg-red-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}