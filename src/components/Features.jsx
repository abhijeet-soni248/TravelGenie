import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Sparkles, MapPin, IndianRupee, Calendar, Share2, Download, Shield, Zap, Users, BarChart3, Wifi, TrendingUp, Clock, ChevronLeft, ChevronRight } from "lucide-react";

const innovationFeatures = [
  {
    icon: Clock,
    title: "Crowd & Queue Predictor",
    description: "AI-powered crowd analysis shows best visiting times and real-time queue lengths at popular attractions",
    highlight: "Smart Timing",
    category: "Innovation",
    details: {
      overview: "Our advanced AI analyzes historical data, social media trends, and real-time feeds to predict crowd levels at tourist attractions across India.",
      benefits: [
        "Avoid long queues at popular monuments like Taj Mahal",
        "Get optimal visiting times for temples and historical sites", 
        "Real-time crowd density updates",
        "Save 2-3 hours per day by timing visits perfectly"
      ],
      technology: "Machine Learning algorithms analyze visitor patterns, weather data, holidays, and events to provide 90% accurate crowd predictions."
    }
  },
  {
    icon: TrendingUp,
    title: "AI-Driven Replanning",
    description: "Dynamic itinerary adjustments based on weather, crowds, or personal preferences with one-click replanning",
    highlight: "Adaptive Planning",
    category: "Innovation",
    details: {
      overview: "Revolutionary AI that instantly replans your entire itinerary when conditions change, ensuring you never miss the best experiences.",
      benefits: [
        "Instant replanning when weather changes",
        "Alternative routes during traffic or closures",
        "Backup indoor activities during monsoons",
        "Preference-based itinerary variations"
      ],
      technology: "Real-time data processing with predictive algorithms that evaluate multiple scenarios and optimize your travel experience automatically."
    }
  },
  {
    icon: Users,
    title: "Group Coordination Hub",
    description: "Collaborative planning with voting, expense splitting, and real-time chat for group travel coordination",
    highlight: "Team Travel",
    category: "Innovation",
    details: {
      overview: "Advanced group travel management system that makes planning with friends and family seamless and democratic.",
      benefits: [
        "Democratic voting on destinations and activities",
        "Automatic expense splitting with UPI integration",
        "Real-time group chat and planning updates",
        "Shared itinerary management and notifications"
      ],
      technology: "Cloud-based collaboration platform with real-time synchronization and integrated payment processing."
    }
  },
  {
    icon: BarChart3,
    title: "Dynamic Budget Analyzer",
    description: "Real-time cost optimization with market price analysis and smart spending recommendations",
    highlight: "Smart Spending",
    category: "Innovation",
    details: {
      overview: "Intelligent budget management that continuously analyzes market prices and suggests cost optimizations throughout your trip.",
      benefits: [
        "Real-time price comparisons across platforms",
        "Dynamic budget reallocation suggestions",
        "Seasonal pricing insights and recommendations",
        "Expense tracking with category-wise analysis"
      ],
      technology: "Advanced price monitoring algorithms with machine learning-based spending pattern analysis."
    }
  },
  {
    icon: Wifi,
    title: "Offline Emergency Mode",
    description: "Complete offline access to itineraries, maps, and emergency contacts when connectivity is limited",
    highlight: "Always Accessible",
    category: "Innovation",
    details: {
      overview: "Comprehensive offline functionality ensures you're never stranded without access to critical travel information.",
      benefits: [
        "Full itinerary access without internet",
        "Offline maps with GPS navigation",
        "Emergency contact information always available",
        "Local language phrase book and translations"
      ],
      technology: "Progressive web app technology with intelligent data caching and offline-first architecture."
    }
  },
  {
    icon: TrendingUp,
    title: "Market Gap Showcase",
    description: "Discover unique, lesser-known destinations and experiences not found on other travel platforms",
    highlight: "Hidden Gems",
    category: "Innovation",
    details: {
      overview: "Exclusive access to undiscovered destinations and authentic local experiences that mainstream platforms miss.",
      benefits: [
        "Curated hidden gem destinations",
        "Local expert recommendations",
        "Authentic cultural experiences",
        "Sustainable tourism opportunities"
      ],
      technology: "Community-driven discovery platform powered by local insights and expert curation algorithms."
    }
  }
];

