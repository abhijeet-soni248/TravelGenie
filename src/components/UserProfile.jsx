import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useUser } from "./UserContext";
import { 
  User, 
  Settings, 
  Heart, 
  Clock, 
  MapPin, 
  Mail, 
  Phone, 
  Camera,
  LogOut,
  MessageCircle,
  Download,
  Users,
  Shield,
  FileText
} from "lucide-react";

export function UserProfile({ 
  open, 
  onOpenChange, 
  onContactUs, 
  onPrivacyPolicy, 
  onTermsOfService 
}) {
  const { user, logout, updateUser } = useUser();
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    travelStyle: user?.travelStyle || ""
  });

  const handleSave = () => {
    updateUser(formData);
    setEditMode(false);
  };

  const handleLogout = () => {
    logout();
    onOpenChange(false);
  };

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const mockTrips = [
    { id: 1, destination: "Kerala Backwaters", date: "Dec 2024", status: "Upcoming" },
    { id: 2, destination: "Rajasthan Palaces", date: "Nov 2024", status: "Completed" },
    { id: 3, destination: "Goa Beaches", date: "Oct 2024", status: "Saved" }
  ];

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user.profileImage} alt={user.name} />
              <AvatarFallback className="bg-orange-100 text-orange-600">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-['Roboto_Slab']">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex h-[70vh]">
          {/* Sidebar */}
          <div className="w-48 border-r bg-gray-50 p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
                  activeTab === "profile" ? "bg-orange-100 text-orange-700" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>
              <button
                onClick={() => setActiveTab("trips")}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
                  activeTab === "trips" ? "bg-orange-100 text-orange-700" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>My Trips</span>
              </button>
              <button
                onClick={() => setActiveTab("friends")}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
                  activeTab === "friends" ? "bg-orange-100 text-orange-700" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Friends</span>
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
                  activeTab === "settings" ? "bg-orange-100 text-orange-700" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </nav>

            <Separator className="my-4" />

            <div className="space-y-2">
              <button
                onClick={onContactUs}
                className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact Us</span>
              </button>
              <button
                onClick={onPrivacyPolicy}
                className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
              >
                <Shield className="w-4 h-4" />
                <span>Privacy Policy</span>
              </button>
              <button
                onClick={onTermsOfService}
                className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
              >
                <FileText className="w-4 h-4" />
                <span>Terms of Service</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Profile Information</h3>
                  <Button
                    variant={editMode ? "default" : "outline"}
                    size="sm"
                    onClick={() => editMode ? handleSave() : setEditMode(true)}
                  >
                    {editMode ? "Save" : "Edit"}
                  </Button>
                </div>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={user.profileImage} alt={user.name} />
                        <AvatarFallback className="bg-orange-100 text-orange-600 text-2xl">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        <Camera className="w-4 h-4 mr-2" />
                        Change Photo
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            disabled={!editMode}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            disabled={!editMode}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                            disabled={!editMode}
                          />
                        </div>
                        <div>
                          <Label htmlFor="travelStyle">Travel Style</Label>
                          <Input
                            id="travelStyle"
                            value={formData.travelStyle}
                            onChange={e => setFormData({...formData, travelStyle: e.target.value})}
                            disabled={!editMode}
                            placeholder="e.g., Adventure, Luxury, Budget"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "trips" && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">My Trips</h3>
                <div className="grid gap-4">
                  {mockTrips.map(trip => (
                    <Card key={trip.id}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">
                          {trip.destination}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {trip.date}
                          </div>
                          <Badge variant={
                            trip.status === "Upcoming" ? "default" :
                            trip.status === "Completed" ? "secondary" :
                            "outline"
                          }>
                            {trip.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "friends" && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Travel Buddies</h3>
                <p className="text-gray-500">Coming soon! Connect with fellow travelers.</p>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Account Settings</h3>
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Notifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {/* Add notification settings here */}
                        <p className="text-gray-500">Notification preferences coming soon!</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Privacy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {/* Add privacy settings here */}
                        <p className="text-gray-500">Privacy settings coming soon!</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}