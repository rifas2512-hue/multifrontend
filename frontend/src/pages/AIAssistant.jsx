import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Send, Bot, Sparkles, Loader2, Trash2, Download } from 'lucide-react';
import ChatMessage from '../components/ai/ChatMessage';
import SuggestionChips from '../components/ai/SuggestionChips';
import toast from 'react-hot-toast';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 I'm your AI Cloud Assistant. I can help you with:\n\n• Deploying applications to AWS, Azure, or GCP\n• Optimizing cloud costs\n• Troubleshooting deployment issues\n• Auto-scaling configurations\n• Security best practices\n\nHow can I help you today?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const suggestions = [
    'Deploy a React app to AWS',
    'Optimize cloud costs',
    'Fix deployment error',
    'Set up auto-scaling',
    'Security best practices',
    'Compare cloud providers',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate AI response
  const getAIResponse = (userMessage) => {
    const responses = {
      'deploy': `Here's how to deploy your React app to AWS:

1. **Build your app**: \`npm run build\`
2. **Install AWS CLI**: Configure credentials
3. **Create S3 bucket**: For hosting static files
4. **Upload build files**: \`aws s3 sync build/ s3://your-bucket\`
5. **Enable static hosting**: Configure bucket for website hosting
6. **Set up CloudFront**: For CDN and HTTPS

Need more details on any step? I can provide specific commands! 🚀`,

      'cost': `💰 **Cloud Cost Optimization Strategies:**

1. **Right-sizing**: Analyze and adjust instance sizes
2. **Spot instances**: Use for non-critical workloads (save up to 90%)
3. **Auto-scaling**: Scale down during off-peak hours
4. **Reserved instances**: Commit for 1-3 years (save up to 72%)
5. **Storage optimization**: Use appropriate storage tiers
6. **Monitor usage**: Set up budget alerts

Want me to help you implement any of these strategies?`,

      'security': `🔒 **Cloud Security Best Practices:**

1. **IAM**: Use least privilege principle
2. **MFA**: Enable for all users
3. **Encryption**: Encrypt data at rest and in transit
4. **Security Groups**: Restrict inbound/outbound traffic
5. **WAF**: Deploy Web Application Firewall
6. **VPC**: Isolate resources in private subnets
7. **Monitoring**: Set up CloudTrail and GuardDuty
8. **Regular audits**: Review permissions monthly

Would you like detailed implementation steps?`,

      'scaling': `📈 **Auto-Scaling Configuration Guide:**

1. **Define scaling policies**:
   - CPU utilization > 70% → Scale out
   - CPU utilization < 30% → Scale in

2. **Set minimum/maximum instances**:
   - Min: 2 (for high availability)
   - Max: 10 (to control costs)

3. **Choose scaling metrics**:
   - CPU utilization
   - Memory usage
   - Request count
   - Custom metrics

4. **Configure cooldown periods**:
   - Scale out: 300 seconds
   - Scale in: 600 seconds

Need help setting this up for your specific use case?`,

      'error': `🔧 **Troubleshooting Common Deployment Errors:**

1. **"Build failed"**:
   - Check Node.js version compatibility
   - Run \`npm install\` to update dependencies
   - Clear cache: \`npm cache clean --force\`

2. **"Port already in use"**:
   - Find process: \`lsof -i :3000\`
   - Kill process: \`kill -9 PID\`
   - Or change port: \`PORT=3001 npm start\`

3. **"Environment variables missing"**:
   - Create \`.env\` file
   - Check variable names (must start with REACT_APP_)
   - Restart the server after changes

4. **"API Connection refused"**:
   - Check CORS configuration
   - Verify API URL is correct
   - Test connection: \`curl -I https://your-api.com\`

What error are you encountering? I can provide specific help!`,

      'compare': `🔄 **Cloud Provider Comparison:**

| Feature | AWS | Azure | GCP |
|---------|-----|-------|-----|
| **Compute** | EC2 | VMs | Compute Engine |
| **Containers** | ECS/EKS | AKS | GKE |
| **Serverless** | Lambda | Functions | Cloud Functions |
| **Database** | RDS/DynamoDB | SQL/Cosmos DB | Cloud SQL |
| **Storage** | S3 | Blob Storage | Cloud Storage |
| **Pricing** | Pay-as-you-go | Pay-as-you-go | Per-second billing |
| **Global Regions** | 30+ | 60+ | 35+ |

**Recommendation**: Choose based on:
- Your team's expertise
- Specific services needed
- Compliance requirements
- Cost optimization options

Which provider are you considering? I can help with specific service comparisons.`,

      'default': `I understand you're asking about cloud infrastructure. Let me break this down:

1. **What would you like to accomplish?**
   - Deploy a new application
   - Optimize existing resources
   - Learn about cloud services
   - Troubleshoot an issue

2. **Which cloud provider are you using?**
   - AWS
   - Azure
   - GCP
   - Oracle Cloud
   - DigitalOcean

3. **What's your experience level?**
   - Beginner
   - Intermediate
   - Advanced

Tell me more about your specific needs, and I'll provide tailored guidance! 🚀`
    };

    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes('deploy') || lowerMsg.includes('deployment')) {
      return responses.deploy;
    } else if (lowerMsg.includes('cost') || lowerMsg.includes('optimize') || lowerMsg.includes('price')) {
      return responses.cost;
    } else if (lowerMsg.includes('security') || lowerMsg.includes('secure')) {
      return responses.security;
    } else if (lowerMsg.includes('scale') || lowerMsg.includes('auto-scaling')) {
      return responses.scaling;
    } else if (lowerMsg.includes('error') || lowerMsg.includes('bug') || lowerMsg.includes('fix')) {
      return responses.error;
    } else if (lowerMsg.includes('compare') || lowerMsg.includes('difference') || lowerMsg.includes('vs')) {
      return responses.compare;
    } else {
      return responses.default;
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: input,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const response = getAIResponse(input);
      const aiMessage = {
        id: Date.now() + 1,
        text: response,
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  const handleClearChat = () => {
    if (window.confirm('Clear all messages?')) {
      setMessages([
        {
          id: 1,
          text: "👋 Chat cleared! How can I help you today?",
          isUser: false,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      toast.success('Chat cleared');
    }
  };

  const handleExportChat = () => {
    const chatText = messages.map(m => 
      `${m.isUser ? '👤 User' : '🤖 AI'}: ${m.text}`
    ).join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${new Date().toISOString().slice(0,10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Chat exported successfully!');
  };

  return (
    <>
      <Helmet><title>AI Assistant</title></Helmet>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-8rem)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
              <Bot className="w-8 h-8 mr-3 text-purple-600" />
              AI Assistant
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Get AI-powered help for your cloud infrastructure
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportChat}
              className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center"
            >
              <Download className="w-4 h-4 mr-1" />
              Export
            </button>
            <button
              onClick={handleClearChat}
              className="px-3 py-2 text-sm bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors flex items-center"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Clear
            </button>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-[calc(100%-4rem)] flex flex-col overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          {messages.length < 3 && (
            <div className="px-6 pb-2">
              <SuggestionChips suggestions={suggestions} onSelect={handleSuggestionClick} />
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-end space-x-2">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about cloud infrastructure..."
                  rows="1"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              <Sparkles className="w-3 h-3 inline mr-1" />
              AI-powered responses • Press Enter to send
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIAssistant;
