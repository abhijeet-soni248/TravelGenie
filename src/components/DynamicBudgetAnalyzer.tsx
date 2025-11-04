import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  IndianRupee, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Lightbulb,
  Target,
  PiggyBank,
  ShoppingCart
} from "lucide-react";

interface BudgetCategory {
  name: string;
  allocated: number;
  spent: number;
  icon: any;
  suggestions: string[];
}

interface BudgetAnalyzerProps {
  totalBudget?: number;
  className?: string;
}

export function DynamicBudgetAnalyzer({ totalBudget = 50000, className = "" }: BudgetAnalyzerProps) {
  const [categories] = useState<BudgetCategory[]>([
    {
      name: 'Accommodation',
      allocated: 20000,
      spent: 17500,
      icon: '🏨',
      suggestions: [
        'Switch to guesthouse for remaining nights - Save ₹3,000',
        'Book hostels in Rishikesh instead of hotels - Save ₹2,500'
      ]
    },
    {
      name: 'Transportation', 
      allocated: 12000,
      spent: 14200,
      icon: '🚗',
      suggestions: [
        'Use local buses instead of private cabs - Save ₹1,500',
        'Book train instead of flight for return journey - Save ₹3,000'
      ]
    },
    {
      name: 'Food & Dining',
      allocated: 8000,
      spent: 6200,
      icon: '🍽️',
      suggestions: [
        'Try local street food for authentic experience',
        'Book hotels with complimentary breakfast'
      ]
    },
    {
      name: 'Activities',
      allocated: 7000,
      spent: 5800,
      icon: '🎯',
      suggestions: [
        'Group bookings for tiger safari - Save ₹800',
        'Look for combo packages at adventure sports centers'
      ]
    },
    {
      name: 'Miscellaneous',
      allocated: 3000,
      spent: 1200,
      icon: '🛍️',
      suggestions: [
        'Budget allocated for shopping and emergencies',
        'Consider local handicrafts as souvenirs'
      ]
    }
  ]);

  const totalAllocated = categories.reduce((sum, cat) => sum + cat.allocated, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const remaining = totalBudget - totalSpent;
  const overBudgetCategories = categories.filter(cat => cat.spent > cat.allocated);
  const underBudgetCategories = categories.filter(cat => cat.spent < cat.allocated);

  const getBudgetStatus = (allocated: number, spent: number) => {
    const percentage = (spent / allocated) * 100;
    if (percentage > 100) return { status: 'over', color: 'text-red-600 bg-red-100', percentage };
    if (percentage > 80) return { status: 'warning', color: 'text-orange-600 bg-orange-100', percentage };
    return { status: 'good', color: 'text-green-600 bg-green-100', percentage };
  };

  const getProgressColor = (allocated: number, spent: number) => {
    const percentage = (spent / allocated) * 100;
    if (percentage > 100) return 'bg-red-500';
    if (percentage > 80) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const potentialSavings = categories.reduce((total, cat) => {
    return total + (cat.suggestions.length > 0 ? 2000 : 0); // Mock savings calculation
  }, 0);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <PiggyBank className="w-5 h-5 mr-2 text-green-600" />
            Live Budget Tracker
          </span>
          <Badge variant="outline" className="text-xs">
            Real-time
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Overall Budget Status */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800">Overall Budget</h3>
            <div className="flex items-center space-x-1">
              {remaining >= 0 ? (
                <TrendingDown className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingUp className="w-4 h-4 text-red-600" />
              )}
              <span className={`font-medium ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{Math.abs(remaining).toLocaleString()} {remaining >= 0 ? 'left' : 'over'}
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Spent: ₹{totalSpent.toLocaleString()}</span>
              <span>Budget: ₹{totalBudget.toLocaleString()}</span>
            </div>
            <Progress value={(totalSpent / totalBudget) * 100} className="h-2" />
          </div>
        </div>

        {/* Category Breakdown */}
        <div>
          <h4 className="font-medium mb-3">Category Breakdown</h4>
          <div className="space-y-3">
            {categories.map((category, index) => {
              const status = getBudgetStatus(category.allocated, category.spent);
              
              return (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-medium text-sm">{category.name}</span>
                    </div>
                    <Badge className={`text-xs ${status.color}`}>
                      {Math.round(status.percentage)}%
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>₹{category.spent.toLocaleString()} / ₹{category.allocated.toLocaleString()}</span>
                      <span>₹{(category.allocated - category.spent).toLocaleString()} left</span>
                    </div>
                    <div className="relative">
                      <Progress value={Math.min((category.spent / category.allocated) * 100, 100)} className="h-1.5" />
                      <div 
                        className={`absolute top-0 left-0 h-1.5 rounded-full transition-all ${getProgressColor(category.allocated, category.spent)}`}
                        style={{ width: `${Math.min((category.spent / category.allocated) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Alerts */}
        {overBudgetCategories.length > 0 && (
          <div className="bg-red-50 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
              <div>
                <div className="font-medium text-sm text-red-900">Budget Alert!</div>
                <div className="text-sm text-red-700">
                  {overBudgetCategories.length} categories are over budget
                </div>
                <ul className="text-xs text-red-600 mt-1">
                  {overBudgetCategories.map((cat, idx) => (
                    <li key={idx}>• {cat.name}: ₹{(cat.spent - cat.allocated).toLocaleString()} over</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* AI Suggestions */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <div className="font-medium text-sm text-blue-900 mb-2">
                AI Money-Saving Suggestions
              </div>
              <div className="space-y-1">
                {categories.slice(0, 3).map((category, idx) => (
                  category.suggestions.length > 0 && (
                    <div key={idx} className="text-xs text-blue-700">
                      • {category.suggestions[0]}
                    </div>
                  )
                ))}
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-blue-200">
                <span className="text-xs text-blue-600">Potential savings:</span>
                <span className="font-medium text-sm text-green-600">
                  ₹{potentialSavings.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            <Target className="w-3 h-3 mr-1" />
            Rebalance Budget
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            <ShoppingCart className="w-3 h-3 mr-1" />
            Find Deals
          </Button>
        </div>

        {/* Progress Summary */}
        <div className="text-center pt-3 border-t">
          <div className="text-xs text-gray-500">
            Trip Progress: Day 3 of 7 • {Math.round((totalSpent / totalBudget) * 100)}% budget used
          </div>
        </div>
      </CardContent>
    </Card>
  );
}