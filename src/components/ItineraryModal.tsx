import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CrowdPredictor } from "./CrowdPredictor";
import { GroupCoordination } from "./GroupCoordination";
import { DynamicBudgetAnalyzer } from "./DynamicBudgetAnalyzer";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, 
  Clock, 
  IndianRupee, 
  Calendar, 
  Users, 
  Download, 
  Share2, 
  Camera,
  FileText,
  Plane,
  Train,
  Car,
  Mountain,
  Star,
  X,
  RefreshCw,
  Wifi,
  BarChart3,
  Route,
  AlertTriangle
} from "lucide-react";

interface ItineraryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  destination?: string;
  isGenerated?: boolean;
  data?: any;
}

interface DayActivity {
  time: string;
  activity: string;
  location: string;
  cost: string;
  description: string;
}

interface ItineraryDay {
  day: number;
  date: string;
  title: string;
  activities: DayActivity[];
  totalCost: string;
}

const getItineraryData = (destination: string): any => {
  const itineraries: Record<string, any> = {
    "Kerala Backwaters": {
      title: "Kerala Backwaters Experience",
      duration: "5 Days",
      budget: "₹18,500",
      season: "October to March",
      bestTime: "November to February",
      images: [
        "https://images.unsplash.com/photo-1708868065091-a6f0ac265dfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBiZWFjaCUyMGdvYSUyMGtlcmFsYXxlbnwxfHx8fDE3NTc0ODgxNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1571115764742-7d5f0036a5af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBiYWNrd2F0ZXJzJTIwaG91c2Vib2F0fGVufDF8fHx8MTc1NzQ4ODE2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1651485936838-8a81e1e21634?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBzcGljZSUyMHBsYW50YXRpb24lMjB0ZWF8ZW58MXx8fHwxNzU3NDg4MTYzfDA&ixlib=rb-4.1.0&q=80&w=1080"
      ],
      famousPlaces: [
        { name: "Alleppey Backwaters", lat: 9.4981, lng: 76.3388 },
        { name: "Kumarakom Bird Sanctuary", lat: 9.6200, lng: 76.4267 },
        { name: "Vembanad Lake", lat: 9.5511, lng: 76.3789 },
        { name: "Munnar Tea Gardens", lat: 10.0889, lng: 77.0595 }
      ],
      itinerary: [
        {
          day: 1,
          date: "Day 1",
          title: "Arrival in Kochi",
          activities: [
            {
              time: "10:00 AM",
              activity: "Arrival at Kochi Airport",
              location: "Kochi International Airport",
              cost: "₹0",
              description: "Land in Kochi and proceed to hotel"
            },
            {
              time: "12:00 PM",
              activity: "Check-in & Lunch",
              location: "Hotel in Fort Kochi",
              cost: "₹800",
              description: "Traditional Kerala meal at hotel restaurant"
            },
            {
              time: "3:00 PM",
              activity: "Fort Kochi Exploration",
              location: "Fort Kochi",
              cost: "₹500",
              description: "Visit Chinese fishing nets, Dutch Palace, Jewish Synagogue"
            },
            {
              time: "7:00 PM",
              activity: "Kathakali Performance",
              location: "Kerala Kathakali Centre",
              cost: "₹300",
              description: "Traditional dance performance"
            }
          ],
          totalCost: "₹1,600"
        },
        {
          day: 2,
          date: "Day 2",
          title: "Kochi to Alleppey",
          activities: [
            {
              time: "8:00 AM",
              activity: "Check-out & Travel",
              location: "Kochi to Alleppey",
              cost: "₹1,200",
              description: "Private cab to Alleppey (2 hours)"
            },
            {
              time: "11:00 AM",
              activity: "Houseboat Check-in",
              location: "Alleppey Backwaters",
              cost: "₹4,500",
              description: "Luxury houseboat accommodation with meals"
            },
            {
              time: "12:30 PM",
              activity: "Backwater Cruise",
              location: "Vembanad Lake",
              cost: "₹0",
              description: "Scenic cruise through backwaters, included in houseboat"
            },
            {
              time: "6:00 PM",
              activity: "Sunset Viewing",
              location: "Alleppey Backwaters",
              cost: "₹0",
              description: "Beautiful sunset over the backwaters"
            }
          ],
          totalCost: "₹5,700"
        }
      ],
      budgetBreakdown: {
        accommodation: "₹8,500",
        food: "₹4,200",
        transport: "₹3,500",
        activities: "₹2,300"
      },
      documents: [
        "Valid Government ID (Aadhaar/Passport)",
        "Travel Insurance",
        "Hotel Booking Confirmations",
        "Flight/Train Tickets",
        "Emergency Contact Details"
      ],
      essentialItems: [
        "Light cotton clothing",
        "Comfortable walking shoes",
        "Sunscreen and hat",
        "Camera/Phone charger",
        "Basic first-aid kit",
        "Insect repellent"
      ]
    },
    "Rajasthan Palaces": {
      title: "Royal Rajasthan Palace Tour",
      duration: "7 Days",
      budget: "₹42,000",
      season: "October to March",
      bestTime: "November to February",
      images: [
        "https://images.unsplash.com/photo-1712944381367-2aa9f8f5d97d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMHJhamFzdGhhbiUyMHBhbGFjZSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NTc0ODgxNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1599661081690-7433b67b5b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW4lMjBqYWlwdXIlMjBhbWJlciUyMGZvcnR8ZW58MXx8fHwxNzU3NDg4MTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1566755893428-b85d3def1309?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1ZGFpcHVyJTIwcGFsYWNlJTIwcmFqYXN0aGFufGVufDF8fHx8MTc1NzQ4ODE2M3ww&ixlib=rb-4.1.0&q=80&w=1080"
      ],
      famousPlaces: [
        { name: "Amber Fort, Jaipur", lat: 26.9855, lng: 75.8513 },
        { name: "City Palace, Udaipur", lat: 24.5762, lng: 73.6793 },
        { name: "Mehrangarh Fort, Jodhpur", lat: 26.2975, lng: 73.0189 },
        { name: "Jaisalmer Fort", lat: 26.9118, lng: 70.9127 }
      ],
      itinerary: [
        {
          day: 1,
          date: "Day 1",
          title: "Arrival in Jaipur",
          activities: [
            {
              time: "9:00 AM",
              activity: "Arrival in Jaipur",
              location: "Jaipur Airport/Railway Station",
              cost: "₹0",
              description: "Arrive in the Pink City"
            },
            {
              time: "11:00 AM",
              activity: "Check-in & Rest",
              location: "Heritage Hotel",
              cost: "₹0",
              description: "Check into palace-style hotel"
            },
            {
              time: "3:00 PM",
              activity: "City Palace Visit",
              location: "City Palace, Jaipur",
              cost: "₹600",
              description: "Explore the magnificent royal palace complex"
            },
            {
              time: "6:00 PM",
              activity: "Hawa Mahal",
              location: "Palace of Winds",
              cost: "₹200",
              description: "Visit the iconic pink sandstone palace"
            }
          ],
          totalCost: "₹800"
        }
      ],
      budgetBreakdown: {
        accommodation: "₹18,000",
        food: "₹8,500",
        transport: "₹9,500",
        activities: "₹6,000"
      },
      documents: [
        "Valid Government ID",
        "Travel Insurance",
        "Hotel Confirmations",
        "Transportation Tickets",
        "Photography Permits for Forts"
      ],
      essentialItems: [
        "Comfortable walking shoes",
        "Light layers for temperature changes",
        "Sunhat and sunglasses",
        "Camera with extra batteries",
        "Respect local customs clothing"
      ]
    },
    "Himalayan Trek": {
      title: "Himalayan Adventure Trek",
      duration: "6 Days",
      budget: "₹28,000",
      season: "March to June, September to November",
      bestTime: "April to June, September to October",
      images: [
        "https://images.unsplash.com/photo-1676623149255-7ae9f48dfcd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YXMlMjBtb3VudGFpbnMlMjBpbmRpYSUyMHRyZWt8ZW58MXx8fHwxNzU3NDg4MTY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5hbGklMjBoaW1hY2hhbCUyMHByYWRlc2h8ZW58MXx8fHwxNzU3NDg4MTY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGltbGElMjBoaW1hY2hhbCUyMGhpbGwlMjBzdGF0aW9ufGVufDF8fHx8MTc1NzQ4ODE2NHww&ixlib=rb-4.1.0&q=80&w=1080"
      ],
      famousPlaces: [
        { name: "Manali", lat: 32.2396, lng: 77.1887 },
        { name: "Rohtang Pass", lat: 32.3736, lng: 77.2493 },
        { name: "Solang Valley", lat: 32.3055, lng: 77.1548 },
        { name: "Shimla", lat: 31.1048, lng: 77.1734 }
      ],
      itinerary: [
        {
          day: 1,
          date: "Day 1",
          title: "Delhi to Manali",
          activities: [
            {
              time: "6:00 PM",
              activity: "Departure from Delhi",
              location: "Delhi",
              cost: "₹1,500",
              description: "Overnight bus to Manali"
            }
          ],
          totalCost: "₹1,500"
        }
      ],
      budgetBreakdown: {
        accommodation: "₹8,500",
        food: "₹6,000",
        transport: "₹7,500",
        activities: "₹6,000"
      },
      documents: [
        "Valid Government ID",
        "Medical Fitness Certificate",
        "Travel Insurance",
        "Emergency Contact Details",
        "Trekking Permits (if required)"
      ],
      essentialItems: [
        "Trekking boots and warm clothing",
        "Waterproof jacket and pants",
        "Sleeping bag and trekking gear",
        "First-aid kit and medicines",
        "High-energy snacks and water bottles"
      ]
    }
  };

  return itineraries[destination] || itineraries["Kerala Backwaters"];
};

