import { useState } from "react";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";
import { ScrollArea } from "./ui/scroll-area.jsx";
import { Badge } from "./ui/badge.jsx";
import { motion, AnimatePresence } from "motion/react";
import { 
  CloudRain, 
  Sun, 
  Cloud, 
  Thermometer, 
  Eye, 
  Wind, 
  Droplets,
  AlertTriangle,
  CheckCircle,
  X,
  Calendar,
  Navigation,
  Search,
  MapPin,
  Umbrella,
  Shirt,
  Camera,
  Car
} from "lucide-react";

const mockWeatherData = {
  location: "Kerala, India",
  current: {
    temp: 28,
    condition: "Partly Cloudy",
    humidity: 75,
    windSpeed: 12,
    visibility: 8,
    icon: "partly-cloudy"
  },
  forecast: [
    { day: "Today", temp: { min: 24, max: 30 }, condition: "Partly Cloudy", icon: "partly-cloudy", rainChance: 20 },
    { day: "Tomorrow", temp: { min: 23, max: 29 }, condition: "Light Rain", icon: "rain", rainChance: 60 },
    { day: "Thu", temp: { min: 22, max: 27 }, condition: "Heavy Rain", icon: "heavy-rain", rainChance: 85 },
    { day: "Fri", temp: { min: 24, max: 28 }, condition: "Cloudy", icon: "cloudy", rainChance: 40 },
    { day: "Sat", temp: { min: 25, max: 31 }, condition: "Sunny", icon: "sunny", rainChance: 10 }
  ],
  alerts: [
    { type: 'warning', message: 'Heavy rain expected Thursday. Consider indoor activities.' },
    { type: 'info', message: 'Monsoon season is ideal for backwater tours but pack waterproof gear.' }
  ],
  travelAdvice: [
    { category: 'Transportation', advice: 'Road conditions may be affected by rain on Thursday. Allow extra travel time.', severity: 'medium' },
    { category: 'Activities', advice: 'Perfect weather for outdoor sightseeing today and tomorrow morning.', severity: 'low' },
    { category: 'Packing', advice: 'Pack waterproof clothing and umbrella for mid-week rain.', severity: 'medium' },
    { category: 'Health', advice: 'High humidity levels. Stay hydrated and take breaks in shade.', severity: 'low' }
  ]
};

const weatherActivities = {
  sunny: [
    { icon: Camera, activity: "Visit outdoor monuments", description: "Perfect weather for Taj Mahal, Red Fort photography" },
    { icon: Car, activity: "Hill station day trips", description: "Clear roads for Shimla, Ooty, Darjeeling drives" },
    { icon: Sun, activity: "Beach activities", description: "Goa beaches, water sports, sunset viewing" }
  ],
  rainy: [
    { icon: Umbrella, activity: "Museum tours", description: "National Museum Delhi, Indian Museum Kolkata" },
    { icon: Shirt, activity: "Shopping malls", description: "Local markets, covered bazaars, craft centers" },
    { icon: Camera, activity: "Palace interiors", description: "Mysore Palace, City Palace Jaipur tours" }
  ],
  cloudy: [
    { icon: Camera, activity: "Heritage walks", description: "Old Delhi walks, heritage site exploration" },
    { icon: Car, activity: "Garden visits", description: "Mughal Gardens, botanical parks, nature trails" },
    { icon: Shirt, activity: "Local experiences", description: "Cooking classes, traditional craft workshops" }
  ]
};

