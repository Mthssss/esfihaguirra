
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Gift, Ticket, User, Heart, Coins } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Index = () => {
  const [userPoints, setUserPoints] = useState(850);
  const [nextRewardPoints] = useState(1000);
  const [userName] = useState('João Silva');

  const coupons = [
    { id: 1, title: '10% OFF', description: 'Em qualquer esfiha', expiry: '30/12/2024', code: 'ESFIHA10' },
    { id: 2, title: 'Esfiha Grátis', description: 'Na compra de 5 esfihas', expiry: '15/01/2025', code: 'GRATIS5' },
    { id: 3, title: '20% OFF', description: 'Em pedidos acima de R$ 50', expiry: '25/12/2024', code: 'NATAL20' }
  ];

  const orderHistory = [
    { id: 1, date: '20/12/2024', items: '3x Esfiha de Carne, 2x Esfiha de Queijo', points: 150, total: 'R$ 45,00' },
    { id: 2, date: '15/12/2024', items: '5x Esfiha Mista, 1x Refrigerante', points: 200, total: 'R$ 60,00' },
    { id: 3, date: '10/12/2024', items: '2x Esfiha de Frango, 1x Suco', points: 100, total: 'R$ 30,00' }
  ];

  const rewards = [
    { points: 500, reward: 'Esfiha Grátis', available: true },
    { points: 800, reward: '15% de Desconto', available: true },
    { points: 1000, reward: 'Combo Família Grátis', available: false },
    { points: 1500, reward: 'Jantar para 2 Pessoas', available: false }
  ];

  const progressPercentage = (userPoints / nextRewardPoints) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
      {/* Header */}
      <div className="bg-primary text-white py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Esfiharia Aguirra</h1>
              <p className="text-primary-100">Sistema de Fidelidade</p>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-8 h-8" />
              <span className="font-medium">{userName}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Points Card */}
        <Card className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white border-0 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Star className="w-6 h-6" />
                Seus Pontos
              </span>
              <Badge variant="secondary" className="bg-white text-primary-600 text-lg px-3 py-1">
                {userPoints} pts
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Próxima recompensa</span>
                  <span>{userPoints}/{nextRewardPoints} pontos</span>
                </div>
                <Progress value={progressPercentage} className="bg-white/20" />
              </div>
              <p className="text-sm opacity-90">
                Faltam apenas {nextRewardPoints - userPoints} pontos para sua próxima recompensa!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="rewards" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-primary-200">
            <TabsTrigger value="rewards" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Gift className="w-4 h-4 mr-2" />
              Recompensas
            </TabsTrigger>
            <TabsTrigger value="coupons" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Ticket className="w-4 h-4 mr-2" />
              Cupons
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Coins className="w-4 h-4 mr-2" />
              Histórico
            </TabsTrigger>
            <TabsTrigger value="offers" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Heart className="w-4 h-4 mr-2" />
              Ofertas
            </TabsTrigger>
          </TabsList>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-4">
            <div className="grid gap-4">
              {rewards.map((reward, index) => (
                <Card key={index} className={`border-2 ${reward.available ? 'border-primary-200 bg-white' : 'border-gray-200 bg-gray-50'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${reward.available ? 'bg-primary-100' : 'bg-gray-200'}`}>
                          <Gift className={`w-6 h-6 ${reward.available ? 'text-primary-600' : 'text-gray-400'}`} />
                        </div>
                        <div>
                          <h3 className={`font-semibold ${reward.available ? 'text-gray-900' : 'text-gray-500'}`}>
                            {reward.reward}
                          </h3>
                          <p className={`text-sm ${reward.available ? 'text-gray-600' : 'text-gray-400'}`}>
                            {reward.points} pontos
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant={reward.available ? "default" : "secondary"} 
                        disabled={!reward.available}
                        className={reward.available ? 'bg-primary hover:bg-primary-600' : ''}
                      >
                        {reward.available ? 'Resgatar' : 'Bloqueado'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Coupons Tab */}
          <TabsContent value="coupons" className="space-y-4">
            <div className="grid gap-4">
              {coupons.map((coupon) => (
                <Card key={coupon.id} className="border-2 border-secondary-200 bg-gradient-to-r from-white to-secondary-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-secondary-500 rounded-full flex items-center justify-center">
                          <Ticket className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{coupon.title}</h3>
                          <p className="text-gray-600">{coupon.description}</p>
                          <p className="text-sm text-gray-500">Válido até: {coupon.expiry}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-2 border-secondary-500 text-secondary-600">
                          {coupon.code}
                        </Badge>
                        <Button className="block bg-secondary hover:bg-secondary-600">
                          Usar Cupom
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4">
            <div className="grid gap-4">
              {orderHistory.map((order) => (
                <Card key={order.id} className="border border-accent-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-accent-600 border-accent-300">
                            {order.date}
                          </Badge>
                          <Badge className="bg-primary text-white">
                            +{order.points} pts
                          </Badge>
                        </div>
                        <p className="text-gray-700 mb-1">{order.items}</p>
                        <p className="font-semibold text-primary-600">{order.total}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Offers Tab */}
          <TabsContent value="offers" className="space-y-4">
            <Card className="border-2 border-primary-200 bg-gradient-to-r from-primary-50 to-secondary-50">
              <CardHeader>
                <CardTitle className="text-primary-700 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Ofertas Especiais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-white rounded-lg border border-primary-200">
                  <h3 className="font-semibold text-gray-900 mb-2">🎄 Promoção de Natal</h3>
                  <p className="text-gray-600 mb-3">Ganhe pontos em dobro em todos os pedidos até 31/12!</p>
                  <Badge className="bg-primary text-white animate-pulse-soft">Ativa</Badge>
                </div>
                
                <div className="p-4 bg-white rounded-lg border border-secondary-200">
                  <h3 className="font-semibold text-gray-900 mb-2">🍽️ Combo Família</h3>
                  <p className="text-gray-600 mb-3">10 esfihas + 2 refrigerantes por apenas R$ 75,00</p>
                  <Badge variant="outline" className="border-secondary-500 text-secondary-600">Disponível</Badge>
                </div>

                <div className="p-4 bg-white rounded-lg border border-accent-200">
                  <h3 className="font-semibold text-gray-900 mb-2">⭐ Cliente VIP</h3>
                  <p className="text-gray-600 mb-3">Acumule 2000 pontos e ganhe desconto vitalício de 5%</p>
                  <Badge variant="outline" className="border-accent-500 text-accent-600">Meta</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center py-6">
          <p className="text-gray-600 text-sm">
            Continue comprando e acumulando pontos na Esfiharia Aguirra!
          </p>
          <p className="text-gray-500 text-xs mt-2">
            A cada R$ 1,00 gasto = 5 pontos
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