export function ItineraryModal({ open, onOpenChange, destination = "Kerala Backwaters", isGenerated = false }: ItineraryModalProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isReplanning, setIsReplanning] = useState(false);
  const [replanReason, setReplanReason] = useState("");
  const data = getItineraryData(destination);

  const handleReplan = async (reason: string) => {
    setIsReplanning(true);
    setReplanReason(reason);
    
    // Simulate AI replanning
    setTimeout(() => {
      setIsReplanning(false);
      // In a real implementation, this would update the itinerary data
    }, 3000);
  };

  const generateOfflineItinerary = () => {
    // Create downloadable HTML/PDF version
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${data.title} - Offline Itinerary</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { background: #ea580c; color: white; padding: 20px; border-radius: 8px; }
            .day { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
            .activity { margin: 10px 0; padding: 10px; background: #f5f5f5; border-radius: 4px; }
            .budget { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .emergency { background: #fee2e2; padding: 15px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${data.title}</h1>
            <p>Duration: ${data.duration} | Budget: ${data.budget}</p>
            <p>Best Time: ${data.bestTime}</p>
          </div>
          
          <div class="budget">
            <h2>Budget Breakdown</h2>
            <p>Accommodation: ${data.budgetBreakdown.accommodation}</p>
            <p>Food: ${data.budgetBreakdown.food}</p>
            <p>Transport: ${data.budgetBreakdown.transport}</p>
            <p>Activities: ${data.budgetBreakdown.activities}</p>
          </div>

          ${data.itinerary.map((day: any) => `
            <div class="day">
              <h3>${day.title} (${day.date})</h3>
              ${day.activities.map((activity: any) => `
                <div class="activity">
                  <strong>${activity.time}</strong> - ${activity.activity}<br>
                  📍 ${activity.location}<br>
                  💰 ${activity.cost}<br>
                  ${activity.description}
                </div>
              `).join('')}
              <p><strong>Day Total: ${day.totalCost}</strong></p>
            </div>
          `).join('')}

          <div class="emergency">
            <h2>Emergency Contacts</h2>
            <p>Tourist Helpline: 1363</p>
            <p>Police: 100</p>
            <p>Medical Emergency: 108</p>
            <p>Fire: 101</p>
          </div>

          <div style="margin-top: 30px; padding: 15px; background: #f0f9ff; border-radius: 8px;">
            <h2>Essential Documents</h2>
            ${data.documents.map((doc: string) => `<p>• ${doc}</p>`).join('')}
          </div>
        </body>
      </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.title.replace(/\s+/g, '_')}_Offline_Itinerary.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: FileText },
    { id: "itinerary", label: "Day by Day", icon: Calendar },
    { id: "budget", label: "Budget", icon: IndianRupee },
    { id: "crowd", label: "Crowds", icon: Users },
    { id: "group", label: "Group", icon: Users },
    { id: "map", label: "Places", icon: MapPin },
    { id: "documents", label: "Documents", icon: Download }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full"
        >
          <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl font-['Roboto_Slab'] font-bold">
                  {data.title}
                </DialogTitle>
                <div className="flex items-center space-x-4 mt-2 text-orange-100">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {data.duration}
                  </div>
                  <div className="flex items-center">
                    <IndianRupee className="w-4 h-4 mr-1" />
                    {data.budget}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {data.bestTime}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReplan("weather")}
                    disabled={isReplanning}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    {isReplanning ? (
                      <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                    ) : (
                      <Route className="w-4 h-4 mr-1" />
                    )}
                    {isReplanning ? "Replanning..." : "Replan"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateOfflineItinerary}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Wifi className="w-4 h-4 mr-1" />
                    Offline Mode
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {isReplanning && (
                  <div className="text-orange-100 text-sm">
                    <AlertTriangle className="w-4 h-4 inline mr-1" />
                    Adjusting for {replanReason}...
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onOpenChange(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="flex h-[70vh]">
            {/* Sidebar Navigation */}
            <div className="w-48 border-r bg-gray-50 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "bg-orange-100 text-orange-700"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {activeTab === "overview" && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-8"
                      >
                        {/* Enhanced Image Carousel */}
                        <div className="space-y-4">
                          <h3 className="text-xl font-['Roboto_Slab'] font-semibold text-gray-800 mb-6">
                            Destination Gallery
                          </h3>
                          <div className="grid grid-cols-3 gap-6">
                            <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                              <ImageWithFallback
                                src="https://images.unsplash.com/photo-1588068747940-76c095269f83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBiYWNrd2F0ZXJzJTIwaG91c2Vib2F0fGVufDF8fHx8MTc1NzYxMTU5MXww&ixlib=rb-4.1.0&q=80&w=1080"
                                alt="Kerala Backwaters Houseboat"
                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                                <div className="absolute bottom-4 left-4 text-white">
                                  <p className="text-sm font-medium">Backwater Cruise</p>
                                </div>
                              </div>
                              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Camera className="w-5 h-5 text-white drop-shadow-lg" />
                              </div>
                            </div>
                            
                            <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                              <ImageWithFallback
                                src="https://images.unsplash.com/photo-1715933840037-a48f901498d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBzcGljZSUyMHBsYW50YXRpb258ZW58MXx8fHwxNzU3NjEwNDk3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                                alt="Kerala Spice Plantation"
                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                                <div className="absolute bottom-4 left-4 text-white">
                                  <p className="text-sm font-medium">Spice Gardens</p>
                                </div>
                              </div>
                              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Camera className="w-5 h-5 text-white drop-shadow-lg" />
                              </div>
                            </div>
                            
                            <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                              <ImageWithFallback
                                src="https://images.unsplash.com/photo-1719400525704-dca5a44747c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBheXVydmVkYSUyMHNwYXxlbnwxfHx8fDE3NTc2MTA1MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                                alt="Kerala Ayurveda Spa"
                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                                <div className="absolute bottom-4 left-4 text-white">
                                  <p className="text-sm font-medium">Wellness & Spa</p>
                                </div>
                              </div>
                              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Camera className="w-5 h-5 text-white drop-shadow-lg" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Info Cards Grid */}
                        <div className="grid grid-cols-2 gap-6">
                          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
                            <CardHeader className="pb-4 pt-6 px-6">
                              <CardTitle className="text-lg font-['Roboto_Slab'] font-semibold flex items-center text-gray-800">
                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                                  <Calendar className="w-5 h-5 text-blue-600" />
                                </div>
                                Best Time to Visit
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-6 pb-6">
                              <div className="space-y-3">
                                <div className="bg-blue-50 rounded-xl p-4">
                                  <p className="text-blue-900 font-medium mb-1">{data.season}</p>
                                  <p className="text-blue-700 text-sm">
                                    Optimal weather conditions for outdoor activities
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span>Perfect time: {data.bestTime}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
                            <CardHeader className="pb-4 pt-6 px-6">
                              <CardTitle className="text-lg font-['Roboto_Slab'] font-semibold flex items-center text-gray-800">
                                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mr-3">
                                  <Star className="w-5 h-5 text-amber-600" />
                                </div>
                                Top Highlights
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-6 pb-6">
                              <div className="space-y-3">
                                <div className="grid grid-cols-1 gap-2">
                                  {data.famousPlaces.slice(0, 3).map((place: any, index: number) => (
                                    <div key={index} className="flex items-center space-x-3 bg-amber-50 rounded-xl p-3">
                                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                      <span className="text-amber-900 text-sm font-medium flex-1">
                                        {place.name.split(',')[0]}
                                      </span>
                                      <Badge variant="outline" className="text-xs bg-white border-amber-200 text-amber-700">
                                        Must-see
                                      </Badge>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Enhanced Action Buttons */}
                        <div className="bg-gray-50 rounded-2xl p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-lg font-['Roboto_Slab'] font-semibold text-gray-800 mb-1">
                                Ready to explore?
                              </h4>
                              <p className="text-sm text-gray-600">
                                Download your complete itinerary or share with friends
                              </p>
                            </div>
                            <div className="flex space-x-3">
                              <Button 
                                onClick={generateOfflineItinerary}
                                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download PDF
                              </Button>
                              <Button 
                                variant="outline" 
                                className="border-gray-300 hover:bg-gray-100 px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                              >
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "itinerary" && (
                      <motion.div
                        key="itinerary"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        {data.itinerary.map((day: ItineraryDay, index: number) => (
                          <Card key={index}>
                            <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100">
                              <CardTitle className="flex items-center justify-between">
                                <span className="flex items-center">
                                  <Calendar className="w-5 h-5 mr-2 text-orange-500" />
                                  {day.title}
                                </span>
                                <Badge variant="outline">{day.totalCost}</Badge>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                              <div className="space-y-3">
                                {day.activities.map((activity, actIndex) => (
                                  <div key={actIndex} className="flex">
                                    <div className="w-20 text-sm text-muted-foreground font-mono">
                                      {activity.time}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between">
                                        <h4 className="font-medium">{activity.activity}</h4>
                                        <span className="text-sm text-green-600 font-semibold">
                                          {activity.cost}
                                        </span>
                                      </div>
                                      <p className="text-sm text-muted-foreground">
                                        📍 {activity.location}
                                      </p>
                                      <p className="text-sm mt-1">{activity.description}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </motion.div>
                    )}

                    {activeTab === "budget" && (
                      <motion.div
                        key="budget"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6"
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <IndianRupee className="w-5 h-5 mr-2 text-orange-500" />
                              Budget Breakdown
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {Object.entries(data.budgetBreakdown).map(([category, amount]) => (
                                <div key={category} className="flex items-center justify-between">
                                  <span className="capitalize">{category}</span>
                                  <span className="font-semibold text-green-600">{amount}</span>
                                </div>
                              ))}
                              <Separator />
                              <div className="flex items-center justify-between text-lg font-bold">
                                <span>Total Budget</span>
                                <span className="text-orange-600">{data.budget}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>Cost Saving Tips</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm">
                              <li>• Book accommodations in advance for better rates</li>
                              <li>• Travel during off-season for 20-30% savings</li>
                              <li>• Use public transport where available</li>
                              <li>• Try local restaurants for authentic & affordable food</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}

                    {activeTab === "map" && (
                      <motion.div
                        key="map"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <MapPin className="w-5 h-5 mr-2 text-orange-500" />
                              Famous Places to Visit
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {data.famousPlaces.map((place: any, index: number) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                  <div>
                                    <h4 className="font-medium">{place.name}</h4>
                                    <p className="text-sm text-muted-foreground">
                                      Lat: {place.lat}, Lng: {place.lng}
                                    </p>
                                  </div>
                                  <Button size="sm" variant="outline">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    View on Map
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>Transportation Options</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-3 gap-4 text-center">
                              <div className="p-3 bg-blue-50 rounded-lg">
                                <Plane className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                                <p className="text-sm font-medium">Flight</p>
                                <p className="text-xs text-muted-foreground">Fastest option</p>
                              </div>
                              <div className="p-3 bg-green-50 rounded-lg">
                                <Train className="w-8 h-8 mx-auto mb-2 text-green-600" />
                                <p className="text-sm font-medium">Train</p>
                                <p className="text-xs text-muted-foreground">Scenic & affordable</p>
                              </div>
                              <div className="p-3 bg-orange-50 rounded-lg">
                                <Car className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                                <p className="text-sm font-medium">Road</p>
                                <p className="text-xs text-muted-foreground">Flexible timing</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}

                    {activeTab === "documents" && (
                      <motion.div
                        key="documents"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6"
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <FileText className="w-5 h-5 mr-2 text-orange-500" />
                              Required Documents
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {data.documents.map((doc: string, index: number) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                  <span className="text-sm">{doc}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Download className="w-5 h-5 mr-2 text-orange-500" />
                              Essential Items Checklist
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {data.essentialItems.map((item: string, index: number) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className="text-sm">{item}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        <div className="flex space-x-3">
                          <Button className="bg-orange-600 hover:bg-orange-700">
                            <Download className="w-4 h-4 mr-2" />
                            Download Checklist
                          </Button>
                          <Button variant="outline">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share with Family
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "crowd" && (
                      <motion.div
                        key="crowd"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6"
                      >
                        <div className="grid gap-4">
                          <CrowdPredictor attraction="Taj Mahal" />
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">Today's Crowd Highlights</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="bg-green-50 p-3 rounded-lg">
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className="text-sm font-medium">Best Time: 6-7 AM</span>
                                </div>
                                <p className="text-xs text-green-700 mt-1">
                                  Minimal crowds and perfect lighting for photos
                                </p>
                              </div>
                              <div className="bg-orange-50 p-3 rounded-lg">
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                  <span className="text-sm font-medium">Avoid: 12-3 PM</span>
                                </div>
                                <p className="text-xs text-orange-700 mt-1">
                                  Peak crowds and harsh sunlight
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "group" && (
                      <motion.div
                        key="group"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6"
                      >
                        <GroupCoordination />
                        <DynamicBudgetAnalyzer totalBudget={parseInt(data.budget.replace(/[^\d]/g, ''))} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollArea>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}