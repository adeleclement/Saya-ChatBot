import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Trash2, Edit, Plus, Save, X, Eye, Lock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Form validation schema
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  category: z.enum(["reproductive", "pregnancy", "physical", "mental", "sleep", "financial"]),
  linkSlug: z.string().min(3, "Link slug must be at least 3 characters"),
});

type FormValues = z.infer<typeof formSchema>;

// Define Resource type to ensure consistent typing throughout the component
type Resource = {
  id: number;
  title: string;
  description: string;
  category: string;
  content: string;
  linkSlug: string;
};

// Sample data for existing resources
const sampleResources: Resource[] = [
  {
    id: 1,
    title: "Understanding Reproductive Health",
    description: "A comprehensive guide to women's reproductive health across all life stages.",
    category: "reproductive",
    content: "This article explores various aspects of reproductive health including menstrual health, fertility, and menopause.",
    linkSlug: "reproductive-health"
  },
  {
    id: 2, 
    title: "Mental Wellbeing During Pregnancy",
    description: "Supporting your mental health while expecting a baby.",
    category: "pregnancy",
    content: "Pregnancy brings many emotional changes. This guide offers strategies for maintaining good mental health during this transformative time.",
    linkSlug: "pregnancy-mental-health"
  },
  {
    id: 3,
    title: "Sleep Optimization Techniques",
    description: "Practical approaches to improving sleep quality and duration.",
    category: "sleep",
    content: "Quality sleep is essential for overall wellbeing. Learn evidence-based techniques to improve your sleep patterns.",
    linkSlug: "sleep-techniques"
  }
];

