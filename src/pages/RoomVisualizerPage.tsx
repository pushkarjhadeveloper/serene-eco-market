
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RoomVisualizerPage = () => {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentStyle, setCurrentStyle] = useState("original");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setCurrentStyle("original");
      };
      reader.readAsDataURL(file);
    }
  };

  const applyStyle = (style: string) => {
    if (!selectedImage) return;
    
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      setCurrentStyle(style);
      setIsProcessing(false);
      
      toast({
        title: "Style Applied",
        description: `The ${style} style has been applied to your room`,
      });
    }, 1000);
  };

  const handleShare = () => {
    toast({
      title: "Share Feature",
      description: "Sharing functionality would be implemented here",
    });
  };

  const handleDownload = () => {
    if (!selectedImage) return;
    
    // Create a temporary anchor element to download the image
    const link = document.createElement('a');
    link.href = selectedImage;
    link.download = `room-visualizer-${currentStyle}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download Started",
      description: "Your visualized room image is downloading",
    });
  };

  // Styles that would be applied to the room
  const styles = [
    { id: "original", name: "Original" },
    { id: "earthy-tones", name: "Earthy Tones" },
    { id: "scandinavian-minimalism", name: "Scandinavian Minimalism" },
    { id: "luxury-neutrals", name: "Luxury Neutrals" },
  ];

  // Sample filter classes to simulate different styles
  const styleFilters: Record<string, string> = {
    original: "",
    "earthy-tones": "sepia(50%) hue-rotate(320deg) saturate(90%)",
    "scandinavian-minimalism": "brightness(110%) contrast(90%) saturate(70%)",
    "luxury-neutrals": "brightness(90%) contrast(110%) grayscale(20%)",
  };

  return (
    <Layout>
      <div className="eco-container py-12">
        <h1 className="font-serif text-4xl md:text-5xl font-medium text-eco-moss mb-6 text-center">
          Room Visualizer
        </h1>
        <p className="text-eco-bark max-w-2xl mx-auto text-center mb-12">
          Upload a photo of your room and see how different design styles would look in your space. 
          Experiment with color palettes and find the perfect style for your home.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-6 border border-eco-sand/30">
            <h2 className="font-serif text-2xl text-eco-moss mb-6">Upload Your Room</h2>
            
            <div className="border-2 border-dashed border-eco-sand rounded-lg p-8 text-center mb-6">
              <Upload className="mx-auto text-eco-sage mb-3 h-12 w-12" />
              <p className="mb-4 text-eco-bark">
                Upload a photo of your room to visualize different styles
              </p>
              <input
                type="file"
                id="room-upload"
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
              <Button className="eco-button" onClick={() => document.getElementById("room-upload")?.click()}>
                Choose Image
              </Button>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-eco-moss">Guidelines:</h3>
              <ul className="space-y-2 text-eco-bark list-disc pl-5">
                <li>Use a well-lit photo of your room</li>
                <li>Clear photos work best for visualization</li>
                <li>Maximum file size: 5MB</li>
                <li>Supported formats: JPEG, PNG</li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            {selectedImage ? (
              <div className="bg-white rounded-lg shadow-sm p-6 border border-eco-sand/30 h-full flex flex-col">
                <h2 className="font-serif text-2xl text-eco-moss mb-6">Room Preview</h2>
                
                <div className="flex-grow relative mb-6 bg-eco-sand/10 rounded-lg overflow-hidden">
                  {isProcessing && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eco-sage"></div>
                    </div>
                  )}
                  <img 
                    src={selectedImage} 
                    alt="Room preview" 
                    className="w-full h-full object-contain"
                    style={{ filter: styleFilters[currentStyle] }}
                  />
                </div>
                
                <Tabs defaultValue="original" className="w-full" onValueChange={applyStyle}>
                  <TabsList className="grid grid-cols-4 mb-6">
                    {styles.map(style => (
                      <TabsTrigger 
                        key={style.id} 
                        value={style.id}
                        className={currentStyle === style.id ? "bg-eco-sage text-white" : ""}
                      >
                        {style.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {styles.map(style => (
                    <TabsContent key={style.id} value={style.id} className="mt-0">
                      <p className="text-eco-bark mb-6">
                        {style.id === "original" 
                          ? "Your original room photo." 
                          : `This is how your room would look with ${style.name} style applied.`}
                      </p>
                    </TabsContent>
                  ))}
                </Tabs>
                
                <div className="flex gap-4 justify-end">
                  <Button variant="outline" className="border-eco-sage text-eco-moss" onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button className="eco-button" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6 border border-eco-sand/30 h-full flex flex-col items-center justify-center text-center">
                <img 
                  src="/lovable-uploads/ea69fbf3-3d61-4007-a901-a08a6c1fbe17.png" 
                  alt="Example room visualization" 
                  className="max-h-80 mb-6 rounded-lg shadow-md"
                />
                <h2 className="font-serif text-2xl text-eco-moss mb-4">See Your Room Transformed</h2>
                <p className="text-eco-bark mb-6 max-w-md">
                  Upload a photo of your room to see how different styles would look in your space.
                </p>
                <Button className="eco-button" onClick={() => document.getElementById("room-upload")?.click()}>
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RoomVisualizerPage;
