'use client';

import { useAppStore } from '@/store/store'; // using zustand
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from './ui/input';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import toast from 'react-hot-toast';

function RenameModal() {
  const { user } = useUser();
  const [input, setInput] = useState('');
  const [fileId, filename, isRenameModalOpen, setIsRenameModalOpen] =
    useAppStore((state) => [
      state.fileId,
      state.filename,
      state.isRenameModalOpen,
      state.setIsRenameModalOpen,
    ]);

  const renameFile = async () => {
    if (!user || !fileId) return;

    const toastId = toast.loading('Renaming...');

    await updateDoc(doc(db, 'users', user.id, 'files', fileId), {
      filename: input,
    });

    toast.success('File renamed successfully', { id: toastId });
    setInput('');
    setIsRenameModalOpen(false);
  };

  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => setIsRenameModalOpen(isOpen)}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename the file</DialogTitle>
          <Input
            id="link"
            defaultValue={filename}
            onChange={(e) => setInput(e.target.value)}
            onKeyDownCapture={(e) => {
              if (e.key === 'Enter') renameFile();
            }}
          />
        </DialogHeader>
        <DialogFooter className="flex space-x-2 py-3">
          <Button
            size="sm"
            variant="ghost"
            className="px-3 flex-1"
            onClick={() => setIsRenameModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>

          <Button
            type="submit"
            size="sm"
            variant="secondary"
            className="px-3 flex-1"
            onClick={() => renameFile()}
          >
            <span className="sr-only">Rename</span>
            <span>Rename</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RenameModal;
