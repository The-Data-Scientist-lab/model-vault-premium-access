
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock purchase history data
  const purchases = [
    { id: 'p1', model: 'Lucky Rajor', plan: 'Premium Plan', date: '2023-04-15', status: 'completed' },
    { id: 'p2', model: 'Miss Pinky', plan: 'Basic Plan', date: '2023-03-22', status: 'failed' },
    { id: 'p3', model: 'Shanaya Katiyan', plan: 'VIP Plan', date: '2023-02-10', status: 'completed' },
  ];

  const handleSaveProfile = () => {
    // In a real app, this would update the user profile in your backend
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="container mx-auto p-4 py-6 md:py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">My Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="soft-shadow">
            <CardHeader>
              <div className="flex flex-col items-center">
                <Avatar className="h-20 w-20 md:h-24 md:w-24 mb-4">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || 'User'}`} />
                  <AvatarFallback>{(user?.name || 'U')[0]}</AvatarFallback>
                </Avatar>
                <CardTitle>{user?.name}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="flex-1 bg-theme-primary hover:bg-theme-primary/90"
                      onClick={handleSaveProfile}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Tabs defaultValue="purchases">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="purchases">Purchase History</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>
            
            <TabsContent value="purchases" className="mt-4">
              <Card className="soft-shadow">
                <CardHeader>
                  <CardTitle>Your Purchases</CardTitle>
                  <CardDescription>
                    View your purchase history and access status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {purchases.length > 0 ? (
                    <div className="space-y-4">
                      {purchases.map(purchase => (
                        <div 
                          key={purchase.id} 
                          className="border rounded-lg p-4 hover:border-theme-primary/50 transition-colors soft-shadow"
                        >
                          <div className="flex flex-wrap justify-between items-start gap-2">
                            <div>
                              <h3 className="font-medium">{purchase.model}</h3>
                              <p className="text-sm text-muted-foreground">{purchase.plan}</p>
                            </div>
                            <Badge className={purchase.status === 'completed' ? 'bg-green-600' : 'bg-red-600'}>
                              {purchase.status === 'completed' ? 'Completed' : 'Failed'}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Purchased on {new Date(purchase.date).toLocaleDateString()}
                          </p>
                          {purchase.status === 'completed' && (
                            <div className="mt-2">
                              <Button variant="outline" size="sm" className="text-xs">
                                Access Content
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <p>You haven't made any purchases yet.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="favorites" className="mt-4">
              <Card className="soft-shadow">
                <CardHeader>
                  <CardTitle>Your Favorites</CardTitle>
                  <CardDescription>
                    Models you've marked as favorites
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6 text-muted-foreground">
                    <p>You haven't added any favorites yet.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
