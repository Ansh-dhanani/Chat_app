import React, { useState } from 'react'

export const ChatPage = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle send message logic here
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="chat-container">

      <div className="flex items-center justify-between p-4 border-b border-white/20">
        <h1 className="text-xl font-semibold text-white">Chat</h1>
        <button className="glass-button text-sm">
          Settings
        </button>
      </div>


      <div className="flex-1 p-4 overflow-y-auto">
        <div className="text-center text-white/60 py-8">
          <p>Start a conversation!</p>
        </div>
      </div>

      <div className="p-4 border-t border-white/20">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="glass-input flex-1"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="glass-button-primary px-6"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
