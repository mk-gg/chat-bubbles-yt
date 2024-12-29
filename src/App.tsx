import React from 'react';
import { ChatBubbleProvider } from './providers/ChatBubbleProvider';
import { Layout } from './components/Layout';
import { ChatArea } from './components/ChatArea';
import { Sidebar } from './components/Sidebar';
import { KeyboardSoundPlayer } from './components/KeyboardSound';
import './fonts.css';

const App: React.FC = () => {
  return (
    <ChatBubbleProvider>
      <div className="font-['Roboto',sans-serif]">
        <Layout>
          <Sidebar />
          <ChatArea />
        </Layout>
        <KeyboardSoundPlayer />
      </div>
    </ChatBubbleProvider>
  );
};

export default App;

