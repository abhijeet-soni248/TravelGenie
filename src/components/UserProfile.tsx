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

interface UserProfileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContactUs: () => void;
  onPrivacyPolicy: () => void;
  onTermsOfService: () => void;
}

export function UserProfile({ 
  open, 
  onOpenChange, 
  onContactUs, 
  onPrivacyPolicy, 
  onTermsOfService 
}: UserProfileProps) {
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

  const getInitials = (name: string) => {
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
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            disabled={!editMode}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            disabled={!editMode}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            disabled={!editMode}
                            placeholder="+91 9876543210"
                          />
                        </div>
                        <div>
                          <Label htmlFor="travelStyle">Travel Style</Label>
                          <select
                            id="travelStyle"
                            value={formData.travelStyle}
                            onChange={(e) => setFormData(prev => ({ ...prev, travelStyle: e.target.value }))}
                            disabled={!editMode}
                            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="">Select preference</option>
                            <option value="adventure">Adventure & Outdoors</option>
                            <option value="culture">Culture & Heritage</option>
                            <option value="relaxation">Relaxation & Wellness</option>
                            <option value="luxury">Luxury & Comfort</option>
                            <option value="budget">Budget-Friendly</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "trips" && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">My Travel History</h3>
                
                <div className="space-y-4">
                  {mockTrips.map((trip) => (
                    <Card key={trip.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{trip.destination}</h4>
                            <p className="text-sm text-muted-foreground">{trip.date}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              trip.status === "Upcoming" ? "bg-blue-100 text-blue-700" :
                              trip.status === "Completed" ? "bg-green-100 text-green-700" :
                              "bg-gray-100 text-gray-700"
                            }`}>
                              {trip.status}
                            </span>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "friends" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Travel Friends</h3>
                  <Button size="sm">
                    <Users className="w-4 h-4 mr-2" />
                    Invite Friends
                  </Button>
                </div>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h4 className="font-medium mb-2">No friends yet</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Invite friends to collaborate on travel plans and share experiences
                    </p>
                    <Button>Invite Your First Friend</Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Account Settings</h3>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Email notifications</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Trip reminders</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Friend invitations</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Privacy</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Public profile</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Share trip history</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}