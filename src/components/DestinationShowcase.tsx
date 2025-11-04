import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ItineraryModal } from "./ItineraryModal";
import { MapPin, Clock, IndianRupee, Star } from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Kerala Backwaters",
    location: "Kerala",
    image: "https://images.unsplash.com/photo-1708868065091-a6f0ac265dfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBiZWFjaCUyMGdvYSUyMGtlcmFsYXxlbnwxfHx8fDE3NTc0ODgxNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "5-7 days",
    budget: "₹15,000",
    rating: 4.8,
    tags: ["Houseboats", "Nature", "Relaxation"],
    description: "Experience the serene backwaters of Kerala on traditional houseboats."
  },
  {
    id: 2,
    name: "Rajasthan Palaces",
    location: "Rajasthan",
    image: "https://images.unsplash.com/photo-1712944381367-2aa9f8f5d97d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMHJhamFzdGhhbiUyMHBhbGFjZSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NTc0ODgxNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "7-10 days",
    budget: "₹35,000",
    rating: 4.9,
    tags: ["Heritage", "Culture", "Architecture"],
    description: "Explore magnificent palaces and forts in the royal state of Rajasthan."
  },
  {
    id: 3,
    name: "Himalayan Trek",
    location: "Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1676623149255-7ae9f48dfcd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YXMlMjBtb3VudGFpbnMlMjBpbmRpYSUyMHRyZWt8ZW58MXx8fHwxNzU3NDg4MTY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "6-8 days",
    budget: "₹25,000",
    rating: 4.7,
    tags: ["Adventure", "Mountains", "Trekking"],
    description: "Challenge yourself with breathtaking treks in the mighty Himalayas."
  }
];

export function DestinationShowcase() {
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [isItineraryModalOpen, setIsItineraryModalOpen] = useState(false);

  const handleViewItinerary = (destinationName: string) => {
    setSelectedDestination(destinationName);
    setIsItineraryModalOpen(true);
  };

  return (
    <section id="destinations" className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-['Roboto_Slab'] font-bold mb-4">
            Popular Destinations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-['Open_Sans']">
            Discover some of India's most stunning destinations with our AI-curated itineraries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
              <div className="relative">
                <ImageWithFallback
                  src={destination.image}s
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-black">
                    <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {destination.rating}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 text-orange-500 mr-1" />
                  <span className="text-sm text-muted-foreground">{destination.location}</span>
                </div>
                
                <h3 className="font-['Roboto_Slab'] text-xl font-semibold mb-2">
                  {destination.name}
                </h3>
                
                <p className="text-muted-foreground mb-4 font-['Open_Sans']">
                  {destination.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {destination.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-sm text-muted-foreground">{destination.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <IndianRupee className="w-4 h-4 text-green-600 mr-1" />
                    <span className="font-semibold text-green-600">{destination.budget}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  onClick={() => handleViewItinerary(destination.name)}
                >
                  View Itinerary
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-orange-600 text-orange-600 hover:bg-orange-50">
            Explore All Destinations
          </Button>
        </div>
      </div>

      <ItineraryModal
        open={isItineraryModalOpen}
        onOpenChange={setIsItineraryModalOpen}
        destination={selectedDestination || "Kerala Backwaters"}
      />
    </section>
  );
}