export function WeatherAI({ isOpen, onClose }) {
  const [selectedDay, setSelectedDay] = useState(0);
  const [location, setLocation] = useState("Kerala, India");
  const [customCity, setCustomCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("current"); // current, forecast, activities

  const handleCitySearch = async () => {
    if (!customCity.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLocation(customCity);
      setCustomCity("");
      setIsLoading(false);
    }, 1500);
  };

  const getWeatherIcon = (iconType) => {
    switch (iconType) {
      case 'sunny': return <Sun className="w-6 h-6 text-yellow-500" />;
      case 'partly-cloudy': return <Cloud className="w-6 h-6 text-blue-400" />;
      case 'cloudy': return <Cloud className="w-6 h-6 text-gray-500" />;
      case 'rain': return <CloudRain className="w-6 h-6 text-blue-600" />;
      case 'heavy-rain': return <CloudRain className="w-6 h-6 text-blue-800" />;
      default: return <Sun className="w-6 h-6 text-yellow-500" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCurrentWeatherType = () => {
    const condition = mockWeatherData.current.condition.toLowerCase();
    if (condition.includes('rain')) return 'rainy';
    if (condition.includes('cloud')) return 'cloudy';
    return 'sunny';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 right-20 w-96 max-w-[calc(100vw-2rem)] h-[70vh] z-50"
        >
          <Card className="h-full shadow-2xl border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CloudRain className="h-5 w-5" />
                  <CardTitle className="text-lg">Travel Weather AI</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-white hover:bg-blue-700 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-blue-100 text-sm">Real-time weather insights for your trip</p>
            </CardHeader>
            
            <ScrollArea className="h-[calc(100%-5rem)]">
              <CardContent className="p-4 space-y-4">
                {/* City Search */}
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <Input
                        placeholder="Enter Indian city name..."
                        value={customCity}
                        onChange={(e) => setCustomCity(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleCitySearch()}
                        className="pr-10"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-1 top-1 h-8 w-8"
                        onClick={handleCitySearch}
                        disabled={isLoading || !customCity.trim()}
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Quick City Selection */}
                  <div className="flex flex-wrap gap-1">
                    {["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"].map((city) => (
                      <Button
                        key={city}
                        variant="outline"
                        size="sm"
                        className="text-xs h-6"
                        onClick={() => setCustomCity(city)}
                      >
                        {city}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                  {[
                    { id: "current", label: "Current" },
                    { id: "forecast", label: "5-Day" },
                    { id: "activities", label: "Activities" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 px-3 py-1.5 text-sm rounded-md transition-colors ${
                        activeTab === tab.id
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Current Weather Tab */}
                {activeTab === "current" && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">{location}</h3>
                        <Navigation className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex items-center space-x-4">
                        {getWeatherIcon(mockWeatherData.current.icon)}
                        <div>
                          <div className="text-2xl font-bold text-gray-800">
                            {mockWeatherData.current.temp}°C
                          </div>
                          <div className="text-sm text-gray-600">
                            {mockWeatherData.current.condition}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mt-4 text-xs">
                        <div className="flex items-center space-x-1">
                          <Droplets className="w-3 h-3 text-blue-500" />
                          <span>{mockWeatherData.current.humidity}%</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Wind className="w-3 h-3 text-gray-500" />
                          <span>{mockWeatherData.current.windSpeed} km/h</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3 text-gray-500" />
                          <span>{mockWeatherData.current.visibility} km</span>
                        </div>
                      </div>
                    </div>

                    {/* Weather Alerts */}
                    {mockWeatherData.alerts.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2 flex items-center">
                          <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" />
                          Weather Alerts
                        </h3>
                        <div className="space-y-2">
                          {mockWeatherData.alerts.map((alert, index) => (
                            <div
                              key={index}
                              className={`p-3 rounded-lg border ${
                                alert.type === 'warning' 
                                  ? 'bg-orange-50 border-orange-200 text-orange-800' 
                                  : 'bg-blue-50 border-blue-200 text-blue-800'
                              }`}
                            >
                              <div className="flex items-start space-x-2">
                                {alert.type === 'warning' ? (
                                  <AlertTriangle className="w-4 h-4 mt-0.5 text-orange-600" />
                                ) : (
                                  <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600" />
                                )}
                                <p className="text-sm">{alert.message}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 5-Day Forecast Tab */}
                {activeTab === "forecast" && (
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                      5-Day Forecast for {location}
                    </h3>
                    <div className="space-y-2">
                      {mockWeatherData.forecast.map((day, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedDay === index ? 'bg-blue-100 border border-blue-200' : 'bg-gray-50 hover:bg-gray-100'
                          }`}
                          onClick={() => setSelectedDay(index)}
                        >
                          <div className="flex items-center space-x-3">
                            {getWeatherIcon(day.icon)}
                            <div>
                              <div className="font-medium text-sm">{day.day}</div>
                              <div className="text-xs text-gray-500">{day.condition}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-sm">
                              {day.temp.max}°/{day.temp.min}°
                            </div>
                            <div className="text-xs text-blue-600">{day.rainChance}% rain</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Selected Day Details */}
                    {selectedDay !== null && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold mb-2">
                          {mockWeatherData.forecast[selectedDay].day} Details
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600">High/Low:</span>
                            <span className="ml-2 font-medium">
                              {mockWeatherData.forecast[selectedDay].temp.max}°/{mockWeatherData.forecast[selectedDay].temp.min}°
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Rain Chance:</span>
                            <span className="ml-2 font-medium text-blue-600">
                              {mockWeatherData.forecast[selectedDay].rainChance}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Weather & Activities Tab */}
                {activeTab === "activities" && (
                  <div className="space-y-4">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <Thermometer className="w-4 h-4 mr-2 text-green-600" />
                      Weather & Activities for {location}
                    </h3>
                    
                    {/* Current Weather Based Activities */}
                    <div>
                      <h4 className="font-medium mb-3 text-sm text-gray-700">
                        Recommended for Today's Weather
                      </h4>
                      <div className="space-y-2">
                        {weatherActivities[getCurrentWeatherType()]?.map((activity, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                            <activity.icon className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                              <div className="font-medium text-sm">{activity.activity}</div>
                              <div className="text-xs text-gray-600">{activity.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Travel Advice */}
                    <div>
                      <h4 className="font-medium mb-3 text-sm text-gray-700">
                        AI Travel Recommendations
                      </h4>
                      <div className="space-y-2">
                        {mockWeatherData.travelAdvice.map((advice, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg border ${getSeverityColor(advice.severity)}`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <Badge variant="outline" className="mb-2 text-xs">
                                  {advice.category}
                                </Badge>
                                <p className="text-sm">{advice.advice}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Action Suggestions */}
                    <div className="pt-3 border-t">
                      <h4 className="font-medium mb-3 text-sm text-gray-700">Quick Actions</h4>
                      <div className="grid grid-cols-1 gap-2">
                        <Button variant="outline" size="sm" className="text-xs justify-start">
                          <Camera className="w-3 h-3 mr-2" />
                          Find Indoor Photography Spots
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs justify-start">
                          <Car className="w-3 h-3 mr-2" />
                          Plan Weather-Safe Routes
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs justify-start">
                          <Shirt className="w-3 h-3 mr-2" />
                          Check Packing Recommendations
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </ScrollArea>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}