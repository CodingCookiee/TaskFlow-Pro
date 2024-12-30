import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button, Input, Card, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui';
import { User, Mail, Camera, Trash2, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function Settings() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userData, setUserData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    image: session?.user?.image || ''
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('email', userData.email);
      if (selectedFile) {
        formData.append('image', selectedFile);
      }
  
      const response = await fetch(`/api/users/${session.user.id}`, {
        method: 'PUT',
        body: formData,
      });
  
      const data = await response.json();
  
      if (response.ok) {
        await update(userData);
        toast.success('Profile updated successfully');
        setUserData({
          name: '',
          email: '',
          image: ''
        });
        signOut({ callbackUrl: '/auth/signin' });
      } else {
        toast.error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    const userId = parseInt(session.user.id);
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Account deleted successfully');
        setShowDeleteDialog(false);
        signOut({ callbackUrl: '/auth/signin' });
      } else {
        toast.error('Failed to delete account');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto px-4"
      >
        <Card className="p-6 bg-light-primary dark:bg-dark-primary border border-black-300/10">
          <h1 className="text-2xl font-bold text-black-300 dark:text-white-700 mb-6">
            Account Settings
          </h1>

          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3.5 h-5 w-5 text-black-500 dark:text-white-500" />
                <Input
                  type="text"
                  placeholder="Full name"
                  value={userData.name}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                  className="pl-10 w-full bg-black-100/5 dark:bg-white-500/5"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-black-500 dark:text-white-500" />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={userData.email}
                  onChange={(e) => setUserData({...userData, email: e.target.value})}
                  className="pl-10 w-full bg-black-100/5 dark:bg-white-500/5"
                />
              </div>

              <div className="relative">
                <Camera className="absolute left-3 top-3.5 h-5 w-5 text-black-500 dark:text-white-500" />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="pl-10 w-full bg-black-100/5 dark:bg-white-500/5"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Button
                type="submit"
                className="bg-black-200 hover:bg-black-300 text-white dark:bg-white dark:text-black-200 
                  dark:hover:bg-white-800"
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Update Profile'}
              </Button>

              <Button
                type="button"
                onClick={() => setShowDeleteDialog(true)}
                className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                variant="ghost"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='mb-5'>Delete Account</DialogTitle>
            <Button
              variant="ghost"
              className="absolute right-4 top-4"
              onClick={() => setShowDeleteDialog(false)}
            >
              <X className="h-4 w-4 mb-4" />
            </Button>
          </DialogHeader>
          <p className="text-black-500 dark:text-white-500 text-md ">
            This action cannot be reversed.
          </p>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={isLoading}
              className='text-red-700'
            >
              {isLoading ? 'Deleting...' : 'Delete Account'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

