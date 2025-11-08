import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Users,
  Vote,
  IndianRupee,
  Plus,
  Check,
  X,
  Calculator,
  Split,
  Receipt
} from "lucide-react";

const mockGroupMembers = [
  { id: '1', name: 'You', isAdmin: true },
  { id: '2', name: 'Priya Sharma', isAdmin: false },
  { id: '3', name: 'Raj Patel', isAdmin: false },
  { id: '4', name: 'Anita Kumar', isAdmin: false }
];

const mockVotingItems = [
  {
    id: '1',
    title: 'Visit Taj Mahal at Sunrise',
    description: 'Should we book the 6 AM slot for sunrise viewing?',
    votes: [
      { userId: '1', choice: 'yes' },
      { userId: '2', choice: 'yes' },
      { userId: '3', choice: 'no' }
    ],
    status: 'active',
    deadline: '2 hours'
  },
  {
    id: '2',
    title: 'Upgrade to Luxury Hotel',
    description: 'Upgrade from ₹3,500/night to ₹8,000/night hotel?',
    votes: [
      { userId: '1', choice: 'no' },
      { userId: '2', choice: 'yes' },
      { userId: '3', choice: 'no' },
      { userId: '4', choice: 'no' }
    ],
    status: 'completed',
    deadline: 'Completed'
  }
];

const mockExpenses = [
  {
    id: '1',
    description: 'Train tickets to Delhi',
    amount: 4800,
    paidBy: '1',
    splitBetween: ['1', '2', '3', '4'],
    category: 'transport',
    date: '2024-12-15'
  },
  {
    id: '2',
    description: 'Hotel booking - 2 nights',
    amount: 7000,
    paidBy: '2',
    splitBetween: ['1', '2', '3', '4'],
    category: 'accommodation',
    date: '2024-12-16'
  },
  {
    id: '3',
    description: "Lunch at Karim's",
    amount: 1200,
    paidBy: '3',
    splitBetween: ['1', '2', '3'],
    category: 'food',
    date: '2024-12-17'
  }
];

export function GroupCoordination() {
  const [activeTab, setActiveTab] = useState("voting");
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'food'
  });

  const getVotePercentage = (item) => {
    const yesVotes = item.votes.filter(v => v.choice === 'yes').length;
    const totalVotes = item.votes.length;
    return totalVotes > 0 ? (yesVotes / totalVotes) * 100 : 0;
  };

  const getVoteStatus = (item) => {
    const percentage = getVotePercentage(item);
    if (percentage >= 75) return { status: 'winning', color: 'text-green-600 bg-green-100' };
    if (percentage >= 50) return { status: 'leading', color: 'text-blue-600 bg-blue-100' };
    return { status: 'losing', color: 'text-red-600 bg-red-100' };
  };

  const calculateExpenseSplit = () => {
    const totalExpenses = mockExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const memberExpenses = {};

    mockGroupMembers.forEach(member => {
      memberExpenses[member.id] = { paid: 0, owes: 0, share: 0 };
    });

    mockExpenses.forEach(expense => {
      const splitAmount = expense.amount / expense.splitBetween.length;
      memberExpenses[expense.paidBy].paid += expense.amount;

      expense.splitBetween.forEach(memberId => {
        memberExpenses[memberId].share += splitAmount;
      });
    });

    Object.keys(memberExpenses).forEach(memberId => {
      const member = memberExpenses[memberId];
      member.owes = member.share - member.paid;
    });

    return { memberExpenses, totalExpenses };
  };

  const { memberExpenses, totalExpenses } = calculateExpenseSplit();

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'food': return '🍽️';
      case 'transport': return '🚗';
      case 'accommodation': return '🏨';
      case 'activities': return '🎯';
      default: return '💰';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-600" />
          Group Coordination
        </CardTitle>
        <div className="flex -space-x-2">
          {mockGroupMembers.map((member) => (
            <Avatar key={member.id} className="w-8 h-8 border-2 border-white">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="text-xs">
                {member.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          ))}
          <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
            <span className="text-xs text-gray-600">+2</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="voting" className="text-xs">
              <Vote className="w-3 h-3 mr-1" />
              Voting
            </TabsTrigger>
            <TabsTrigger value="expenses" className="text-xs">
              <IndianRupee className="w-3 h-3 mr-1" />
              Expenses
            </TabsTrigger>
            <TabsTrigger value="split" className="text-xs">
              <Split className="w-3 h-3 mr-1" />
              Split
            </TabsTrigger>
          </TabsList>

          {/* Voting Tab */}
          <TabsContent value="voting" className="space-y-3 mt-4">
            {mockVotingItems.map((item) => {
              const voteStatus = getVoteStatus(item);
              const percentage = getVotePercentage(item);
              
              return (
                <div key={item.id} className="border rounded-lg p-3 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                    </div>
                    <Badge className={`text-xs ${voteStatus.color}`}>
                      {item.status === 'active' ? voteStatus.status : 'completed'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Yes: {item.votes.filter(v => v.choice === 'yes').length}</span>
                      <span>No: {item.votes.filter(v => v.choice === 'no').length}</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                    <div className="text-xs text-gray-500">
                      Deadline: {item.deadline}
                    </div>
                  </div>
                  
                  {item.status === 'active' && (
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1 h-8 text-xs">
                        <Plus className="w-3 h-3 mr-1" />
                        Vote Yes
                      </Button>
                      <Button size="sm" variant="ghost" className="flex-1 h-8 text-xs">
                        <X className="w-3 h-3 mr-1" />
                        Vote No
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </TabsContent>

          {/* Expenses Tab */}
          <TabsContent value="expenses" className="space-y-3 mt-4">
            <div className="space-y-3">
              {mockExpenses.map(exp => (
                <div key={exp.id} className="flex items-center justify-between border rounded-lg p-3">
                  <div className="flex items-center gap-4">
                    <div className="text-lg">{getCategoryIcon(exp.category)}</div>
                    <div>
                      <div className="font-medium">{exp.description}</div>
                      <div className="text-xs text-muted-foreground">{exp.date}</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium">₹{exp.amount.toLocaleString()}</div>
                </div>
              ))}

              <div className="border rounded-lg p-3">
                <div className="grid grid-cols-3 gap-2">
                  <Input value={newExpense.description} onChange={e => setNewExpense({...newExpense, description: e.target.value})} placeholder="Description" />
                  <Input value={newExpense.amount} onChange={e => setNewExpense({...newExpense, amount: e.target.value})} placeholder="Amount" />
                  <select value={newExpense.category} onChange={e => setNewExpense({...newExpense, category: e.target.value})} className="rounded-md border px-2 py-2">
                    <option value="food">Food</option>
                    <option value="transport">Transport</option>
                    <option value="accommodation">Accommodation</option>
                  </select>
                </div>
                <div className="flex justify-end mt-2">
                  <Button size="sm">Add Expense</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Split Tab */}
          <TabsContent value="split" className="space-y-3 mt-4">
            <div className="space-y-3">
              <div className="text-sm">Total: ₹{totalExpenses.toLocaleString()}</div>
              <div className="grid gap-2">
                {Object.keys(memberExpenses).map(id => (
                  <div key={id} className="flex items-center justify-between border rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">{mockGroupMembers.find(m => m.id === id)?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{mockGroupMembers.find(m => m.id === id)?.name}</div>
                        <div className="text-xs text-muted-foreground">Paid: ₹{memberExpenses[id].paid.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="text-sm">Owes: ₹{Math.max(memberExpenses[id].owes, 0).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
