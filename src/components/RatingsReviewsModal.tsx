import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { Progress } from "./ui/progress";
import { 
  Star, 
  StarHalf, 
  ThumbsUp, 
  ThumbsDown, 
  MessageCircle,
  Calendar,
  MapPin,
  Camera,
  Users,
  Filter
} from "lucide-react";

interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  likes: number;
  dislikes: number;
  tripType: 'solo' | 'couple' | 'family' | 'friends';
  photos: string[];
  helpful: boolean;
}

interface RatingBreakdown {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

interface RatingsReviewsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  destination: string;
}

const mockReviews: Review[] = [
  {
    id: '1',
    userName: 'Priya Sharma',
    rating: 5,
    date: '2024-11-15',
    title: 'Absolutely magical experience!',
    content: 'The backwaters were serene and beautiful. Our houseboat had all amenities and the food was delicious. The sunset views were breathtaking. Perfect for a romantic getaway.',
    likes: 24,
    dislikes: 1,
    tripType: 'couple',
    photos: ['sunset.jpg', 'houseboat.jpg'],
    helpful: true
  },
  {
    id: '2',
    userName: 'Raj Patel',
    rating: 4,
    date: '2024-11-10',
    title: 'Great family vacation',
    content: 'Kids loved the boat ride and coconut water. Some areas were crowded but overall good experience. The spice plantations tour was educational and fun.',
    likes: 18,
    dislikes: 3,
    tripType: 'family',
    photos: ['spices.jpg'],
    helpful: true
  },
  {
    id: '3',
    userName: 'Anita Kumar',
    rating: 3,
    date: '2024-11-05',
    title: 'Average experience',
    content: 'Beautiful place but our houseboat was not well maintained. Food quality could be better. The natural beauty makes up for some shortcomings.',
    likes: 7,
    dislikes: 8,
    tripType: 'friends',
    photos: [],
    helpful: false
  },
  {
    id: '4',
    userName: 'Vikram Singh',
    rating: 5,
    date: '2024-10-28',
    title: 'Solo traveler\'s paradise',
    content: 'Perfect for introspection and peace. The local guides were knowledgeable and friendly. Ayurvedic treatments were rejuvenating. Highly recommend for solo travelers.',
    likes: 31,
    dislikes: 0,
    tripType: 'solo',
    photos: ['ayurveda.jpg', 'nature.jpg'],
    helpful: true
  },
  {
    id: '5',
    userName: 'Deepika Reddy',
    rating: 4,
    date: '2024-10-20',
    title: 'Romantic and peaceful',
    content: 'Honeymoon was perfect here. The staff was courteous and food was authentic Kerala cuisine. Morning bird watching was a highlight.',
    likes: 22,
    dislikes: 2,
    tripType: 'couple',
    photos: ['birds.jpg'],
    helpful: true
  }
];

const mockRatingBreakdown: RatingBreakdown = {
  5: 68,
  4: 22,
  3: 7,
  2: 2,
  1: 1
};

