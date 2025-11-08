import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog.jsx";
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

const mockReviews = [
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

const mockRatingBreakdown = {
  5: 68,
  4: 22,
  3: 7,
  2: 2,
  1: 1
};

export function RatingsReviewsModal({ open, onOpenChange, destination }) {
  const [filter, setFilter] = useState('all');
  const [tripTypeFilter, setTripTypeFilter] = useState('all');

  const totalReviews = Object.values(mockRatingBreakdown).reduce((a, b) => a + b, 0);
  const averageRating = Object.entries(mockRatingBreakdown).reduce((sum, [rating, count]) => 
    sum + (parseInt(rating) * count), 0) / totalReviews;

  const renderStars = (rating, size = 'sm') => {
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

  const getTripTypeIcon = (type) => {
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
                  <div className="text-sm text-gray-500">
                    Based on {totalReviews} reviews
                  </div>
                </div>

                {/* Rating Breakdown */}
                <div className="mt-6 space-y-2">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <div key={rating} className="flex items-center gap-2">
                      <div className="w-12 text-sm text-gray-600">{rating} star</div>
                      <Progress 
                        value={(mockRatingBreakdown[rating] / totalReviews) * 100} 
                        className="h-2 flex-1" 
                      />
                      <div className="w-12 text-sm text-gray-600 text-right">
                        {Math.round((mockRatingBreakdown[rating] / totalReviews) * 100)}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Sort by</h4>
                <div className="space-y-1">
                  {['all', 'recent', 'helpful', 'photos'].map(f => (
                    <Button
                      key={f}
                      variant={filter === f ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setFilter(f)}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Trip Type</h4>
                <div className="space-y-1">
                  {['all', 'solo', 'couple', 'family', 'friends'].map(type => (
                    <Button
                      key={type}
                      variant={tripTypeFilter === type ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setTripTypeFilter(type)}
                    >
                      <span className="mr-2">{getTripTypeIcon(type)}</span>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="flex-1">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-4">
                {filteredReviews.map(review => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {review.userName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{review.userName}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {new Date(review.date).toLocaleDateString()}
                              <span className="inline-flex items-center">
                                {getTripTypeIcon(review.tripType)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>

                      <h3 className="font-medium mb-2">{review.title}</h3>
                      <p className="text-gray-600 mb-4">{review.content}</p>

                      {review.photos.length > 0 && (
                        <div className="flex gap-2 mb-4">
                          {review.photos.map((photo, idx) => (
                            <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                              <img
                                src={`/photos/${photo}`}
                                alt={`Review photo ${idx + 1}`}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <Button variant="ghost" size="sm" className="gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {review.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <ThumbsDown className="w-4 h-4" />
                          {review.dislikes}
                        </Button>
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