import { useState } from "react";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
import { Label } from "./ui/label.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";
import { ImageWithFallback } from "./figma/ImageWithFallback.jsx";
import { MapPin, Sparkles, Users, Star, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function WelcomePage({ onGetStarted }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelStyle: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      onGetStarted(formData);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmOTc5MTYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc=')] opacity-40"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <MapPin className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl font-['Roboto_Slab'] font-bold text-orange-600">
                TravelGenie
              </h1>
            </div>

            {/* Hero Content */}
            <div className="space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl md:text-5xl font-['Roboto_Slab'] font-bold text-gray-900 leading-tight"
              >
                Your AI-Powered
                <span className="block text-orange-600">India Travel Companion</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-xl text-gray-600 leading-relaxed font-['Open_Sans']"
              >
                Discover incredible destinations, create personalized itineraries, and explore India like never before with our AI-powered travel planning platform.
              </motion.p>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="grid grid-cols-2 gap-4 pt-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-gray-700">AI-Generated Itineraries</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-gray-700">Friend Collaboration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Star className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-gray-700">50+ Destinations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-gray-700">Real-time Updates</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="lg:justify-self-end w-full max-w-md"
          >
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-['Roboto_Slab'] text-gray-900">
                  Start Your Journey
                </CardTitle>
                <p className="text-gray-600 font-['Open_Sans']">
                  Tell us a bit about yourself to personalize your experience
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="travelStyle">Travel Style</Label>
                    <select
                      id="travelStyle"
                      value={formData.travelStyle}
                      onChange={(e) => handleInputChange("travelStyle", e.target.value)}
                      className="w-full h-12 px-3 rounded-md border border-input bg-background text-sm"
                    >
                      <option value="">Select your preference</option>
                      <option value="adventure">Adventure & Outdoors</option>
                      <option value="culture">Culture & Heritage</option>
                      <option value="relaxation">Relaxation & Wellness</option>
                      <option value="luxury">Luxury & Comfort</option>
                      <option value="budget">Budget-Friendly</option>
                    </select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium text-base"
                    disabled={!formData.name || !formData.email}
                  >
                    Continue to TravelGenie
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    By continuing, you agree to our{" "}
                    <button type="button" className="text-orange-600 hover:underline">
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button type="button" className="text-orange-600 hover:underline">
                      Privacy Policy
                    </button>
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Bottom Stats */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="bg-white/90 backdrop-blur rounded-2xl px-8 py-4 shadow-lg">
          <div className="flex items-center space-x-8 text-center">
            <div>
              <div className="text-2xl font-bold text-orange-600">50+</div>
              <div className="text-sm text-gray-600">Destinations</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div>
              <div className="text-2xl font-bold text-orange-600">6+</div>
              <div className="text-sm text-gray-600">Happy Travellers</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div>
              <div className="text-2xl font-bold text-orange-600">AI</div>
              <div className="text-sm text-gray-600">Powered</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}