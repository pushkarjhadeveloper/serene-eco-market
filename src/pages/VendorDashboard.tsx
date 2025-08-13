import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import KYCForm from "@/components/KYCForm";
import { 
  Store, 
  FileText, 
  CreditCard, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Package,
  TrendingUp,
  Users
} from "lucide-react";

interface VendorProfile {
  user_type: string;
  subscription_status: string;
  subscription_end_date: string | null;
  kyc_status: string;
  kyc_submitted_at: string | null;
  kyc_approved_at: string | null;
}

interface VendorStats {
  totalProducts: number;
  draftProducts: number;
  liveProducts: number;
  totalOrders: number;
}

const VendorDashboard = () => {
  const [profile, setProfile] = useState<VendorProfile | null>(null);
  const [stats, setStats] = useState<VendorStats>({
    totalProducts: 0,
    draftProducts: 0,
    liveProducts: 0,
    totalOrders: 0
  });
  const [showKYCForm, setShowKYCForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    loadVendorProfile();
    loadVendorStats();
  }, [user, navigate]);

  const loadVendorProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('user_type, subscription_status, subscription_end_date, kyc_status, kyc_submitted_at, kyc_approved_at')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (data.user_type !== 'vendor') {
        navigate('/');
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error loading vendor profile:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load vendor profile",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadVendorStats = async () => {
    if (!user) return;

    try {
      // Get products count
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('status')
        .eq('vendor_id', user.id);

      if (productsError) throw productsError;

      const totalProducts = products?.length || 0;
      const draftProducts = products?.filter(p => p.status === 'draft').length || 0;
      const liveProducts = products?.filter(p => p.status === 'live').length || 0;

      setStats({
        totalProducts,
        draftProducts,
        liveProducts,
        totalOrders: 0 // TODO: Implement orders count
      });
    } catch (error) {
      console.error('Error loading vendor stats:', error);
    }
  };

  const getSubscriptionStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'inactive':
        return <Badge variant="destructive">Inactive</Badge>;
      case 'trial':
        return <Badge className="bg-blue-100 text-blue-800">Trial</Badge>;
      case 'expired':
        return <Badge variant="outline">Expired</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getKYCStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-700 border-yellow-300">Pending</Badge>;
      case 'submitted':
        return <Badge className="bg-blue-100 text-blue-800">Under Review</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleKYCSubmitted = () => {
    setShowKYCForm(false);
    loadVendorProfile();
    toast({
      title: "KYC Submitted",
      description: "Your KYC details have been submitted for review.",
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (showKYCForm && user) {
    return (
      <Layout>
        <div className="eco-container py-12">
          <KYCForm userId={user.id} onKYCSubmitted={handleKYCSubmitted} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="eco-container py-12 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-primary">Vendor Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your products and business</p>
          </div>
          <Button onClick={() => navigate('/products/add')}>
            <Package className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Status Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Subscription Status */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscription</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {getSubscriptionStatusBadge(profile?.subscription_status || 'inactive')}
                {profile?.subscription_end_date && (
                  <p className="text-xs text-muted-foreground">
                    Expires: {new Date(profile.subscription_end_date).toLocaleDateString()}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* KYC Status */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">KYC Status</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {getKYCStatusBadge(profile?.kyc_status || 'pending')}
                {profile?.kyc_status === 'pending' && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setShowKYCForm(true)}
                  >
                    Complete KYC
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Account Status */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Account Status</CardTitle>
              {profile?.kyc_status === 'approved' ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <Clock className="h-4 w-4 text-yellow-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {profile?.kyc_status === 'approved' ? (
                  <Badge className="bg-green-100 text-green-800">Fully Verified</Badge>
                ) : (
                  <Badge className="bg-yellow-100 text-yellow-800">Verification Pending</Badge>
                )}
                <p className="text-xs text-muted-foreground">
                  {profile?.kyc_status === 'approved' 
                    ? 'Ready to receive payouts'
                    : 'Complete KYC to receive payouts'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Draft Products</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.draftProducts}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Live Products</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.liveProducts}</div>
              <p className="text-xs text-muted-foreground">Selling now</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {profile?.subscription_status !== 'active' && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-yellow-800">Subscription Required</p>
                  <p className="text-sm text-yellow-600">
                    Activate your subscription to start listing products.
                  </p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  Upgrade Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {profile?.kyc_status !== 'approved' && profile?.subscription_status === 'active' && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-800">KYC Verification Pending</p>
                  <p className="text-sm text-blue-600">
                    Complete your KYC to publish products and receive payouts.
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-auto"
                  onClick={() => setShowKYCForm(true)}
                >
                  Complete KYC
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Button variant="outline" className="h-20 flex-col">
                <Package className="h-6 w-6 mb-2" />
                Add New Product
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Store className="h-6 w-6 mb-2" />
                Manage Products
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <TrendingUp className="h-6 w-6 mb-2" />
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default VendorDashboard;