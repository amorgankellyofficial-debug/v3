import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const UserManagement = () => {
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_profiles')
        .select(`
          *,
          user_roles(role)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      // First, delete existing role
      await supabase.from('user_roles').delete().eq('user_id', userId);
      
      // Then insert new role
      const { error } = await supabase.from('user_roles').insert({
        user_id: userId,
        role: role,
      });
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('User role updated successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
    onError: () => {
      toast.error('Failed to update user role');
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold">Name</th>
              <th className="text-left py-3 px-4 text-sm font-semibold">Phone</th>
              <th className="text-left py-3 px-4 text-sm font-semibold">Balance</th>
              <th className="text-left py-3 px-4 text-sm font-semibold">KYC Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold">Role</th>
              <th className="text-left py-3 px-4 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                <td className="py-3 px-4">{user.full_name || 'N/A'}</td>
                <td className="py-3 px-4">{user.phone || 'N/A'}</td>
                <td className="py-3 px-4">₹{user.current_balance?.toLocaleString() || 0}</td>
                <td className="py-3 px-4">
                  <Badge variant={user.kyc_status === 'approved' ? 'default' : 'secondary'}>
                    {user.kyc_status}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <Select
                    value={user.user_roles?.[0]?.role || 'user'}
                    onValueChange={(value) => updateRoleMutation.mutate({ userId: user.user_id, role: value })}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="moderator">Moderator</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="py-3 px-4">
                  <Button variant="outline" size="sm">View Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
