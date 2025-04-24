import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { format, parseISO } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("bookings");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isSubmissionDialogOpen, setIsSubmissionDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<string>("");
  
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  // Query bookings
  const { 
    data: bookingsData, 
    isLoading: bookingsLoading,
    isError: bookingsError,
    refetch: refetchBookings
  } = useQuery({
    queryKey: ['/api/bookings'],
    queryFn: async () => {
      const response = await apiRequest('/api/bookings', 'GET');
      return response.json();
    }
  });
  
  // Query contact submissions
  const { 
    data: submissionsData, 
    isLoading: submissionsLoading,
    isError: submissionsError,
    refetch: refetchSubmissions
  } = useQuery({
    queryKey: ['/api/contact-submissions'],
    queryFn: async () => {
      const response = await apiRequest('/api/contact-submissions', 'GET');
      return response.json();
    }
  });
  
  // Mutation for updating booking status
  const updateBookingMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number, status: string }) => {
      const response = await apiRequest(`/api/bookings/${id}/status`, 'PATCH', { status });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
      toast({
        title: "Status Updated",
        description: "Booking status has been successfully updated.",
      });
      setIsUpdateDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Failed to update booking status. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Mutation for updating submission status
  const updateSubmissionMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number, status: string }) => {
      const response = await apiRequest(`/api/contact-submissions/${id}/status`, 'PATCH', { status });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact-submissions'] });
      toast({
        title: "Status Updated",
        description: "Contact submission status has been successfully updated.",
      });
      setIsSubmissionDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Failed to update contact submission status. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Handle opening the booking status update dialog
  const handleUpdateBookingStatus = (booking: any) => {
    setSelectedBooking(booking);
    setNewStatus(booking.status);
    setIsUpdateDialogOpen(true);
  };
  
  // Handle opening the submission status update dialog
  const handleUpdateSubmissionStatus = (submission: any) => {
    setSelectedSubmission(submission);
    setNewStatus(submission.status);
    setIsSubmissionDialogOpen(true);
  };
  
  // Submit the booking status update
  const submitBookingStatusUpdate = () => {
    if (selectedBooking && newStatus) {
      updateBookingMutation.mutate({ 
        id: selectedBooking.id, 
        status: newStatus 
      });
    }
  };
  
  // Submit the submission status update
  const submitSubmissionStatusUpdate = () => {
    if (selectedSubmission && newStatus) {
      updateSubmissionMutation.mutate({ 
        id: selectedSubmission.id, 
        status: newStatus 
      });
    }
  };
  
  // Get badge color based on status
  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'pending':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'confirmed':
        return 'bg-green-500 hover:bg-green-600';
      case 'completed':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'cancelled':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };
  
  // Format phone number for display
  const formatPhoneNumber = (phone: string) => {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phone;
  };
  
  return (
    <div className="min-h-screen bg-[hsl(var(--dark-bg))] py-10 pt-[85px]"> {/* Added padding for fixed navbar */}
      <Container>
        <div className="mb-8">
          <Heading
            title="Admin Dashboard"
            subtitle="Manage bookings and inquiries"
            glowColor="blue"
          />
        </div>
        
        <Tabs defaultValue="bookings" value={activeTab} onValueChange={setActiveTab}>
          <div className="mb-6">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="contact">Contact Submissions</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <div className="bg-[hsl(var(--dark-bg2))] rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Booking Requests</h2>
                <Button onClick={() => refetchBookings()} variant="outline">
                  Refresh
                </Button>
              </div>
              
              {bookingsLoading ? (
                <div className="flex items-center justify-center py-10">
                  <div className="w-10 h-10 border-t-4 border-b-4 border-[hsl(var(--neon-blue))] rounded-full animate-spin"></div>
                  <span className="ml-3 text-white">Loading bookings...</span>
                </div>
              ) : bookingsError ? (
                <div className="bg-red-500/20 text-red-100 p-4 rounded-lg text-center">
                  <p>Failed to load bookings. Please try again.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  {bookingsData?.bookings?.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Event Date</TableHead>
                          <TableHead>Event Type</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookingsData.bookings.map((booking: any) => (
                          <TableRow key={booking.id}>
                            <TableCell className="font-medium">{booking.name}</TableCell>
                            <TableCell>{format(parseISO(booking.eventDate), "MMM d, yyyy h:mm a")}</TableCell>
                            <TableCell>{booking.eventType}</TableCell>
                            <TableCell className="max-w-[200px] truncate" title={booking.eventLocation}>
                              {booking.eventLocation}
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusBadgeColor(booking.status)}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleUpdateBookingStatus(booking)}
                              >
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-10 text-gray-400">
                      <p>No bookings found.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Contact Submissions Tab */}
          <TabsContent value="contact">
            <div className="bg-[hsl(var(--dark-bg2))] rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Contact Submissions</h2>
                <Button onClick={() => refetchSubmissions()} variant="outline">
                  Refresh
                </Button>
              </div>
              
              {submissionsLoading ? (
                <div className="flex items-center justify-center py-10">
                  <div className="w-10 h-10 border-t-4 border-b-4 border-[hsl(var(--neon-blue))] rounded-full animate-spin"></div>
                  <span className="ml-3 text-white">Loading submissions...</span>
                </div>
              ) : submissionsError ? (
                <div className="bg-red-500/20 text-red-100 p-4 rounded-lg text-center">
                  <p>Failed to load contact submissions. Please try again.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  {submissionsData?.submissions?.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Date Submitted</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {submissionsData.submissions.map((submission: any) => (
                          <TableRow key={submission.id}>
                            <TableCell className="font-medium">{submission.name}</TableCell>
                            <TableCell>{submission.email}</TableCell>
                            <TableCell>{formatPhoneNumber(submission.phone)}</TableCell>
                            <TableCell>
                              {submission.createdAt 
                                ? format(parseISO(submission.createdAt), "MMM d, yyyy") 
                                : "N/A"}
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusBadgeColor(submission.status)}>
                                {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleUpdateSubmissionStatus(submission)}
                              >
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-10 text-gray-400">
                      <p>No contact submissions found.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Booking Details Dialog */}
        {selectedBooking && (
          <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Booking Details</DialogTitle>
                <DialogDescription>
                  View and update booking information
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Name</h4>
                  <p>{selectedBooking.name}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Event Date</h4>
                  <p>{format(parseISO(selectedBooking.eventDate), "MMMM d, yyyy h:mm a")}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Email</h4>
                  <p>{selectedBooking.email}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Phone</h4>
                  <p>{formatPhoneNumber(selectedBooking.phone)}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Event Type</h4>
                  <p>{selectedBooking.eventType}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Status</h4>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 col-span-2">
                  <h4 className="font-semibold text-sm">Event Location</h4>
                  <p>{selectedBooking.eventLocation}</p>
                </div>
                
                {selectedBooking.additionalNotes && (
                  <div className="space-y-2 col-span-2">
                    <h4 className="font-semibold text-sm">Additional Notes</h4>
                    <p>{selectedBooking.additionalNotes}</p>
                  </div>
                )}
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={submitBookingStatusUpdate}
                  disabled={updateBookingMutation.isPending}
                >
                  {updateBookingMutation.isPending ? "Updating..." : "Update Status"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        
        {/* Contact Submission Details Dialog */}
        {selectedSubmission && (
          <Dialog open={isSubmissionDialogOpen} onOpenChange={setIsSubmissionDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Contact Submission Details</DialogTitle>
                <DialogDescription>
                  View and update contact submission information
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Name</h4>
                  <p>{selectedSubmission.name}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Date Submitted</h4>
                  <p>
                    {selectedSubmission.createdAt 
                      ? format(parseISO(selectedSubmission.createdAt), "MMMM d, yyyy") 
                      : "N/A"}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Email</h4>
                  <p>{selectedSubmission.email}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Phone</h4>
                  <p>{formatPhoneNumber(selectedSubmission.phone)}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Event Type</h4>
                  <p>{selectedSubmission.eventType}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Status</h4>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="responded">Responded</SelectItem>
                      <SelectItem value="converted">Converted to Booking</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 col-span-2">
                  <h4 className="font-semibold text-sm">Event Location</h4>
                  <p>{selectedSubmission.eventLocation}</p>
                </div>
                
                <div className="space-y-2 col-span-2">
                  <h4 className="font-semibold text-sm">Event Date</h4>
                  <p>
                    {selectedSubmission.eventDate 
                      ? format(parseISO(selectedSubmission.eventDate), "MMMM d, yyyy") 
                      : "N/A"}
                  </p>
                </div>
                
                {selectedSubmission.message && (
                  <div className="space-y-2 col-span-2">
                    <h4 className="font-semibold text-sm">Message</h4>
                    <p>{selectedSubmission.message}</p>
                  </div>
                )}
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsSubmissionDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={submitSubmissionStatusUpdate}
                  disabled={updateSubmissionMutation.isPending}
                >
                  {updateSubmissionMutation.isPending ? "Updating..." : "Update Status"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        
      </Container>
    </div>
  );
}