'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppStore } from '@/store/store';
import { useUser } from '@clerk/nextjs';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from '@/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import toast from 'react-hot-toast';

export function DeleteModal() {
  const { user } = useUser();
  const [fileId, setFileId, isDeleteModalOpen, setIsDeleteModalOpen] =
    useAppStore((state) => [
      state.fileId,
      state.setFileId,
      state.isDeleteModalOpen,
      state.setIsDeleteModalOpen,
    ]);

  async function deleteFile() {
    // delete file from firebase
    if (!user || !fileId) return;

    const toastId = toast.loading('Deleting...');

    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

    try {
      deleteObject(fileRef)
        .then(async () => {
          deleteDoc(doc(db, 'users', user.id, 'files', fileId)).then(() => {
            toast.success('File deleted successfully', { id: toastId });
          });
        })
        .finally(() => {
          setIsDeleteModalOpen(false);
        });
    } catch (error) {
      setIsDeleteModalOpen(false);
      toast.error('Failed to delete file', { id: toastId });
    }
  }

  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => setIsDeleteModalOpen(isOpen)}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. The file will be deleted permanently.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex space-x-2 py-3">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="px-3 flex-1"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>

          <Button
            type="button"
            size="sm"
            variant="destructive"
            className="px-3 flex-1"
            onClick={() => deleteFile()}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
