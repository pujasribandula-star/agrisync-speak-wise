import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ShoppingCart, 
  Search, 
  Filter,
  Star,
  MapPin,
  Truck,
  Shield,
  Phone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export const AgriMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const { toast } = useToast();
  const { translate } = useLanguage();

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'seeds', name: 'Seeds', icon: '🌱' },
    { id: 'fertilizers', name: 'Fertilizers', icon: '🧪' },
    { id: 'pesticides', name: 'Pesticides', icon: '🚫' },
    { id: 'tools', name: 'Tools', icon: '🔨' },
    { id: 'sensors', name: 'Smart Sensors', icon: '📡' }
  ];

  const products = [
    {
      id: 1,
      name: 'Hybrid Tomato Seeds',
      category: 'seeds',
      price: 850,
      originalPrice: 1000,
      image: '🍅',
      rating: 4.5,
      reviews: 128,
      seller: 'Maharashtra Seeds Co.',
      location: 'Pune, Maharashtra',
      delivery: '2-3 days',
      certified: true,
      description: 'High yield hybrid tomato seeds suitable for all seasons'
    },
    {
      id: 2,
      name: 'Organic Neem Fertilizer',
      category: 'fertilizers',
      price: 450,
      originalPrice: 500,
      image: '🌿',
      rating: 4.8,
      reviews: 89,
      seller: 'Green Earth Organics',
      location: 'Bangalore, Karnataka',
      delivery: '1-2 days',
      certified: true,
      description: '100% organic neem-based fertilizer for healthy soil'
    },
    {
      id: 3,
      name: 'Bio Pesticide Spray',
      category: 'pesticides',
      price: 320,
      originalPrice: 380,
      image: '🦗',
      rating: 4.3,
      reviews: 67,
      seller: 'BioGuard Solutions',
      location: 'Hyderabad, Telangana',
      delivery: '3-4 days',
      certified: true,
      description: 'Chemical-free pest control safe for crops and environment'
    },
    {
      id: 4,
      name: 'Smart Soil pH Sensor',
      category: 'sensors',
      price: 2500,
      originalPrice: 3000,
      image: '📊',
      rating: 4.7,
      reviews: 45,
      seller: 'AgriTech India',
      location: 'Delhi, India',
      delivery: '5-7 days',
      certified: true,
      description: 'Digital pH sensor with mobile app connectivity'
    },
    {
      id: 5,
      name: 'Drip Irrigation Kit',
      category: 'tools',
      price: 5500,
      originalPrice: 6500,
      image: '💧',
      rating: 4.6,
      reviews: 92,
      seller: 'Water Solutions Ltd',
      location: 'Gujarat, India',
      delivery: '7-10 days',
      certified: true,
      description: 'Complete drip irrigation system for 1 acre land'
    },
    {
      id: 6,
      name: 'Premium Wheat Seeds',
      category: 'seeds',
      price: 1200,
      originalPrice: 1400,
      image: '🌾',
      rating: 4.4,
      reviews: 156,
      seller: 'Punjab Agri Corp',
      location: 'Ludhiana, Punjab',
      delivery: '2-3 days',
      certified: true,
      description: 'High-quality wheat seeds with excellent yield potential'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const callSeller = (phone) => {
    toast({
      title: "Calling Seller",
      description: "Connecting you with the seller...",
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient flex items-center">
            <ShoppingCart className="h-8 w-8 mr-3 text-primary" />
            Agri Marketplace
          </h1>
          <p className="text-muted-foreground mt-2">
            Buy quality seeds, fertilizers, tools and equipment for your farm
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            Free Delivery above ₹500
          </Badge>
          <Button variant="outline" size="sm">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart ({cart.length})
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search seeds, fertilizers, tools..."
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto space-x-2 pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center space-x-2 whitespace-nowrap"
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden shadow-feature hover:shadow-glow transition-all">
            {/* Product Image */}
            <div className="relative bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center">
              <span className="text-6xl">{product.image}</span>
              {product.originalPrice > product.price && (
                <Badge className="absolute top-2 right-2 bg-destructive">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
              {product.certified && (
                <Badge className="absolute top-2 left-2 bg-success">
                  <Shield className="h-3 w-3 mr-1" />
                  Certified
                </Badge>
              )}
            </div>

            {/* Product Details */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>

              {/* Seller Info */}
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="font-medium">{product.seller}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{product.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Truck className="h-3 w-3" />
                  <span>Delivery: {product.delivery}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <Button 
                  onClick={() => addToCart(product)}
                  className="flex-1"
                >
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => callSeller(product.seller)}
                >
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Popular Categories */}
      <Card className="p-6 shadow-feature bg-gradient-to-r from-primary/5 to-accent/5">
        <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <span className="text-2xl">🌱</span>
            <span className="text-sm">Vegetable Seeds</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <span className="text-2xl">🧪</span>
            <span className="text-sm">Organic Fertilizers</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <span className="text-2xl">🔧</span>
            <span className="text-sm">Farm Tools</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <span className="text-2xl">📱</span>
            <span className="text-sm">Smart Devices</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};