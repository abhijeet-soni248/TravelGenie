import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Clock, MapPin, IndianRupee, Download, Share2, Heart, Navigation } from "lucide-react";
import { motion } from "motion/react";

const sampleItinerary = {
  destination: "Kerala Backwaters",
  duration: "5 Days",
  totalCost: "₹18,500",
  days: [
    {
      day: 1,
      title: "Arrival in Kochi",
      activities: [
        {
          time: "10:00 AM",
          activity: "Airport pickup and hotel check-in",
          location: "Kochi International Airport",
          cost: "₹800",
          type: "transport"
        },
        {
          time: "2:00 PM",
          activity: "Explore Fort Kochi & Chinese Fishing Nets",
          location: "Fort Kochi",
          cost: "Free",
          type: "sightseeing"
        },
        {
          time: "6:00 PM",
          activity: "Sunset at Marine Drive",
          location: "Marine Drive",
          cost: "Free",
          type: "leisure"
        },
        {
          time: "8:00 PM",
          activity: "Traditional Kerala dinner",
          location: "Local Restaurant",
          cost: "₹1,200",
          type: "food"
        }
      ]
    },
    {
      day: 2,
      title: "Journey to Alleppey",
      activities: [
        {
          time: "9:00 AM",
          activity: "Travel to Alleppey",
          location: "Kochi to Alleppey",
          cost: "₹600",
          type: "transport"
        },
        {
          time: "12:00 PM",
          activity: "Houseboat check-in",
          location: "Alleppey Backwaters",
          cost: "₹8,000",
          type: "accommodation"
        },
        {
          time: "2:00 PM",
          activity: "Backwater cruise & lunch on boat",
          location: "Vembanad Lake",
          cost: "Included",
          type: "activity"
        },
        {
          time: "6:00 PM",
          activity: "Village walk and coconut farm visit",
          location: "Local Village",
          cost: "₹500",
          type: "cultural"
        }
      ]
    },
    {
      day: 3,
      title: "Backwater Exploration",
      activities: [
        {
          time: "7:00 AM",
          activity: "Sunrise yoga on houseboat deck",
          location: "Houseboat",
          cost: "Free",
          type: "wellness"
        },
        {
          time: "9:00 AM",
          activity: "Traditional Kerala breakfast",
          location: "Houseboat",
          cost: "Included",
          type: "food"
        },
        {
          time: "11:00 AM",
          activity: "Canoe ride through narrow canals",
          location: "Kumrakom Backwaters",
          cost: "₹1,500",
          type: "activity"
        },
        {
          time: "4:00 PM",
          activity: "Spice garden visit",
          location: "Local Spice Farm",
          cost: "₹800",
          type: "educational"
        }
      ]
    }
  ]
};

const activityIcons = {
  transport: "🚗",
  sightseeing: "🏛️",
  leisure: "🌅",
  food: "🍽️",
  accommodation: "🏨",
  activity: "🚤",
  cultural: "🏘️",
  wellness: "🧘",
  educational: "🌿"
};

export function ItineraryDisplay() {
  const [selectedDay, setSelectedDay] = useState(0);

  return (
    <section id="my-trips" className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-['Roboto_Slab'] font-bold mb-4">
            Your AI-Generated Itinerary
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-['Open_Sans']">
            Here's your personalized travel plan with day-wise activities and budget breakdown
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Itinerary Header */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                  <div className="font-semibold">{sampleItinerary.destination}</div>
                  <div className="text-sm text-muted-foreground">Destination</div>
                </div>
                <div className="text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold">{sampleItinerary.duration}</div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                </div>
                <div className="text-center">
                  <IndianRupee className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <div className="font-semibold">{sampleItinerary.totalCost}</div>
                  <div className="text-sm text-muted-foreground">Total Cost</div>
                </div>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Day-wise Itinerary */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Day Navigation */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Days</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {sampleItinerary.days.map((day, index) => (
                    <Button
                      key={day.day}
                      variant={selectedDay === index ? "secondary" : "ghost"}
                      className="w-full justify-start h-auto p-4 flex-col items-start"
                      onClick={() => setSelectedDay(index)}
                    >
                      <div className="font-semibold">Day {day.day}</div>
                      <div className="text-sm text-muted-foreground">{day.title}</div>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Day Details */}
            <div className="lg:col-span-3">
              <motion.div
                key={selectedDay}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-['Roboto_Slab']">
                      Day {sampleItinerary.days[selectedDay].day}: {sampleItinerary.days[selectedDay].title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {sampleItinerary.days[selectedDay].activities.map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex gap-4 p-4 bg-white rounded-lg border"
                        >
                          <div className="text-2xl">
                            {activityIcons[activity.type as keyof typeof activityIcons]}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-semibold">{activity.time}</div>
                              <Badge variant="secondary" className="text-xs">
                                {activity.type}
                              </Badge>
                            </div>
                            <h4 className="font-semibold mb-1">{activity.activity}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {activity.location}
                              </div>
                              <div className="flex items-center">
                                <IndianRupee className="w-3 h-3 mr-1" />
                                {activity.cost}
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Navigation className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center mt-8 space-x-4">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              Customize Itinerary
            </Button>
            <Button variant="outline" size="lg">
              Book This Trip
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}