import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Clock, Users, TrendingUp, TrendingDown, Minus } from "lucide-react";

const mockCrowdData = {
  "Taj Mahal": {
    current: { level: 75, status: 'high', waitTime: '45-60 min' },
    hourly: [
      { hour: '6 AM', level: 15, status: 'low' },
      { hour: '8 AM', level: 35, status: 'medium' },
      { hour: '10 AM', level: 70, status: 'high' },
      { hour: '12 PM', level: 85, status: 'very-high' },
      { hour: '2 PM', level: 90, status: 'very-high' },
      { hour: '4 PM', level: 65, status: 'high' },
      { hour: '6 PM', level: 25, status: 'low' }
    ],
    bestTime: '6-7 AM or 5-6 PM',
    recommendation: 'Visit early morning or late evening to avoid crowds and harsh sunlight'
  },
  "Red Fort": {
    current: { level: 45, status: 'medium', waitTime: '15-25 min' },
    hourly: [
      { hour: '9 AM', level: 20, status: 'low' },
      { hour: '11 AM', level: 45, status: 'medium' },
      { hour: '1 PM', level: 75, status: 'high' },
      { hour: '3 PM', level: 80, status: 'very-high' },
      { hour: '5 PM', level: 35, status: 'medium' }
    ],
    bestTime: '9-10 AM',
    recommendation: 'Best visited in morning hours when weather is pleasant and crowds are minimal'
  },
  "Gateway of India": {
    current: { level: 60, status: 'high', waitTime: '20-30 min' },
    hourly: [
      { hour: '8 AM', level: 25, status: 'low' },
      { hour: '10 AM', level: 50, status: 'medium' },
      { hour: '12 PM', level: 70, status: 'high' },
      { hour: '2 PM', level: 85, status: 'very-high' },
      { hour: '4 PM', level: 90, status: 'very-high' },
      { hour: '6 PM', level: 75, status: 'high' },
      { hour: '8 PM', level: 45, status: 'medium' }
    ],
    bestTime: '8-9 AM',
    recommendation: 'Early morning visits offer best experience with good lighting for photos'
  }
};

export function CrowdPredictor({ attraction, className = "" }) {
  const data = mockCrowdData[attraction] || mockCrowdData["Taj Mahal"];

  const getStatusColor = (status) => {
    switch (status) {
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'very-high': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'low': return <TrendingDown className="w-3 h-3" />;
      case 'medium': return <Minus className="w-3 h-3" />;
      case 'high': case 'very-high': return <TrendingUp className="w-3 h-3" />;
      default: return <Minus className="w-3 h-3" />;
    }
  };

  const getProgressColor = (level) => {
    if (level <= 30) return 'bg-green-500';
    if (level <= 60) return 'bg-yellow-500';
    if (level <= 80) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <Card className={`${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">{attraction}</CardTitle>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className={getStatusColor(data.current.status)}>
            {getStatusIcon(data.current.status)}
            <span className="ml-1 capitalize">{data.current.status} Crowd</span>
          </Badge>
          <Badge variant="outline" className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {data.current.waitTime}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Current Crowd Level</span>
              <span>{data.current.level}%</span>
            </div>
            <Progress 
              value={data.current.level} 
              className={`h-2 ${getProgressColor(data.current.level)}`}
            />
          </div>
          
          <div className="space-y-2">
            <div className="text-sm font-medium">Hourly Forecast</div>
            {data.hourly.map((hour, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span>{hour.hour}</span>
                <div className="flex items-center space-x-2">
                  <Progress 
                    value={hour.level} 
                    className={`w-24 h-2 ${getProgressColor(hour.level)}`}
                  />
                  <span className="min-w-[2rem]">{hour.level}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">Best Time to Visit: </span>
              {data.bestTime}
            </div>
            <div className="text-sm text-muted-foreground">
              {data.recommendation}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}