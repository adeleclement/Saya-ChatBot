
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Heart, Activity, Brain, Moon, User, DollarSign, LayoutDashboard, FileText, Edit, Save, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define form schema with Zod
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  category: z.enum(['reproductive', 'pregnancy', 'physical', 'mental', 'sleep', 'financial']),
  linkSlug: z.string().min(3, "URL slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens")
});

type FormValues = z.infer<typeof formSchema>;

// Sample data for existing resources
const sampleResources = [
  {
    id: 1,
    title: "Understanding Reproductive Health",
    description: "A comprehensive guide to reproductive health for women of all ages.",
    category: "reproductive",
    content: "This comprehensive guide covers the essentials of reproductive health including menstrual cycles, fertility tracking, and contraception options. Knowledge is power when it comes to your reproductive health.",
    linkSlug: "reproductive-health-basics"
  },
  {
    id: 2,
    title: "Mental Health During Pregnancy",
    description: "Managing your mental wellbeing while expecting.",
    category: "pregnancy",
    content: "Pregnancy can bring significant changes to your emotional wellbeing. This guide discusses common mental health challenges during pregnancy and effective coping strategies.",
    linkSlug: "pregnancy-mental-health"
  },
  {
    id: 3,
    title: "Sleep Habits for New Parents",
    description: "Strategies to improve sleep quality for parents of newborns.",
    category: "sleep",
    content: "New parents often struggle with sleep deprivation. This resource provides practical tips for maximizing sleep quality during the challenging newborn phase.",
    linkSlug: "new-parent-sleep"
  }
];

