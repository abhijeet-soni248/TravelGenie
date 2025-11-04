import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
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

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Simulate AI response after a short delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getBotResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('destination') || input.includes('place')) {
      return "I'd be happy to help you choose a destination! India has amazing places like Kerala for backwaters, Rajasthan for palaces, Goa for beaches, Himachal for mountains, Kashmir for scenic beauty, Karnataka for heritage, Tamil Nadu for temples, and West Bengal for culture. What type of experience are you looking for - adventure, relaxation, culture, or nature?";
    } else if (input.includes('budget') || input.includes('cost') || input.includes('price')) {
      return "For budget planning, a typical India trip costs: Budget (₹10K-25K), Mid-range (₹25K-50K), Luxury (₹50K-1L+). This includes accommodation, food, transport, and activities for 5-7 days. Breakdown: Accommodation (30%), Food (25%), Transport (25%), Activities (20%). Would you like me to calculate a specific budget for your destination?";
    } else if (input.includes('itinerary') || input.includes('plan')) {
      return "I can help create a personalized itinerary! To get started, I'll need to know: 1) Your preferred destination, 2) Travel dates, 3) Budget range, 4) Interests (adventure, culture, relaxation, etc.), and 5) Group size. Use our itinerary generator above to create your perfect trip!";
    } else if (input.includes('weather') || input.includes('season') || input.includes('when to visit')) {
      return "Best time to visit varies by region: North India (Oct-Mar for pleasant weather), South India (Nov-Feb for comfortable temperatures), Hill stations (Apr-Oct for cool weather), Monsoon destinations like Kerala (Jun-Sep for lush greenery). What destination are you considering?";
    } else if (input.includes('food') || input.includes('cuisine')) {
      return "Indian cuisine varies greatly by region! North India offers rich curries and naans, South India has rice dishes and coconut-based curries, East India specializes in sweets and fish, West India has diverse vegetarian cuisine. Street food is amazing everywhere. Most destinations have vegetarian and non-vegetarian options. Any specific dietary requirements?";
    } else if (input.includes('history') || input.includes('historical') || input.includes('heritage')) {
      return "India has an incredibly rich history! Major historical sites include: Red Fort & Qutub Minar (Delhi), Taj Mahal (Agra), Amber Fort (Jaipur), Hampi (Karnataka), Khajuraho (Madhya Pradesh), Ajanta & Ellora Caves (Maharashtra). Each destination has unique historical significance spanning Mughal, British, and ancient Indian empires. Which historical period interests you most?";
    } else if (input.includes('kerala')) {
      return "Kerala, 'God's Own Country', is famous for backwaters, houseboats, spice plantations, and Ayurveda. Historical significance: Ancient spice trade route, Portuguese and Dutch colonial influence. Best time: Oct-Mar. Must-visit: Alleppey backwaters, Munnar tea gardens, Kochi Fort, Thekkady wildlife sanctuary. Budget: ₹15K-40K for 5-7 days.";
    } else if (input.includes('rajasthan')) {
      return "Rajasthan, the 'Land of Kings', showcases magnificent palaces, forts, and desert landscapes. History: Rajput kingdoms, Mughal influence, trade routes. Best time: Oct-Mar. Must-visit: Jaipur (Pink City), Udaipur (City of Lakes), Jodhpur (Blue City), Jaisalmer (Golden City). Budget: ₹20K-60K for 7-10 days.";
    } else if (input.includes('goa')) {
      return "Goa offers beautiful beaches, Portuguese colonial architecture, and vibrant nightlife. History: 450 years of Portuguese rule, spice trade hub. Best time: Nov-Mar. Must-visit: Old Goa churches, Dudhsagar Falls, Anjuna & Calangute beaches, spice plantations. Budget: ₹12K-35K for 4-6 days.";
    } else if (input.includes('himachal') || input.includes('mountains') || input.includes('himalayas')) {
      return "Himachal Pradesh offers stunning mountain landscapes, adventure sports, and hill stations. History: Ancient trade routes, British hill stations. Best time: Mar-Jun, Sep-Nov. Must-visit: Shimla, Manali, Dharamshala, Spiti Valley. Activities: Trekking, paragliding, river rafting. Budget: ₹18K-45K for 6-8 days.";
    } else if (input.includes('documents') || input.includes('id') || input.includes('passport')) {
      return "Essential documents for India travel: 1) Valid ID (Aadhaar, Passport for foreigners), 2) Travel tickets, 3) Hotel bookings, 4) Travel insurance, 5) Medical prescriptions if any, 6) Emergency contacts, 7) Digital copies stored securely. For certain areas like Kashmir or Northeast, additional permits may be required.";
    } else if (input.includes('transport') || input.includes('travel') || input.includes('how to reach')) {
      return "India offers various transport options: 1) Flights (fastest, major cities connected), 2) Trains (scenic, affordable - book on IRCTC), 3) Buses (state & private, good connectivity), 4) Taxis/Cabs (Uber, Ola available), 5) Auto-rickshaws (short distances). For hill stations, consider renting a car for flexibility.";
    } else {
      return "That's a great question! I can help you with destination recommendations, budget planning, itinerary creation, weather information, historical insights, and travel tips for India. Feel free to ask me about any specific destination, travel requirements, or planning aspect. You can also use our tools above to generate detailed itineraries and calculate budgets.";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-2 sm:right-4 w-[calc(100vw-1rem)] sm:w-80 max-w-md h-100 z-50"
          >
            <Card className="h-full shadow-2xl border-orange-200 overflow-y-auto">
              <CardHeader className="bg-orange-600 text-white rounded-t-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-5 w-5" />
                    <CardTitle className="text-lg">IndieGenie</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-orange-700 h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex flex-col h-full">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-orange-600 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <div className="flex items-start space-x-2">
                            {message.type === 'bot' && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                            {message.type === 'user' && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                            <p className="text-xs sm:text-sm break-words">{message.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-3 sm:p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask about your Trip"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 text-sm"
                    />
                    <Button
                      onClick={sendMessage}
                      size="icon"
                      className="bg-orange-600 hover:bg-orange-700 flex-shrink-0"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        className="fixed bottom-4 right-2 sm:right-4 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="h-14 w-14 rounded-full bg-orange-600 hover:bg-orange-700 shadow-lg transition-all duration-200 hover:scale-110"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          </motion.div>
        </Button>
        
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 }}
            className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap shadow-lg hidden sm:block"
          >
            Need travel help? Ask me!
            <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}