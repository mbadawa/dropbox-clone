'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { db } from '@/firebase';
import { useAppStore } from '@/store/store';
import { useUser } from '@clerk/nextjs';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export function RenameModal() {
  const { user } = useUser();
  const [isRenameModalOpen, setIsRenameModalOpen, fileId, fileName] =
    useAppStore((state) => [
      state.isRenameModalOpen,
      state.setIsRenameModalOpen,
      state.fileId,
      state.fileName,
    ]);
  const [input, setInput] = useState('');

  async function renameFile() {
    if (!user || !fileId) return;
    input
      ? await updateDoc(doc(db, 'users', user.id, 'files', fileId), {
          fileName: input,
        })
          .then(() => {
            setInput('');
            toast.success('Your file name been updated!');
            setIsRenameModalOpen(false);
          })
          .catch((error) => {
            toast.error('Failed to update your file name! Please try again');
            console.error(error);
          })
      : toast.error('Name has not been changed');
  }

  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => setIsRenameModalOpen(isOpen)}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rename File</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              File Name
            </Label>
            <Input
              defaultValue={fileName}
              id="fileName"
              className="col-span-3"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  renameFile();
                }
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant={'secondary'}
            onClick={() => setIsRenameModalOpen(false)}
          >
            cancel
          </Button>
          <Button variant={'default'} onClick={() => renameFile()}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
