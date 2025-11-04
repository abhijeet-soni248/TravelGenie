import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm IndieGenie, your AI travel assistant for India. I can help you plan your trip to India, suggest destinations, calculate budgets, provide historical information about destinations, and answer any travel-related questions. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Simulate AI response after a short delay
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getBotResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('kerala')) {
      return "Kerala is amazing! Known as 'God's Own Country', it's famous for backwaters, houseboats, and spice plantations. Best time to visit is October to March. Budget for 5 days: ₹15,000-25,000 per person. Would you like a detailed itinerary?";
    } else if (input.includes('rajasthan')) {
      return "Rajasthan is the land of maharajas! Famous for palaces, forts, and desert safaris. Must-visit: Jaipur, Udaipur, Jodhpur. Best time: November to February. Budget for 7 days: ₹20,000-35,000 per person. Interested in a royal palace tour?";
    } else if (input.includes('budget')) {
      return "I can help calculate your travel budget! For a typical Indian destination: Budget travel: ₹1,500-2,500/day, Mid-range: ₹3,000-5,000/day, Luxury: ₹8,000+/day. Tell me your destination and duration for a detailed estimate!";
    } else if (input.includes('goa')) {
      return "Goa is perfect for beaches and relaxation! Famous for beaches, Portuguese architecture, and nightlife. Best time: November to February. Budget for 4 days: ₹12,000-20,000 per person. Beach lover or culture enthusiast?";
    } else if (input.includes('himachal') || input.includes('mountains')) {
      return "Himachal Pradesh offers stunning mountains! Great for trekking, hill stations like Shimla, Manali. Best time: March to June, October to February. Budget for 6 days: ₹18,000-30,000 per person. Looking for adventure or relaxation?";
    } else if (input.includes('help') || input.includes('assist')) {
      return "I'm here to help with your India travel planning! I can: 📍 Suggest destinations, 💰 Calculate budgets, 🗓️ Plan itineraries, 🌤️ Provide weather info, 🎯 Recommend activities. What would you like to explore?";
    } else {
      return "That's interesting! India has so many amazing destinations to explore. I can help you with detailed planning for any Indian state or city. Would you like suggestions for popular destinations like Kerala, Rajasthan, Goa, or Himachal Pradesh? Or do you have a specific place in mind?";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
        size="icon"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-20 right-4 z-50 w-80 h-96"
          >
            <Card className="h-full flex flex-col shadow-2xl">
              <CardHeader className="pb-3 bg-blue-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-5 w-5" />
                    <CardTitle className="text-lg">IndieGenie</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-blue-700 h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-blue-100 text-sm">Your AI Travel Assistant</p>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2`}>
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            message.type === 'user' ? 'bg-orange-100 ml-2' : 'bg-blue-100 mr-2'
                          }`}>
                            {message.type === 'user' ? (
                              <User className="w-4 h-4 text-orange-600" />
                            ) : (
                              <Bot className="w-4 h-4 text-blue-600" />
                            )}
                          </div>
                          <div className={`rounded-lg px-3 py-2 text-sm ${
                            message.type === 'user' 
                              ? 'bg-orange-600 text-white' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {message.content}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about Indian destinations..."
                      className="flex-1"
                    />
                    <Button onClick={sendMessage} size="icon" className="bg-blue-600 hover:bg-blue-700">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}