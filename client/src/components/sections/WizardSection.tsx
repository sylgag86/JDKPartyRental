import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { NeonButton } from "@/components/ui/NeonButton";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { smoothScrollTo } from "@/lib/utils";

// Define the schema for the wizard form
const wizardSchema = z.object({
  // Step 1: Event Information
  eventType: z.string().min(1, "Please select an event type"),
  guestCount: z.string().min(1, "Please select guest count range"),
  venue: z.string().min(1, "Please select a venue type"),
  
  // Step 2: Experience Preferences
  duration: z.string().min(1, "Please select a duration"),
  features: z.array(z.string()).min(1, "Please select at least one feature"),
  
  // Step 3: Personal Information
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
});

type WizardFormValues = z.infer<typeof wizardSchema>;

// Package data for recommendations
const packages = [
  {
    id: 1,
    name: "Essential Experience",
    description: "Perfect for intimate gatherings with essential features.",
    features: ["Basic backdrop", "Standard props", "Digital sharing"],
    price: "$299",
    idealFor: ["birthday", "small", "indoor"],
    duration: "2 hours",
    color: "blue",
  },
  {
    id: 2,
    name: "Premium Party",
    description: "Take your event to the next level with premium features and more time.",
    features: ["Premium backdrop", "Custom props", "Digital sharing", "Print station"],
    price: "$499",
    idealFor: ["wedding", "corporate", "medium", "indoor", "outdoor"],
    duration: "3 hours",
    color: "pink",
  },
  {
    id: 3,
    name: "Ultimate Celebration",
    description: "The complete package for an unforgettable experience.",
    features: [
      "Multiple backdrops",
      "Custom props",
      "Digital sharing",
      "Print station",
      "GIF creation",
      "Social media integration"
    ],
    price: "$799",
    idealFor: ["wedding", "corporate", "large", "indoor", "outdoor"],
    duration: "4 hours",
    color: "purple",
  },
  {
    id: 4,
    name: "VIP Experience",
    description: "Exclusive features and unlimited time for your special event.",
    features: [
      "Multiple backdrops",
      "Custom props",
      "Digital sharing",
      "Print station",
      "GIF creation",
      "Social media integration",
      "On-site attendant",
      "Custom branding"
    ],
    price: "$1,199",
    idealFor: ["wedding", "corporate", "large", "indoor", "outdoor"],
    duration: "Unlimited",
    color: "gold",
  },
];

// Available features for selection
const availableFeatures = [
  { id: "digital", label: "Digital Sharing" },
  { id: "print", label: "Print Station" },
  { id: "gifs", label: "GIFs & Boomerangs" },
  { id: "backdrop", label: "Multiple Backdrops" },
  { id: "props", label: "Custom Props" },
  { id: "social", label: "Social Media Integration" },
  { id: "attendant", label: "On-site Attendant" },
  { id: "branding", label: "Custom Branding" },
];

