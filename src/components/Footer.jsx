import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container px-4 mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-orange-500" />
              <h3 className="text-2xl font-['Roboto_Slab'] font-bold text-orange-400">
                TravelGenie
              </h3>
            </div>
            <p className="text-gray-300 font-['Open_Sans']">
              AI-powered travel planning for incredible India. Create personalized itineraries 
              that match your budget and interests.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-orange-400">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-orange-400">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-orange-400">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-orange-400">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-orange-400 transition-colors">Destinations</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Create Itinerary</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Budget Calculator</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">My Trips</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Travel Guide</a></li>
            </ul>
          </div>

          {/* Destinations */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Popular Destinations</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-orange-400 transition-colors">Kerala</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Rajasthan</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Goa</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Himachal Pradesh</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Kashmir</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Stay Updated</h4>
            <p className="text-gray-300 text-sm">
              Get travel tips, destination guides, and exclusive offers.
            </p>
            <div className="space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 TravelGenie. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}