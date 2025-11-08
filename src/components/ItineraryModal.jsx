import { useState } from "react";
import { Dialog, DialogContentFullscreen, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
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
  ShoppingCart,
  Star,
  X,
  RefreshCw,
  Wifi,
  BarChart3,
  Route,
  AlertTriangle
} from "lucide-react";

export function ItineraryModal({ open, onOpenChange, destination = "", isGenerated = false, data = null }) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedDay, setSelectedDay] = useState(1);

  const itineraryData = data || {
    title: `${destination} Adventure`,
    duration: "5 Days",
    budget: "₹25,000",
    season: "October to March",
    bestTime: "November to February",
    images: [
      "https://source.unsplash.com/random/1200x800/?india,travel",
      "https://source.unsplash.com/random/1200x800/?india,culture",
      "https://source.unsplash.com/random/1200x800/?india,food"
    ],
    famousPlaces: [
      { name: "Famous Place 1", lat: 20.5937, lng: 78.9629 },
      { name: "Famous Place 2", lat: 21.5937, lng: 79.9629 },
      { name: "Famous Place 3", lat: 22.5937, lng: 80.9629 }
    ],
    itinerary: [
      {
        day: 1,
        date: "Day 1",
        title: "Arrival & City Tour",
        activities: [
          {
            time: "10:00 AM",
            activity: "Check-in at Hotel",
            location: "City Center",
            cost: "₹0",
            description: "Hotel check-in and freshen up"
          }
        ],
        totalCost: "₹5,000"
      }
    ],
    budgetBreakdown: {
      accommodation: "₹10,000",
      food: "₹5,000",
      transport: "₹6,000",
      activities: "₹4,000"
    },
    documents: [
      "Valid ID Proof",
      "Travel Insurance",
      "Hotel Bookings",
      "Transport Tickets"
    ],
    essentialItems: [
      "Comfortable Clothes",
      "Walking Shoes",
      "Camera",
      "First Aid Kit"
    ]
  };

  if (!itineraryData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContentFullscreen className="flex flex-col h-full p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            <span>{itineraryData.title}</span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            View your personalized travel itinerary with details about activities, costs, and essential information.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 px-2 overflow-hidden min-h-0 max-h-[85vh]">
          <div className="grid grid-cols-1 lg:[grid-template-columns:280px_1fr_320px] gap-6 h-full">
            {/* LEFT: Gallery & Quick Info */}
            <div className="col-span-1 space-y-4 min-h-0">
              <Card>
                <CardContent className="p-4">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                    <AnimatePresence>
                      <motion.img
                        key={activeImage}
                        src={itineraryData.images[activeImage]}
                        alt={`${destination} view ${activeImage + 1}`}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    </AnimatePresence>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {itineraryData.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`overflow-hidden rounded-md transition-shadow focus:outline-none ${idx === activeImage ? 'ring-2 ring-primary' : 'ring-1 ring-transparent'}`}
                        aria-label={`View image ${idx + 1}`}
                      >
                        <img src={img} alt={`thumb-${idx}`} className="h-16 w-28 object-cover" />
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Clock className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle className="text-sm font-medium mb-1">Duration</CardTitle>
                    <p className="text-sm text-muted-foreground">{itineraryData.duration}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <IndianRupee className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle className="text-sm font-medium mb-1">Budget</CardTitle>
                    <p className="text-sm text-muted-foreground">{itineraryData.budget}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Calendar className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle className="text-sm font-medium mb-1">Season</CardTitle>
                    <p className="text-sm text-muted-foreground">{itineraryData.season}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Star className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle className="text-sm font-medium mb-1">Best Time</CardTitle>
                    <p className="text-sm text-muted-foreground">{itineraryData.bestTime}</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Famous Places
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {itineraryData.famousPlaces.map((place, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Badge variant="outline" className="shrink-0">
                          {idx + 1}
                        </Badge>
                        <div>
                          <p className="font-medium">{place.name}</p>
                          <p className="text-sm text-muted-foreground">{place.lat.toFixed(4)}, {place.lng.toFixed(4)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <CrowdPredictor attraction={itineraryData.famousPlaces[0].name} />
              <GroupCoordination />
            </div>

            {/* MIDDLE: Itinerary */}
            <div className="col-span-1 space-y-4 min-h-0 min-w-0 overflow-auto">
              {itineraryData.itinerary.map((day) => (
                <Card key={day.day}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">Day {day.day}: {day.title}</span>
                      <Badge variant="outline">{day.totalCost}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {day.activities.map((activity, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="w-20 text-sm font-medium">{activity.time}</div>
                          <div className="flex-1">
                            <p className="font-medium">{activity.activity}</p>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                            <div className="flex items-center gap-4 mt-1 text-sm">
                              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {activity.location}</span>
                              <span className="flex items-center gap-1"><IndianRupee className="h-3 w-3" /> {activity.cost}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* RIGHT: Planning & Tools */}
            <div className="col-span-1 space-y-4 min-h-0">
              <DynamicBudgetAnalyzer totalBudget={parseInt(itineraryData.budget.replace(/[^0-9]/g, ""))} />

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" /> Required Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2">
                    {itineraryData.documents.map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> <span className="text-sm">{doc}</span></div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><ShoppingCart className="h-5 w-5" /> Essential Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2">
                    {itineraryData.essentialItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> <span className="text-sm">{item}</span></div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </ScrollArea>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          {isGenerated && (
            <Button className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Regenerate
            </Button>
          )}
        </div>
      </DialogContentFullscreen>
    </Dialog>
  );
}