export default function WizardSection() {
  const [step, setStep] = useState(1);
  const [recommendations, setRecommendations] = useState<typeof packages>([]);
  const [showResults, setShowResults] = useState(false);
  
  // Initialize the form
  const form = useForm<WizardFormValues>({
    resolver: zodResolver(wizardSchema),
    defaultValues: {
      eventType: "",
      guestCount: "",
      venue: "",
      duration: "",
      features: [],
      name: "",
      email: "",
      phone: "",
    },
  });
  
  // Handle next step
  const handleNext = async () => {
    // Validate the current step
    let isValid = false;
    
    if (step === 1) {
      isValid = await form.trigger(["eventType", "guestCount", "venue"]);
    } else if (step === 2) {
      isValid = await form.trigger(["duration", "features"]);
    }
    
    if (isValid) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
  // Handle previous step
  const handlePrev = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  // Generate recommendations based on form data
  const generateRecommendations = (data: WizardFormValues) => {
    // Convert guestCount to a category
    let guestCategory = "small";
    if (data.guestCount === "50-100") guestCategory = "medium";
    if (data.guestCount === "100+") guestCategory = "large";
    
    // Calculate match score for each package
    const scoredPackages = packages.map(pkg => {
      let score = 0;
      
      // Match event type
      if (pkg.idealFor.includes(data.eventType.toLowerCase())) score += 2;
      
      // Match guest count
      if (pkg.idealFor.includes(guestCategory)) score += 2;
      
      // Match venue
      if (pkg.idealFor.includes(data.venue.toLowerCase())) score += 1;
      
      // Match duration
      if (pkg.duration.includes(data.duration) || pkg.duration === "Unlimited") score += 2;
      
      // Match features
      const featureCount = data.features.filter(f => 
        pkg.features.some(pf => pf.toLowerCase().includes(f.toLowerCase()))
      ).length;
      score += featureCount;
      
      return { ...pkg, score };
    });
    
    // Sort by score and return top 2 recommendations
    return scoredPackages
      .sort((a, b) => b.score - a.score)
      .slice(0, 2);
  };
  
  // Handle form submission
  const onSubmit = (data: WizardFormValues) => {
    const recommended = generateRecommendations(data);
    setRecommendations(recommended);
    setShowResults(true);
    
    // Scroll to results
    setTimeout(() => {
      smoothScrollTo("wizard-results");
    }, 100);
  };
  
  // Handle booking a recommended package
  const handleBookPackage = (packageId: number) => {
    // Get the package name
    const packageName = packages.find(p => p.id === packageId)?.name || "";
    
    // Store selection in session storage
    sessionStorage.setItem("selectedPackage", packageName);
    
    // Scroll to booking section
    smoothScrollTo("book-now");
  };
  
  return (
    <section id="wizard" className="py-20 relative bg-gradient-to-b from-[hsl(var(--dark-bg))] to-[hsl(var(--dark-bg2))]">
      <Container>
        <Heading
          title="Find Your Perfect Photo Booth"
          subtitle="Answer a few questions to discover the ideal photo booth experience for your event"
          center
          glowColor="purple"
        />
        
        <div className="max-w-2xl mx-auto mt-12">
          {!showResults ? (
            <Card className="border-[hsl(var(--neon-purple))] bg-[hsl(var(--dark-bg))] shadow-neon-purple">
              <CardHeader>
                <CardTitle className="text-center text-white">
                  {step === 1 && "Tell us about your event"}
                  {step === 2 && "Choose your experience"}
                  {step === 3 && "Your information"}
                </CardTitle>
                <CardDescription className="text-center">
                  Step {step} of 3
                </CardDescription>
                
                {/* Progress indicator */}
                <div className="w-full bg-[hsl(var(--dark-bg2))] h-2 rounded-full mt-4">
                  <div 
                    className="bg-gradient-to-r from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-blue))] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(step / 3) * 100}%` }}
                  ></div>
                </div>
              </CardHeader>
              
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Step 1: Event Information */}
                    {step === 1 && (
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="eventType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Event Type</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-[hsl(var(--dark-bg2))] border-[hsl(var(--neon-purple))]">
                                    <SelectValue placeholder="Select your event type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-[hsl(var(--dark-bg2))]">
                                  <SelectItem value="wedding">Wedding</SelectItem>
                                  <SelectItem value="birthday">Birthday Party</SelectItem>
                                  <SelectItem value="corporate">Corporate Event</SelectItem>
                                  <SelectItem value="graduation">Graduation</SelectItem>
                                  <SelectItem value="reunion">Reunion</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="guestCount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number of Guests</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-[hsl(var(--dark-bg2))] border-[hsl(var(--neon-purple))]">
                                    <SelectValue placeholder="Select guest count" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-[hsl(var(--dark-bg2))]">
                                  <SelectItem value="<50">Less than 50</SelectItem>
                                  <SelectItem value="50-100">50-100</SelectItem>
                                  <SelectItem value="100+">More than 100</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="venue"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Venue Type</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-[hsl(var(--dark-bg2))] border-[hsl(var(--neon-purple))]">
                                    <SelectValue placeholder="Select venue type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-[hsl(var(--dark-bg2))]">
                                  <SelectItem value="indoor">Indoor</SelectItem>
                                  <SelectItem value="outdoor">Outdoor</SelectItem>
                                  <SelectItem value="both">Both Indoor & Outdoor</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    
                    {/* Step 2: Experience Preferences */}
                    {step === 2 && (
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="duration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Desired Duration</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-[hsl(var(--dark-bg2))] border-[hsl(var(--neon-purple))]">
                                    <SelectValue placeholder="Select duration" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-[hsl(var(--dark-bg2))]">
                                  <SelectItem value="2 hours">2 Hours</SelectItem>
                                  <SelectItem value="3 hours">3 Hours</SelectItem>
                                  <SelectItem value="4 hours">4 Hours</SelectItem>
                                  <SelectItem value="5+ hours">5+ Hours</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="features"
                          render={() => (
                            <FormItem>
                              <div className="mb-4">
                                <FormLabel>Desired Features</FormLabel>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {availableFeatures.map((feature) => (
                                  <FormField
                                    key={feature.id}
                                    control={form.control}
                                    name="features"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={feature.id}
                                          className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(feature.id)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, feature.id])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) => value !== feature.id
                                                      )
                                                    )
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            {feature.label}
                                          </FormLabel>
                                        </FormItem>
                                      )
                                    }}
                                  />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    
                    {/* Step 3: Personal Information */}
                    {step === 3 && (
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="John Doe" 
                                  {...field} 
                                  className="bg-[hsl(var(--dark-bg2))] border-[hsl(var(--neon-purple))]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="john@example.com" 
                                  type="email"
                                  {...field} 
                                  className="bg-[hsl(var(--dark-bg2))] border-[hsl(var(--neon-purple))]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="(123) 456-7890" 
                                  {...field} 
                                  className="bg-[hsl(var(--dark-bg2))] border-[hsl(var(--neon-purple))]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </form>
                </Form>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                {step > 1 && (
                  <NeonButton 
                    color="blue" 
                    onClick={handlePrev}
                    variant="outline"
                    type="button"
                  >
                    Previous
                  </NeonButton>
                )}
                
                <div className={`flex ${step > 1 ? "justify-end" : "justify-center w-full"}`}>
                  {step < 3 ? (
                    <NeonButton 
                      color="purple" 
                      onClick={handleNext}
                      type="button"
                    >
                      Next
                    </NeonButton>
                  ) : (
                    <NeonButton 
                      color="gold" 
                      onClick={form.handleSubmit(onSubmit)}
                      type="button"
                    >
                      Get Recommendations
                    </NeonButton>
                  )}
                </div>
              </CardFooter>
            </Card>
          ) : (
            <div id="wizard-results" className="scroll-mt-24">
              <h3 className="text-2xl font-bold text-center mb-8 text-white">
                Your Personalized Recommendations
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.map((pkg) => (
                  <Card 
                    key={pkg.id} 
                    className={`border-[hsl(var(--neon-${pkg.color}))] bg-[hsl(var(--dark-bg))] shadow-neon-${pkg.color} transition-all duration-300 hover:transform hover:scale-105`}
                  >
                    <CardHeader>
                      <CardTitle className={`text-[hsl(var(--neon-${pkg.color}))] text-glow-${pkg.color}`}>
                        {pkg.name}
                      </CardTitle>
                      <CardDescription>
                        {pkg.description}
                      </CardDescription>
                      <div className={`text-2xl font-bold text-[hsl(var(--neon-${pkg.color}))] text-glow-${pkg.color}`}>
                        {pkg.price}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-sm text-gray-400 mb-2">Duration: {pkg.duration}</p>
                      <p className="font-semibold text-white mb-2">Includes:</p>
                      <ul className="space-y-1">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <span className={`text-[hsl(var(--neon-${pkg.color}))] mr-2`}>✓</span> 
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    
                    <CardFooter>
                      <NeonButton 
                        color={pkg.color as any} 
                        className="w-full" 
                        onClick={() => handleBookPackage(pkg.id)}
                      >
                        Book This Package
                      </NeonButton>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-center mt-8">
                <NeonButton 
                  color="blue" 
                  variant="outline" 
                  onClick={() => {
                    setShowResults(false);
                    setStep(1);
                    form.reset();
                  }}
                >
                  Restart Wizard
                </NeonButton>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}