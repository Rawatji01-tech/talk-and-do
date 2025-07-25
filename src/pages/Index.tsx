import VoiceAssistant from '@/components/VoiceAssistant';
import { Card } from '@/components/ui/card';
import { Mic, Smartphone, Volume2 } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-primary shadow-lg shadow-primary/20">
              <Mic className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            वॉइस असिस्टेंट
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            आवाज़ से कंट्रोल करें अपना फोन
          </p>
          <p className="text-sm text-muted-foreground">
            बिना हाथ लगाए - केवल आवाज़ से सब कुछ करें
          </p>
        </div>

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4 text-center bg-card/50 backdrop-blur border-border hover:border-primary/20 transition-colors">
            <Smartphone className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-1">ऐप कंट्रोल</h3>
            <p className="text-xs text-muted-foreground">ऐप खोलें और बंद करें</p>
          </Card>
          <Card className="p-4 text-center bg-card/50 backdrop-blur border-border hover:border-primary/20 transition-colors">
            <Volume2 className="h-8 w-8 mx-auto mb-2 text-accent" />
            <h3 className="font-semibold mb-1">कॉल मैनेजमेंट</h3>
            <p className="text-xs text-muted-foreground">कॉल उठाएं या काटें</p>
          </Card>
          <Card className="p-4 text-center bg-card/50 backdrop-blur border-border hover:border-primary/20 transition-colors">
            <Mic className="h-8 w-8 mx-auto mb-2 text-voice-speaking" />
            <h3 className="font-semibold mb-1">स्क्रीनशॉट</h3>
            <p className="text-xs text-muted-foreground">आवाज़ से फोटो लें</p>
          </Card>
        </div>

        {/* Main Voice Assistant */}
        <VoiceAssistant />

        {/* Setup Instructions */}
        <Card className="mt-8 p-6 bg-card/30 backdrop-blur border-border">
          <h3 className="text-lg font-semibold mb-4 text-center">
            मोबाइल ऐप के लिए सेटअप
          </h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>📱 <strong>पूरी सुविधाओं के लिए:</strong></p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>प्रोजेक्ट को GitHub पर export करें</li>
              <li>अपने कंप्यूटर पर <code>git pull</code> करें</li>
              <li><code>npm install</code> चलाएं</li>
              <li><code>npx cap add android</code> या <code>npx cap add ios</code> चलाएं</li>
              <li><code>npm run build && npx cap sync</code> चलाएं</li>
              <li><code>npx cap run android</code> या <code>npx cap run ios</code> चलाएं</li>
            </ol>
            <p className="mt-4 text-center">
              🔗 <a href="https://lovable.dev/blogs/TODO" className="text-primary hover:underline">
                मोबाइल डेवलपमेंट गाइड पढ़ें
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