export function RatingsReviewsModal({ open, onOpenChange, destination }: RatingsReviewsModalProps) {
  const [filter, setFilter] = useState<'all' | 'recent' | 'helpful' | 'photos'>('all');
  const [tripTypeFilter, setTripTypeFilter] = useState<'all' | 'solo' | 'couple' | 'family' | 'friends'>('all');

  const totalReviews = Object.values(mockRatingBreakdown).reduce((a, b) => a + b, 0);
  const averageRating = Object.entries(mockRatingBreakdown).reduce((sum, [rating, count]) => 
    sum + (parseInt(rating) * count), 0) / totalReviews;

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'sm') => {
    const sizeClass = size === 'lg' ? 'w-6 h-6' : size === 'md' ? 'w-5 h-5' : 'w-4 h-4';
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className={`${sizeClass} fill-yellow-400 text-yellow-400`} />);
      } else if (i - 0.5 <= rating) {
        stars.push(<StarHalf key={i} className={`${sizeClass} fill-yellow-400 text-yellow-400`} />);
      } else {
        stars.push(<Star key={i} className={`${sizeClass} text-gray-300`} />);
      }
    }
    return stars;
  };

  const getFilteredReviews = () => {
    let filtered = [...mockReviews];
    
    if (tripTypeFilter !== 'all') {
      filtered = filtered.filter(review => review.tripType === tripTypeFilter);
    }
    
    switch (filter) {
      case 'recent':
        return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'helpful':
        return filtered.filter(review => review.helpful).sort((a, b) => b.likes - a.likes);
      case 'photos':
        return filtered.filter(review => review.photos.length > 0);
      default:
        return filtered.sort((a, b) => b.likes - a.likes);
    }
  };

  const getTripTypeIcon = (type: string) => {
    switch (type) {
      case 'solo': return '🧳';
      case 'couple': return '💑';
      case 'family': return '👨‍👩‍👧‍👦';
      case 'friends': return '👥';
      default: return '🧳';
    }
  };

  const filteredReviews = getFilteredReviews();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] p-0">
        <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <DialogTitle className="text-xl">
            Reviews & Ratings - {destination}
          </DialogTitle>
        </DialogHeader>

        <div className="flex h-[75vh]">
          {/* Ratings Summary Sidebar */}
          <div className="w-80 border-r bg-gray-50 p-4">
            {/* Overall Rating */}
            <Card className="mb-4">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-800 mb-2">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="flex justify-center mb-2">
                    {renderStars(averageRating, 'lg')}
                  </div>
                  <div className="text-sm text-gray-600">
                    Based on {totalReviews} reviews
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rating Breakdown */}
            <Card className="mb-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Rating Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <span className="text-sm w-8">{rating}★</span>
                    <Progress 
                      value={(mockRatingBreakdown[rating as keyof RatingBreakdown] / totalReviews) * 100} 
                      className="flex-1 h-2" 
                    />
                    <span className="text-xs text-gray-600 w-8">
                      {mockRatingBreakdown[rating as keyof RatingBreakdown]}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Filters */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm font-medium mb-2">Show Reviews</div>
                  <div className="space-y-1">
                    {[
                      { id: 'all', label: 'All Reviews' },
                      { id: 'recent', label: 'Most Recent' },
                      { id: 'helpful', label: 'Most Helpful' },
                      { id: 'photos', label: 'With Photos' }
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setFilter(option.id as any)}
                        className={`w-full text-left px-2 py-1 text-xs rounded ${
                          filter === option.id 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2">Trip Type</div>
                  <div className="space-y-1">
                    {[
                      { id: 'all', label: 'All Types' },
                      { id: 'solo', label: 'Solo Travel' },
                      { id: 'couple', label: 'Couples' },
                      { id: 'family', label: 'Families' },
                      { id: 'friends', label: 'Friends' }
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setTripTypeFilter(option.id as any)}
                        className={`w-full text-left px-2 py-1 text-xs rounded ${
                          tripTypeFilter === option.id 
                            ? 'bg-purple-100 text-purple-700' 
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reviews List */}
          <div className="flex-1">
            <ScrollArea className="h-full">
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    {filteredReviews.length} Reviews
                  </h3>
                  <Button variant="outline" size="sm">
                    Write a Review
                  </Button>
                </div>

                {filteredReviews.map((review) => (
                  <Card key={review.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-4">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={review.userAvatar} alt={review.userName} />
                          <AvatarFallback>
                            {review.userName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-medium text-sm">{review.userName}</div>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex">{renderStars(review.rating)}</div>
                                <span className="text-xs text-gray-500">
                                  {new Date(review.date).toLocaleDateString()}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {getTripTypeIcon(review.tripType)} {review.tripType}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <h4 className="font-medium text-sm mb-2">{review.title}</h4>
                          <p className="text-sm text-gray-700 mb-3">{review.content}</p>
                          
                          {review.photos.length > 0 && (
                            <div className="flex items-center space-x-2 mb-3">
                              <Camera className="w-4 h-4 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {review.photos.length} photo{review.photos.length > 1 ? 's' : ''}
                              </span>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <button className="flex items-center space-x-1 text-xs text-gray-600 hover:text-blue-600">
                                <ThumbsUp className="w-3 h-3" />
                                <span>Helpful ({review.likes})</span>
                              </button>
                              <button className="flex items-center space-x-1 text-xs text-gray-600 hover:text-red-600">
                                <ThumbsDown className="w-3 h-3" />
                                <span>({review.dislikes})</span>
                              </button>
                            </div>
                            {review.helpful && (
                              <Badge variant="secondary" className="text-xs">
                                ✓ Helpful Review
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}