const coreFeatures = [
  {
    icon: Sparkles,
    title: "AI-Powered Itineraries",
    description: "Smart trip planning tailored to your preferences, budget, and travel style",
    highlight: "Personalized"
  },
  {
    icon: MapPin,
    title: "Interactive Maps",
    description: "Explore destinations with detailed maps, attractions, and local recommendations",
    highlight: "Detailed"
  },
  {
    icon: IndianRupee,
    title: "Budget Calculator",
    description: "Accurate cost estimates in INR with real-time pricing for Indian destinations",
    highlight: "Precise"
  },
  {
    icon: Calendar,
    title: "Weather Integration",
    description: "Weather-aware planning with seasonal recommendations and activity suggestions",
    highlight: "Smart"
  },
  {
    icon: Share2,
    title: "Social Sharing",
    description: "Share itineraries with friends and collaborate on travel plans seamlessly",
    highlight: "Collaborative"
  },
  {
    icon: Download,
    title: "Offline Access",
    description: "Download itineraries and maps for offline access during your travels",
    highlight: "Reliable"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your travel data is encrypted and protected with industry-standard security",
    highlight: "Protected"
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Get live updates on weather, traffic, and local conditions during your trip",
    highlight: "Current"
  }
];

export function Features() {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
    setModalOpen(true);
  };

  const scrollLeft = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const scrollRight = () => {
    setCurrentIndex(Math.min(innovationFeatures.length - 3, currentIndex + 1));
  };

  const visibleFeatures = innovationFeatures.slice(currentIndex, currentIndex + 3);

  return (
    <section id="features" className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-['Roboto_Slab'] font-bold mb-4">
            Revolutionary Travel Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-['Open_Sans']">
            Experience the future of travel planning with cutting-edge AI innovations designed specifically for exploring India
          </p>
        </div>

        {/* Innovation Features - Horizontal Scroll */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-['Roboto_Slab'] font-semibold flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-orange-500" />
              Innovation Showcase
            </h3>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollLeft}
                disabled={currentIndex === 0}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollRight}
                disabled={currentIndex >= innovationFeatures.length - 3}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleFeatures.map((feature, index) => (
              <Card 
                key={feature.title}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-orange-200 group"
                onClick={() => handleFeatureClick(feature)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center group-hover:from-orange-200 group-hover:to-orange-300 transition-colors">
                        <feature.icon className="w-6 h-6 text-orange-600" />
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 text-xs">
                      {feature.highlight}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-['Roboto_Slab'] group-hover:text-orange-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-['Open_Sans'] line-clamp-3">
                    {feature.description}
                  </p>
                  <Button 
                    variant="ghost" 
                    className="mt-4 p-0 h-auto font-medium text-orange-600 hover:text-orange-700"
                  >
                    Learn More →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Core Features Grid */}
        <div>
          <h3 className="text-2xl font-['Roboto_Slab'] font-semibold mb-6 flex items-center">
            <Sparkles className="w-6 h-6 mr-2 text-orange-500" />
            Core Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreFeatures.map((feature) => (
              <Card key={feature.title} className="hover:shadow-md transition-shadow duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                    <feature.icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <Badge variant="outline" className="mb-3 border-orange-200 text-orange-700">
                    {feature.highlight}
                  </Badge>
                  <h4 className="font-['Roboto_Slab'] font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground font-['Open_Sans']">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Detail Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              {selectedFeature && (
                <>
                  <selectedFeature.icon className="w-8 h-8 mr-3 text-orange-600" />
                  {selectedFeature.title}
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {selectedFeature && (
            <ScrollArea className="max-h-96">
              <div className="space-y-6">
                <div>
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                    {selectedFeature.highlight}
                  </Badge>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-lg">Overview</h4>
                  <p className="text-muted-foreground">{selectedFeature.details?.overview}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Key Benefits</h4>
                  <ul className="space-y-2">
                    {selectedFeature.details?.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-lg">Technology</h4>
                  <p className="text-muted-foreground">{selectedFeature.details?.technology}</p>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}