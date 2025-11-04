import { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { UserProfile } from "./UserProfile";
import { useUser } from "./UserContext";
import { Menu, MapPin, User, FileText, Upload, Folder, Download, ChevronDown } from "lucide-react";

export function Header({ onAuthModalOpen }) {
  const [documentsModalOpen, setDocumentsModalOpen] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [contactUsOpen, setContactUsOpen] = useState(false);
  const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);
  const [termsOfServiceOpen, setTermsOfServiceOpen] = useState(false);
  const { user } = useUser();

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files) {
      const newDocuments = Array.from(files).map(file => file.name);
      setUploadedDocuments(prev => [...prev, ...newDocuments]);
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <MapPin className="h-8 w-8 text-orange-500" />
          <h1 className="text-2xl font-['Roboto_Slab'] font-bold text-orange-600">
            TravelGenie
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-between space-x-8 ml-auto mr-8">
          <a href="https://geminibot-azure.vercel.app/" className="text-black text-sm font-medium hover:text-orange-600 transition-colors">
            AI Bot
          </a>
          <a href="#destinations" className="text-sm font-medium hover:text-orange-600 transition-colors">
            Destinations
          </a>
          <a href="#create-itinerary" className="text-sm font-medium hover:text-orange-600 transition-colors">
            Create Itinerary
          </a>
          <a href="#my-trips" className="text-sm font-medium hover:text-orange-600 transition-colors">
            My Trips
          </a>
          <a href="#budget-calculator" className="text-sm font-medium hover:text-orange-600 transition-colors">
            Budget Calculator
          </a>
          <button
            onClick={() => setDocumentsModalOpen(true)}
            className="text-sm font-medium hover:text-orange-600 transition-colors flex items-center"
          >
            <FileText className="w-4 h-4 mr-1" />
            Documents
          </button>
        </nav>

        <div className="flex items-center space-x-2">
          {user?.isLoggedIn ? (
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden md:flex items-center space-x-2"
              onClick={() => setUserProfileOpen(true)}
            >
              <Avatar className="w-6 h-6">
                <AvatarImage src={user.profileImage} alt={user.name} />
                <AvatarFallback className="bg-orange-100 text-orange-600 text-xs">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <span className="max-w-24 truncate">{user.name}</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden md:flex"
                onClick={onAuthModalOpen}
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              <Button 
                size="sm" 
                className="hidden md:flex bg-orange-600 hover:bg-orange-700"
                onClick={onAuthModalOpen}
              >
                Get Started
              </Button>
            </>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[280px] sm:w-[300px]">
              <div className="flex flex-col space-y-6 mt-8">
                {/* Brand in mobile menu */}
                <div className="flex items-center space-x-2 pb-4 border-b">
                  <MapPin className="h-6 w-6 text-orange-500" />
                  <h2 className="text-xl font-['Roboto_Slab'] font-bold text-orange-600">
                    TravelGenie
                  </h2>
                </div>
                
                {/* Navigation Links */}
                <div className="flex flex-col space-y-4">
                  <a href="#destinations" className="text-base font-medium hover:text-orange-600 py-2 px-1 rounded-md hover:bg-orange-50 transition-colors">
                    Destinations
                  </a>
                  <a href="#create-itinerary" className="text-base font-medium hover:text-orange-600 py-2 px-1 rounded-md hover:bg-orange-50 transition-colors">
                    Create Itinerary
                  </a>
                  <a href="#my-trips" className="text-base font-medium hover:text-orange-600 py-2 px-1 rounded-md hover:bg-orange-50 transition-colors">
                    My Trips
                  </a>
                  <a href="#budget-calculator" className="text-base font-medium hover:text-orange-600 py-2 px-1 rounded-md hover:bg-orange-50 transition-colors">
                    Budget Calculator
                  </a>
                  <button
                    onClick={() => setDocumentsModalOpen(true)}
                    className="text-base font-medium hover:text-orange-600 py-2 px-1 rounded-md hover:bg-orange-50 transition-colors flex items-center w-full text-left"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Documents
                  </button>
                </div>
                
                {/* Auth Buttons */}
                <div className="pt-6 border-t space-y-3">
                  {user?.isLoggedIn ? (
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start h-12 text-base"
                      onClick={() => setUserProfileOpen(true)}
                    >
                      <Avatar className="w-6 h-6 mr-3">
                        <AvatarImage src={user.profileImage} alt={user.name} />
                        <AvatarFallback className="bg-orange-100 text-orange-600 text-xs">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      {user.name}
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start h-12 text-base"
                        onClick={onAuthModalOpen}
                      >
                        <User className="h-5 w-5 mr-3" />
                        Sign In
                      </Button>
                      <Button 
                        className="w-full h-12 text-base bg-orange-600 hover:bg-orange-700"
                        onClick={onAuthModalOpen}
                      >
                        Get Started
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Documents Modal */}
      <Dialog open={documentsModalOpen} onOpenChange={setDocumentsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-orange-500" />
              Travel Documents Manager
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-orange-500" />
                  Upload Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="document-upload">Upload from Device/Gallery</Label>
                    <Input
                      id="document-upload"
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={handleFileUpload}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Supported formats: PDF, JPG, PNG, DOC, DOCX
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col items-center">
                      <Folder className="w-6 h-6 mb-2 text-blue-600" />
                      <span className="text-sm">Connect DigiLocker</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center">
                      <FileText className="w-6 h-6 mb-2 text-green-600" />
                      <span className="text-sm">Scan Document</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Uploaded Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-orange-500" />
                    My Documents ({uploadedDocuments.length})
                  </span>
                  {uploadedDocuments.length > 0 && (
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-1" />
                      Download All
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {uploadedDocuments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No documents uploaded yet</p>
                    <p className="text-sm">Upload your travel documents to keep them safe and easily accessible</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {uploadedDocuments.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 mr-3 text-gray-500" />
                          <span className="text-sm font-medium">{doc}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost">View</Button>
                          <Button size="sm" variant="ghost">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Document Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recommended Documents for India Travel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">Identity Documents</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Aadhaar Card</li>
                      <li>• Passport</li>
                      <li>• Driving License</li>
                      <li>• Voter ID</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Travel Documents</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Flight/Train Tickets</li>
                      <li>• Hotel Bookings</li>
                      <li>• Travel Insurance</li>
                      <li>• Emergency Contacts</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* User Profile Modal */}
      <UserProfile
        open={userProfileOpen}
        onOpenChange={setUserProfileOpen}
        onContactUs={() => setContactUsOpen(true)}
        onPrivacyPolicy={() => setPrivacyPolicyOpen(true)}
        onTermsOfService={() => setTermsOfServiceOpen(true)}
      />

      {/* Contact Us Modal */}
      <Dialog open={contactUsOpen} onOpenChange={setContactUsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Us</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="How can we help?" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                placeholder="Tell us more about your inquiry..."
                className="w-full h-32 px-3 py-2 border border-input rounded-md resize-none"
              />
            </div>
            <Button className="w-full bg-orange-600 hover:bg-orange-700">
              Send Message
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Privacy Policy Modal */}
      <Dialog open={privacyPolicyOpen} onOpenChange={setPrivacyPolicyOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Privacy Policy</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <p><strong>Last updated:</strong> September 12, 2025</p>
            
            <h3 className="font-semibold">1. Information We Collect</h3>
            <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us.</p>
            
            <h3 className="font-semibold">2. How We Use Your Information</h3>
            <p>We use the information to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
            
            <h3 className="font-semibold">3. Data Protection</h3>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            
            <h3 className="font-semibold">4. Information Sharing</h3>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
            
            <h3 className="font-semibold">5. Your Rights</h3>
            <p>You have the right to access, update, or delete your personal information. Contact us if you wish to exercise these rights.</p>
            
            <h3 className="font-semibold">6. Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@travelgenie.com</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Terms of Service Modal */}
      <Dialog open={termsOfServiceOpen} onOpenChange={setTermsOfServiceOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Terms of Service</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <p><strong>Last updated:</strong> September 12, 2025</p>
            
            <h3 className="font-semibold">1. Acceptance of Terms</h3>
            <p>By using TravelGenie, you agree to be bound by these Terms of Service and our Privacy Policy.</p>
            
            <h3 className="font-semibold">2. Description of Service</h3>
            <p>TravelGenie is an AI-powered travel planning platform that helps users create personalized itineraries for destinations in India.</p>
            
            <h3 className="font-semibold">3. User Accounts</h3>
            <p>You are responsible for safeguarding your account credentials and for all activities under your account.</p>
            
            <h3 className="font-semibold">4. Acceptable Use</h3>
            <p>You agree not to use the service for any unlawful purpose or in any way that could damage our service or other users' experience.</p>
            
            <h3 className="font-semibold">5. Intellectual Property</h3>
            <p>The service and its content are protected by copyright, trademark, and other intellectual property laws.</p>
            
            <h3 className="font-semibold">6. Limitation of Liability</h3>
            <p>TravelGenie is not liable for any indirect, incidental, special, or consequential damages arising from your use of the service.</p>
            
            <h3 className="font-semibold">7. Changes to Terms</h3>
            <p>We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of modified terms.</p>
            
            <h3 className="font-semibold">8. Contact Information</h3>
            <p>For questions about these Terms of Service, contact us at legal@travelgenie.com</p>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}