const AdminResources = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [resources, setResources] = useState<Resource[]>(sampleResources);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  
  // Mock admin password - in a real app, this would be authenticated through a backend
  const ADMIN_PASSWORD = "admin123";
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      category: "reproductive",
      linkSlug: "",
    },
  });

  const editForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      category: "reproductive",
      linkSlug: "",
    },
  });
  
  const checkPassword = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthorized(true);
      toast({
        title: "Access Granted",
        description: "Welcome to the Yara Admin Portal",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Invalid password. Please try again.",
      });
    }
  };

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    // In a real application, this would send data to your backend/database
    // For demonstration, we'll simulate an API call
    setTimeout(() => {
      const newResource: Resource = {
        id: resources.length + 1,
        title: data.title,
        description: data.description,
        content: data.content,
        category: data.category,
        linkSlug: data.linkSlug
      };
      
      setResources([...resources, newResource]);
      toast({
        title: "Resource Published",
        description: `"${data.title}" has been added to the resources library.`,
      });
      
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  };

  const startEditing = (resource: Resource) => {
    setEditingResource(resource);
    editForm.reset({
      title: resource.title,
      description: resource.description,
      content: resource.content,
      category: resource.category as any,
      linkSlug: resource.linkSlug,
    });
  };
  
  const cancelEditing = () => {
    setEditingResource(null);
  };
  
  const saveEdit = (data: FormValues) => {
    if (!editingResource) return;
    
    // Simulate API call
    setTimeout(() => {
      const updatedResources = resources.map(res => 
        res.id === editingResource.id ? { 
          ...res, 
          title: data.title,
          description: data.description,
          content: data.content,
          category: data.category,
          linkSlug: data.linkSlug
        } : res
      );
      
      setResources(updatedResources);
      toast({
        title: "Resource Updated",
        description: `"${data.title}" has been successfully updated.`,
      });
      
      setEditingResource(null);
    }, 800);
  };
  
  const deleteResource = (id: number) => {
    if (confirm("Are you sure you want to delete this resource? This action cannot be undone.")) {
      const updatedResources = resources.filter(resource => resource.id !== id);
      setResources(updatedResources);
      
      toast({
        title: "Resource Deleted",
        description: "The resource has been permanently removed.",
      });
    }
  };
  
  const previewResource = (linkSlug: string) => {
    navigate(`/learn-more/${linkSlug}`);
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-md">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-lumi-purple">Yara Admin Portal</h1>
              <p className="text-sm text-gray-500 mt-2">Enter your administrator password to continue</p>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="Enter admin password" 
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && checkPassword()}
                  />
                </div>
              </div>
              <Button 
                onClick={checkPassword} 
                className="w-full"
              >
                Access Admin Portal
              </Button>
              <div className="text-xs text-center text-gray-500">
                <p>Hint: The password is "admin123"</p>
                <p className="mt-1">(This is just a demo - in a real application, authentication would be much more secure)</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-display font-bold text-lumi-purple-dark">Resource Management</h1>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <X size={16} />
              Exit Admin
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Resources List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-lumi-purple/10">
                <h2 className="text-xl font-semibold text-lumi-purple-dark mb-4">Published Resources</h2>
                
                {resources.length === 0 ? (
                  <div className="text-center py-8 text-lumi-gray">
                    <p>No resources have been published yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {resources.map((resource) => (
                      <div 
                        key={resource.id} 
                        className={`p-4 rounded-lg border ${
                          editingResource?.id === resource.id 
                            ? 'border-lumi-purple bg-lumi-purple/5' 
                            : 'border-gray-200 hover:border-lumi-purple/30'
                        } transition-all`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-lumi-purple-dark">{resource.title}</h3>
                            <p className="text-sm text-lumi-gray-dark mt-1">{resource.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                {
                                  'reproductive': 'bg-pink-100 text-pink-800',
                                  'pregnancy': 'bg-purple-100 text-purple-800',
                                  'physical': 'bg-blue-100 text-blue-800',
                                  'mental': 'bg-green-100 text-green-800',
                                  'sleep': 'bg-indigo-100 text-indigo-800',
                                  'financial': 'bg-amber-100 text-amber-800',
                                }[resource.category] || 'bg-gray-100 text-gray-800'
                              }`}>
                                {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                              </span>
                              <span className="text-xs text-lumi-gray">/learn-more/{resource.linkSlug}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => previewResource(resource.linkSlug)}
                            >
                              <Eye size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0 text-lumi-purple"
                              onClick={() => startEditing(resource)}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0 text-red-500"
                              onClick={() => deleteResource(resource.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                        
                        {editingResource?.id === resource.id && (
                          <div className="mt-4 border-t border-lumi-purple/20 pt-4">
                            <Form {...editForm}>
                              <form onSubmit={editForm.handleSubmit(saveEdit)} className="space-y-4">
                                <FormField
                                  control={editForm.control}
                                  name="title"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Title</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <FormField
                                    control={editForm.control}
                                    name="category"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                          <select 
                                            className="w-full border border-input bg-background px-3 py-2 text-sm rounded-md"
                                            {...field}
                                          >
                                            <option value="reproductive">Reproductive Health</option>
                                            <option value="pregnancy">Pregnancy</option>
                                            <option value="physical">Physical Health</option>
                                            <option value="mental">Mental Health</option>
                                            <option value="sleep">Sleep</option>
                                            <option value="financial">Financial Wellbeing</option>
                                          </select>
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
                                          <Input {...field} />
                                        </FormControl>
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
                                      <FormLabel>Description</FormLabel>
                                      <FormControl>
                                        <Textarea 
                                          {...field} 
                                          rows={2}
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
                                      <FormLabel>Content</FormLabel>
                                      <FormControl>
                                        <Textarea 
                                          {...field} 
                                          rows={6}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <div className="flex justify-end gap-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={cancelEditing}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    type="submit"
                                    className="gap-2"
                                  >
                                    <Save size={16} />
                                    Save Changes
                                  </Button>
                                </div>
                              </form>
                            </Form>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Add New Resource Form */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-lumi-purple/10 sticky top-24">
                <h2 className="text-xl font-semibold text-lumi-purple-dark mb-4 flex items-center gap-2">
                  <Plus size={20} className="text-lumi-purple" />
                  Add New Resource
                </h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter resource title" {...field} />
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
                          <FormControl>
                            <select 
                              className="w-full border border-input bg-background px-3 py-2 text-sm rounded-md"
                              {...field}
                            >
                              <option value="reproductive">Reproductive Health</option>
                              <option value="pregnancy">Pregnancy</option>
                              <option value="physical">Physical Health</option>
                              <option value="mental">Mental Health</option>
                              <option value="sleep">Sleep</option>
                              <option value="financial">Financial Wellbeing</option>
                            </select>
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
                            <Input placeholder="resource-url-slug" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Brief description of the resource" 
                              {...field} 
                              rows={2}
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
                          <FormLabel>Content</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Full content of the resource" 
                              {...field} 
                              rows={6}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Publishing...' : 'Publish Resource'}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminResources;
