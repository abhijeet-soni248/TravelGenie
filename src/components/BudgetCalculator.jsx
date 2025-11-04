import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Progress } from "./ui/progress";
import { ItineraryModal } from "./ItineraryModal";
import { IndianRupee, Plane, Hotel, Utensils, Camera, Users } from "lucide-react";

export function BudgetCalculator() {
  const [days, setDays] = useState([7]);
  const [people, setPeople] = useState([2]);
  const [accommodation, setAccommodation] = useState("mid");
  const [transport, setTransport] = useState("train");
  const [destination, setDestination] = useState("");
  const [customBudget, setCustomBudget] = useState("");
  const [customTransport, setCustomTransport] = useState("");
  const [isItineraryModalOpen, setIsItineraryModalOpen] = useState(false);

  const handleCreateItinerary = () => {
    setIsItineraryModalOpen(true);
  };

  // Budget calculation logic
  const accommodationRates = {
    hostel: 800,
    budget: 1500,
    guesthouse: 2200,
    mid: 3500,
    boutique: 5500,
    luxury: 8000,
    resort: 12000,
    premium: 15000,
    custom: parseInt(customBudget) || 3500
  };

  const transportRates = {
    bus: 500,
    train: 1200,
    cab: 2000,
    flight: 4000,
    rental: 1800,
    custom: parseInt(customTransport) || 1200
  };

  const baseAccommodation = accommodationRates[accommodation] || 3500;
  const baseTransport = transportRates[transport] || 1200;
  const foodPerDay = accommodation === "budget" ? 800 : accommodation === "mid" ? 1500 : accommodation === "luxury" ? 2500 : 4000;
  const activitiesPerDay = 1000;

  const totalAccommodation = baseAccommodation * days[0] * people[0];
  const totalTransport = baseTransport * people[0];
  const totalFood = foodPerDay * days[0] * people[0];
  const totalActivities = activitiesPerDay * days[0] * people[0];
  
  const grandTotal = totalAccommodation + totalTransport + totalFood + totalActivities;

  return (
    <section id="budget-calculator" className="py-16 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-['Roboto_Slab'] font-bold mb-4">
            Budget Calculator
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-['Open_Sans']">
            Get an accurate estimate of your travel costs in Indian Rupees
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <IndianRupee className="w-5 h-5 mr-2 text-orange-600" />
                Trip Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kerala">Kerala</SelectItem>
                    <SelectItem value="rajasthan">Rajasthan</SelectItem>
                    <SelectItem value="goa">Goa</SelectItem>
                    <SelectItem value="himachal">Himachal Pradesh</SelectItem>
                    <SelectItem value="kashmir">Kashmir</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Number of Days: {days[0]}</Label>
                <Slider
                  value={days}
                  onValueChange={setDays}
                  max={14}
                  min={3}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Number of People: {people[0]}</Label>
                <Slider
                  value={people}
                  onValueChange={setPeople}
                  max={8}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Accommodation Type</Label>
                <Select value={accommodation} onValueChange={setAccommodation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hostel">Hostel (₹800/night)</SelectItem>
                    <SelectItem value="budget">Budget Hotel (₹1,500/night)</SelectItem>
                    <SelectItem value="guesthouse">Guesthouse (₹2,200/night)</SelectItem>
                    <SelectItem value="mid">Mid-range Hotel (₹3,500/night)</SelectItem>
                    <SelectItem value="boutique">Boutique Hotel (₹5,500/night)</SelectItem>
                    <SelectItem value="luxury">Luxury Hotel (₹8,000/night)</SelectItem>
                    <SelectItem value="resort">Resort (₹12,000/night)</SelectItem>
                    <SelectItem value="premium">Premium Resort (₹15,000/night)</SelectItem>
                    <SelectItem value="custom">Custom Budget</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Transportation</Label>
                <Select value={transport} onValueChange={setTransport}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bus">Bus (₹500/person)</SelectItem>
                    <SelectItem value="train">Train (₹1,200/person)</SelectItem>
                    <SelectItem value="cab">Taxi/Cab (₹2,000/person)</SelectItem>
                    <SelectItem value="rental">Car Rental (₹1,800/person)</SelectItem>
                    <SelectItem value="flight">Flight (₹4,000/person)</SelectItem>
                    <SelectItem value="custom">Custom Transport</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Budget Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-['Roboto_Slab']">
                Total Cost: ₹{grandTotal.toLocaleString('en-IN')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Accommodation */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Hotel className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Accommodation</span>
                  </div>
                  <span className="font-semibold">₹{totalAccommodation.toLocaleString('en-IN')}</span>
                </div>
                <Progress value={(totalAccommodation / grandTotal) * 100} className="h-2" />
              </div>

              {/* Transport */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Plane className="w-4 h-4 mr-2 text-green-600" />
                    <span>Transportation</span>
                  </div>
                  <span className="font-semibold">₹{totalTransport.toLocaleString('en-IN')}</span>
                </div>
                <Progress value={(totalTransport / grandTotal) * 100} className="h-2" />
              </div>

              {/* Food */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Utensils className="w-4 h-4 mr-2 text-orange-600" />
                    <span>Food & Dining</span>
                  </div>
                  <span className="font-semibold">₹{totalFood.toLocaleString('en-IN')}</span>
                </div>
                <Progress value={(totalFood / grandTotal) * 100} className="h-2" />
              </div>

              {/* Activities */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Camera className="w-4 h-4 mr-2 text-purple-600" />
                    <span>Activities & Entry</span>
                  </div>
                  <span className="font-semibold">₹{totalActivities.toLocaleString('en-IN')}</span>
                </div>
                <Progress value={(totalActivities / grandTotal) * 100} className="h-2" />
              </div>

              <div className="pt-4 border-t">
                <div className="text-sm text-muted-foreground mb-4">
                  Per person cost: ₹{Math.round(grandTotal / people[0]).toLocaleString('en-IN')}
                </div>
                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  onClick={handleCreateItinerary}
                  disabled={!destination}
                >
                  Create Itinerary with This Budget
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ItineraryModal
        open={isItineraryModalOpen}
        onOpenChange={setIsItineraryModalOpen}
        destination={destination === "kerala" ? "Kerala Backwaters" : 
                   destination === "rajasthan" ? "Rajasthan Palaces" : 
                   destination === "himachal" ? "Himalayan Trek" : "Kerala Backwaters"}
        isGenerated={true}
      />
    </section>
  );
}