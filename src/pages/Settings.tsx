
import { useState, useEffect } from "react";
import UserNavbar from "@/components/UserNavbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Key } from "lucide-react";

const Settings = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [model, setModel] = useState<string>("qwen-2.5-32b");
  const { toast } = useToast();

  // Load saved API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("groqApiKey");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    
    const savedModel = localStorage.getItem("groqModel");
    if (savedModel) {
      setModel(savedModel);
    }
  }, []);

  const saveSettings = () => {
    // Save API key to localStorage
    localStorage.setItem("groqApiKey", apiKey);
    localStorage.setItem("groqModel", model);
    
    toast({
      title: "Settings saved",
      description: "Your Groq API settings have been saved successfully.",
    });
  };

  const models = [
    { value: "qwen-2.5-32b", label: "Qwen-2.5 (32B)" },
    { value: "qwen-2.5-8b", label: "Qwen-2.5 (8B)" },
    { value: "llama-3.1-8b", label: "Llama-3.1 (8B)" },
    { value: "llama-3.1-70b", label: "Llama-3.1 (70B)" },
    { value: "mixtral-8x7b", label: "Mixtral-8x7B" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <UserNavbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="#api-settings" className="font-medium flex items-center gap-2 text-blue-600">
                      <Key className="h-4 w-4" />
                      API Settings
                    </a>
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card id="api-settings">
              <CardHeader>
                <CardTitle>Groq API Settings</CardTitle>
                <CardDescription>
                  Enter your Groq API key and select the default model for tests.
                  Get your API key from the <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Groq Console</a>.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Enter your Groq API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="model">Default Model</Label>
                  <Select value={model} onValueChange={setModel}>
                    <SelectTrigger id="model">
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((model) => (
                        <SelectItem key={model.value} value={model.value}>
                          {model.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={saveSettings}>Save Settings</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
