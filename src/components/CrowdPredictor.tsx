import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Clock, Users, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface CrowdPredictorProps {
  attraction: string;
  className?: string;
}

interface CrowdData {
  current: {
    level: number; // 0-100
    status: 'low' | 'medium' | 'high' | 'very-high';
    waitTime: string;
  };
  hourly: Array<{
    hour: string;
    level: number;
    status: 'low' | 'medium' | 'high' | 'very-high';
  }>;
  bestTime: string;
  recommendation: string;
}

const mockCrowdData: Record<string, CrowdData> = {
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

export function CrowdPredictor({ attraction, className = "" }: CrowdPredictorProps) {
  const data = mockCrowdData[attraction] || mockCrowdData["Taj Mahal"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'very-high': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'low': return <TrendingDown className="w-3 h-3" />;
      case 'medium': return <Minus className="w-3 h-3" />;
      case 'high': case 'very-high': return <TrendingUp className="w-3 h-3" />;
      default: return <Minus className="w-3 h-3" />;
    }
  };

  const getProgressColor = (level: number) => {
    if (level <= 30) return 'bg-green-500';
    if (level <= 60) return 'bg-yellow-500';
    if (level <= 80) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <Card className={`${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center justify-between">
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-blue-600" />
            Crowd Predictor
          </span>
          <Badge className={`text-xs ${getStatusColor(data.current.status)} border`}>
            {getStatusIcon(data.current.status)}
            <span className="ml-1 capitalize">{data.current.status}</span>
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Current Crowd Level</span>
            <span className="font-medium">{data.current.level}%</span>
          </div>
          <div className="relative">
            <Progress value={data.current.level} className="h-2" />
            <div 
              className={`absolute top-0 left-0 h-2 rounded-full transition-all ${getProgressColor(data.current.level)}`}
              style={{ width: `${data.current.level}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Expected wait: {data.current.waitTime}</span>
            <span className="flex items-center">
              <Users className="w-3 h-3 mr-1" />
              Live data
            </span>
          </div>
        </div>

        {/* Best Time Recommendation */}
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <TrendingDown className="w-4 h-4 text-blue-600 mt-0.5" />
            <div>
              <div className="font-medium text-sm text-blue-900">Best time to visit</div>
              <div className="text-sm text-blue-700">{data.bestTime}</div>
              <div className="text-xs text-blue-600 mt-1">{data.recommendation}</div>
            </div>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div>
          <div className="text-sm font-medium mb-2">Today's Crowd Forecast</div>
          <div className="space-y-1">
            {data.hourly.map((hour, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-xs text-gray-600 w-12">{hour.hour}</span>
                <div className="flex-1 mx-2">
                  <div className="relative h-1.5 bg-gray-200 rounded-full">
                    <div 
                      className={`absolute top-0 left-0 h-1.5 rounded-full ${getProgressColor(hour.level)}`}
                      style={{ width: `${hour.level}%` }}
                    />
                  </div>
                </div>
                <span className={`text-xs px-1.5 py-0.5 rounded capitalize ${getStatusColor(hour.status)}`}>
                  {hour.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
          💡 Tip: Book online tickets in advance to skip ticket queues
        </div>
      </CardContent>
    </Card>
  );
}