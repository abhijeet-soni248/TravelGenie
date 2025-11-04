import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent } from "./ui/card";
import { CalendarIcon, MapPin, Users, IndianRupee, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ItineraryModal } from "./ItineraryModal";
import { useState } from "react";
// import { format } from "date-fns";

export function HeroSection() {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [selectedDestination, setSelectedDestination] = useState<string>("");
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [isItineraryModalOpen, setIsItineraryModalOpen] = useState(false);

  const handleGenerateItinerary = () => {
    // Map selected destination to our available itineraries
    const destinationMap: Record<string, string> = {
      "kerala": "Kerala Backwaters",
      "rajasthan": "Rajasthan Palaces", 
      "himachal": "Himalayan Trek",
      "goa": "Kerala Backwaters", // Default to Kerala for demo
      "kashmir": "Himalayan Trek",
      "karnataka": "Rajasthan Palaces",
      "uttarakhand": "Himalayan Trek",
      "maharashtra": "Rajasthan Palaces",
      "tamil-nadu": "Kerala Backwaters",
      "west-bengal": "Kerala Backwaters"
    };

    const destination = destinationMap[selectedDestination] || "Kerala Backwaters";
    setIsItineraryModalOpen(true);
  };

  return (
    <section id="create-itinerary" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1646906853188-6de5d6c54017?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMHRyYXZlbCUyMGRlc3RpbmF0aW9ucyUyMG1vdW50YWlucyUyMHRlbXBsZXN8ZW58MXx8fHwxNzU3NDg4MTYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Beautiful Indian temple in mountains"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 container px-4 mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-['Roboto_Slab'] font-bold text-white mb-6">
            Discover Incredible India
            <span className="block text-orange-400">with AI-Powered Itineraries</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 font-['Open_Sans']">
            Create personalized travel plans for amazing destinations across India. 
            From the Himalayas to Kerala backwaters, let AI craft your perfect journey.
          </p>

          {/* Search Form */}
          <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Select onValueChange={setSelectedDestination}>
                    <SelectTrigger>
                      <MapPin className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Choose destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kerala">Kerala</SelectItem>
                      <SelectItem value="rajasthan">Rajasthan</SelectItem>
                      <SelectItem value="goa">Goa</SelectItem>
                      <SelectItem value="himachal">Himachal Pradesh</SelectItem>
                      <SelectItem value="kashmir">Kashmir</SelectItem>
                      <SelectItem value="karnataka">Karnataka</SelectItem>
                      <SelectItem value="uttarakhand">Uttarakhand</SelectItem>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                      <SelectItem value="west-bengal">West Bengal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Check-in</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkIn ? checkIn.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) : "Check-in"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelect={setCheckIn}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Check-out</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkOut ? checkOut.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) : "Check-out"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Budget (INR)</Label>
                  <Select onValueChange={setSelectedBudget}>
                    <SelectTrigger>
                      <IndianRupee className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">₹10,000 - ₹25,000</SelectItem>
                      <SelectItem value="mid">₹25,000 - ₹50,000</SelectItem>
                      <SelectItem value="luxury">₹50,000 - ₹1,00,000</SelectItem>
                      <SelectItem value="premium">₹1,00,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                className="w-full mt-6 bg-orange-600 hover:bg-orange-700 h-12 text-lg"
                onClick={handleGenerateItinerary}
                disabled={!selectedDestination}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Generate AI Itinerary
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-gray-300">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">6+</div>
              <div className="text-gray-300">Happy Travellers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">AI</div>
              <div className="text-gray-300">Powered</div>
            </div>
          </div>
        </div>
      </div>

      <ItineraryModal
        open={isItineraryModalOpen}
        onOpenChange={setIsItineraryModalOpen}
        destination={selectedDestination ? (selectedDestination === "kerala" ? "Kerala Backwaters" : 
                     selectedDestination === "rajasthan" ? "Rajasthan Palaces" : 
                     selectedDestination === "himachal" ? "Himalayan Trek" : "Kerala Backwaters") : "Kerala Backwaters"}
        isGenerated={true}
      />
    </section>
  );
}