const AdminResources = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [resources, setResources] = useState(sampleResources);
  const [editingResource, setEditingResource] = useState<null | (typeof sampleResources)[0]>(null);
  
  // Mock admin password - in a real app, this would be authenticated through a backend
  const ADMIN_PASSWORD = "admin123";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      category: "reproductive",
      linkSlug: ""
    }
  });
  
  const editForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      category: "reproductive",
      linkSlug: ""
    }
  });

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthorized(true);
      toast({
        title: "Admin Access Granted",
        description: "You now have access to publish resources."
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect password. Please try again.",
        variant: "destructive"
      });
    }
  };

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    // In a real application, this would send data to your backend/database
    // For demonstration, we'll simulate an API call
    setTimeout(() => {
      const newResource = {
        id: resources.length + 1,
        ...data
      };
      
      setResources([...resources, newResource]);
      
      console.log("Resource published:", data);
      toast({
        title: "Resource Published!",
        description: `"${data.title}" has been added to resources.`
      });
      setIsSubmitting(false);
      form.reset();
    }, 1500);
  };

  const startEditing = (resource: (typeof resources)[0]) => {
    setEditingResource(resource);
    editForm.reset({
      title: resource.title,
      description: resource.description,
      content: resource.content,
      category: resource.category as any,
      linkSlug: resource.linkSlug
    });
  };
  
  const saveEdit = (data: FormValues) => {
    if (!editingResource) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedResources = resources.map(res => 
        res.id === editingResource.id ? { ...res, ...data } : res
      );
      
      setResources(updatedResources);
      setEditingResource(null);
      
      toast({
        title: "Resource Updated!",
        description: `"${data.title}" has been updated successfully.`
      });
      setIsSubmitting(false);
    }, 1000);
  };
  
  const deleteResource = (id: number) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      const updatedResources = resources.filter(res => res.id !== id);
      setResources(updatedResources);
      
      toast({
        title: "Resource Deleted",
        description: "The resource has been removed."
      });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'reproductive':
        return <Heart size={20} />;
      case 'pregnancy':
        return <User size={20} />;
      case 'physical':
        return <Activity size={20} />;
      case 'mental':
        return <Brain size={20} />;
      case 'sleep':
        return <Moon size={20} />;
      case 'financial':
        return <DollarSign size={20} />;
      default:
        return <Heart size={20} />;
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 bg-lumi-gray-light/30">
          <div className="container max-w-5xl mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              variants={fadeIn}
            >
              <h1 className="text-3xl md:text-4xl font-display font-bold text-lumi-purple-dark mb-4">
                Admin Resources Dashboard
              </h1>
              <p className="text-lumi-gray-dark max-w-2xl mx-auto">
                Publish new resources and manage existing content for your users.
              </p>
            </motion.div>

            {!isAuthorized ? (
              <motion.div 
                className="max-w-md mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                variants={fadeIn}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Admin Authentication</CardTitle>
                    <CardDescription className="text-center">Use password: "admin123" to access the dashboard</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAdminAuth} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Admin Password</Label>
                        <Input 
                          id="password"
                          type="password"
                          placeholder="Enter admin password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <Button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-lumi-purple to-lumi-purple-dark"
                      >
                        Authenticate
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.5 }}
              >
                <Tabs defaultValue="publish" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="publish" className="flex items-center gap-2">
                      <Edit size={16} />
                      Publish New Resource
                    </TabsTrigger>
                    <TabsTrigger value="manage" className="flex items-center gap-2">
                      <LayoutDashboard size={16} />
                      Manage Resources
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="publish">
                    <Card>
                      <CardHeader>
                        <CardTitle>Publish New Resource</CardTitle>
                        <CardDescription>
                          Create a new resource for users to access in the resources section.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Resource Title</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Enter title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="reproductive">Reproductive Health</SelectItem>
                                        <SelectItem value="pregnancy">Pregnancy & Postpartum</SelectItem>
                                        <SelectItem value="physical">Physical Wellness</SelectItem>
                                        <SelectItem value="mental">Mental Health</SelectItem>
                                        <SelectItem value="sleep">Sleep & Rest</SelectItem>
                                        <SelectItem value="financial">Financial Wellness</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <FormField
                              control={form.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Short Description</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Brief description for resource cards (100-150 characters recommended)"
                                      className="resize-none"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="content"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Content</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Full content of the resource"
                                      className="min-h-[200px]"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="linkSlug"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>URL Slug</FormLabel>
                                  <FormControl>
                                    <div className="flex items-center">
                                      <span className="text-muted-foreground mr-2">/learn-more/</span>
                                      <Input placeholder="url-slug" {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div className="pt-4">
                              <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-lumi-purple to-lumi-purple-dark"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? "Publishing..." : "Publish Resource"}
                              </Button>
                            </div>
                          </form>
                        </Form>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="manage">
                    {editingResource ? (
                      <Card>
                        <CardHeader>
                          <CardTitle>Edit Resource</CardTitle>
                          <CardDescription>
                            Update the details for "{editingResource.title}"
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Form {...editForm}>
                            <form onSubmit={editForm.handleSubmit(saveEdit)} className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                  control={editForm.control}
                                  name="title"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Resource Title</FormLabel>
                                      <FormControl>
                                        <Input placeholder="Enter title" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={editForm.control}
                                  name="category"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Category</FormLabel>
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value="reproductive">Reproductive Health</SelectItem>
                                          <SelectItem value="pregnancy">Pregnancy & Postpartum</SelectItem>
                                          <SelectItem value="physical">Physical Wellness</SelectItem>
                                          <SelectItem value="mental">Mental Health</SelectItem>
                                          <SelectItem value="sleep">Sleep & Rest</SelectItem>
                                          <SelectItem value="financial">Financial Wellness</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              
                              <FormField
                                control={editForm.control}
                                name="description"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Short Description</FormLabel>
                                    <FormControl>
                                      <Textarea 
                                        placeholder="Brief description for resource cards"
                                        className="resize-none"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={editForm.control}
                                name="content"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Full Content</FormLabel>
                                    <FormControl>
                                      <Textarea 
                                        placeholder="Full content of the resource"
                                        className="min-h-[200px]"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={editForm.control}
                                name="linkSlug"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>URL Slug</FormLabel>
                                    <FormControl>
                                      <div className="flex items-center">
                                        <span className="text-muted-foreground mr-2">/learn-more/</span>
                                        <Input placeholder="url-slug" {...field} />
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <div className="flex gap-4 pt-4">
                                <Button
                                  type="submit"
                                  className="flex-1 bg-gradient-to-r from-lumi-purple to-lumi-purple-dark"
                                  disabled={isSubmitting}
                                >
                                  <Save className="mr-2" size={18} />
                                  {isSubmitting ? "Saving..." : "Save Changes"}
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => setEditingResource(null)}
                                  className="flex-1"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </form>
                          </Form>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Manage Existing Resources</CardTitle>
                            <CardDescription>
                              Edit or delete resources from the database
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            {resources.length === 0 ? (
                              <div className="text-center py-8 text-muted-foreground">
                                No resources found. Create your first resource.
                              </div>
                            ) : (
                              <div className="space-y-4">
                                {resources.map((resource) => (
                                  <Card key={resource.id} className="overflow-hidden">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border-l-4 hover:border-lumi-purple transition-colors" 
                                      style={{ borderLeftColor: resource.category === 'reproductive' ? '#9b87f5' : 
                                                            resource.category === 'mental' ? '#8B5CF6' :
                                                            resource.category === 'sleep' ? '#0EA5E9' : 
                                                            resource.category === 'financial' ? '#F97316' : '#D946EF' 
                                              }}>
                                      <div className="mb-3 md:mb-0">
                                        <div className="flex items-center gap-2 mb-1">
                                          {getCategoryIcon(resource.category)}
                                          <h3 className="font-semibold text-lg">{resource.title}</h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>
                                        <div className="text-xs text-muted-foreground mt-1">
                                          URL: /learn-more/{resource.linkSlug}
                                        </div>
                                      </div>
                                      <div className="flex gap-2">
                                        <Button 
                                          variant="outline" 
                                          size="sm" 
                                          className="border-lumi-purple/20 text-lumi-purple-dark"
                                          onClick={() => startEditing(resource)}
                                        >
                                          <Edit size={16} className="mr-1" />
                                          Edit
                                        </Button>
                                        <Button 
                                          variant="outline" 
                                          size="sm" 
                                          className="border-red-300 text-red-500 hover:bg-red-50"
                                          onClick={() => deleteResource(resource.id)}
                                        >
                                          <Trash2 size={16} className="mr-1" />
                                          Delete
                                        </Button>
                                      </div>
                                    </div>
                                  </Card>
                                ))}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
                
                <div className="mt-8 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/resources')}
                    className="border-lumi-purple/20 text-lumi-purple-dark"
                  >
                    View All Resources
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsAuthorized(false)}
                    className="border-red-300 text-red-500 hover:bg-red-50"
                  >
                    Log Out
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AdminResources;
