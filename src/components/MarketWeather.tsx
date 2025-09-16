import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Cloud, Sun, CloudRain, Wind, Thermometer, Droplets } from "lucide-react";

export const MarketWeather = () => {
  const marketPrices = [
    { crop: 'Wheat (गेहूं)', price: 2850, change: +120, changePercent: 4.4, unit: 'per quintal' },
    { crop: 'Rice (चावल)', price: 3200, change: -80, changePercent: -2.4, unit: 'per quintal' },
    { crop: 'Mustard (सरसों)', price: 6500, change: +250, changePercent: 4.0, unit: 'per quintal' },
    { crop: 'Cotton (कपास)', price: 8200, change: +180, changePercent: 2.2, unit: 'per quintal' },
    { crop: 'Sugarcane (गन्ना)', price: 385, change: +15, changePercent: 4.1, unit: 'per quintal' },
    { crop: 'Onion (प्याज)', price: 1200, change: -200, changePercent: -14.3, unit: 'per quintal' }
  ];

  const weatherForecast = [
    { day: 'Today', date: '16 Sep', temp: { high: 32, low: 24 }, condition: 'Sunny', icon: Sun, humidity: 65, wind: 12 },
    { day: 'Tomorrow', date: '17 Sep', temp: { high: 30, low: 22 }, condition: 'Partly Cloudy', icon: Cloud, humidity: 70, wind: 15 },
    { day: 'Wed', date: '18 Sep', temp: { high: 28, low: 20 }, condition: 'Light Rain', icon: CloudRain, humidity: 85, wind: 18 },
    { day: 'Thu', date: '19 Sep', temp: { high: 26, low: 18 }, condition: 'Heavy Rain', icon: CloudRain, humidity: 90, wind: 22 },
    { day: 'Fri', date: '20 Sep', temp: { high: 29, low: 21 }, condition: 'Cloudy', icon: Cloud, humidity: 75, wind: 16 },
    { day: 'Sat', date: '21 Sep', temp: { high: 31, low: 23 }, condition: 'Sunny', icon: Sun, humidity: 60, wind: 10 }
  ];

  const demandForecast = [
    { crop: 'Wheat', trend: 'increasing', reason: 'Festival season approaching', recommendation: 'Hold for 2 weeks' },
    { crop: 'Rice', trend: 'stable', reason: 'Steady consumption', recommendation: 'Sell at current price' },
    { crop: 'Mustard', trend: 'increasing', reason: 'Oil demand rising', recommendation: 'Good time to sell' },
    { crop: 'Onion', trend: 'decreasing', reason: 'New harvest arriving', recommendation: 'Sell immediately' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Market & Weather</h1>
          <p className="text-muted-foreground">Real-time prices and weather forecast for smart farming decisions</p>
        </div>
        <Badge variant="outline" className="bg-accent-bright/10 text-accent-bright border-accent-bright/20">
          Live Updates
        </Badge>
      </div>

      {/* Market Prices */}
      <Card className="p-6 shadow-feature">
        <h3 className="text-lg font-semibold mb-6 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-primary" />
          Today's Market Prices (Haryana Mandi)
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {marketPrices.map((item, index) => (
            <div key={index} className="p-4 border rounded-lg hover:shadow-soft transition-smooth">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{item.crop}</h4>
                <Badge 
                  variant={item.change > 0 ? 'default' : 'destructive'}
                  className={item.change > 0 ? 'bg-success/10 text-success border-success/20' : ''}
                >
                  {item.change > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {Math.abs(item.changePercent)}%
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="text-xl font-bold text-primary">₹{item.price.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">{item.unit}</div>
                <div className={`text-sm ${item.change > 0 ? 'text-success' : 'text-destructive'}`}>
                  {item.change > 0 ? '+' : ''}₹{item.change} from yesterday
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Weather Forecast */}
        <Card className="p-6 shadow-feature">
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <Cloud className="h-5 w-5 mr-2 text-accent-bright" />
            7-Day Weather Forecast
          </h3>
          <div className="space-y-3">
            {weatherForecast.map((day, index) => {
              const Icon = day.icon;
              return (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-accent-bright" />
                    <div>
                      <div className="font-medium text-sm">{day.day}</div>
                      <div className="text-xs text-muted-foreground">{day.date}</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{day.condition}</div>
                    <div className="text-xs text-muted-foreground flex items-center space-x-2">
                      <span className="flex items-center">
                        <Thermometer className="h-3 w-3 mr-1" />
                        {day.temp.high}°/{day.temp.low}°
                      </span>
                      <span className="flex items-center">
                        <Droplets className="h-3 w-3 mr-1" />
                        {day.humidity}%
                      </span>
                      <span className="flex items-center">
                        <Wind className="h-3 w-3 mr-1" />
                        {day.wind}km/h
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Demand Forecast */}
        <Card className="p-6 shadow-feature">
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-success" />
            Demand Forecast & Recommendations
          </h3>
          <div className="space-y-4">
            {demandForecast.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{item.crop}</h4>
                  <Badge 
                    variant={item.trend === 'increasing' ? 'default' : item.trend === 'stable' ? 'secondary' : 'destructive'}
                    className={
                      item.trend === 'increasing' ? 'bg-success/10 text-success border-success/20' :
                      item.trend === 'stable' ? 'bg-accent/10 text-accent-foreground border-accent/20' : ''
                    }
                  >
                    {item.trend === 'increasing' ? <TrendingUp className="h-3 w-3 mr-1" /> : 
                     item.trend === 'decreasing' ? <TrendingDown className="h-3 w-3 mr-1" /> : null}
                    {item.trend}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{item.reason}</p>
                  <div className="p-2 bg-primary/5 rounded text-sm font-medium text-primary">
                    💡 {item.recommendation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Weather-Based Farming Advice */}
      <Card className="p-6 shadow-feature bg-gradient-to-r from-accent-bright/5 to-primary/5">
        <h3 className="text-lg font-semibold mb-4">Weather-Based Farming Advice</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium text-primary">Next 3 Days (Rain Expected)</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• ✅ Good time for transplanting rice seedlings</li>
              <li>• ⚠️ Postpone pesticide application until dry weather</li>
              <li>• 🚫 Avoid harvesting mature crops</li>
              <li>• ✅ Prepare drainage in low-lying areas</li>
              <li>• ✅ Apply nitrogen fertilizer before rain</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-primary">This Week's Priority Actions</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• 🌱 Plant mustard and gram before Oct 15</li>
              <li>• 💧 Check irrigation channels for blockages</li>
              <li>• 🧪 Apply fungicide to prevent post-rain diseases</li>
              <li>• 📊 Monitor soil moisture levels</li>
              <li>• 🌾 Harvest any ready crops before heavy rain</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 flex space-x-3">
          <Button variant="default">Set Weather Alerts</Button>
          <Button variant="outline">Export Market Report</Button>
        </div>
      </Card>
    </div>
  );
};