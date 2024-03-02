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
import { db, storage } from '@/firebase';
import { useAppStore } from '@/store/store';
import { useUser } from '@clerk/nextjs';
import { error } from 'console';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import toast from 'react-hot-toast';
export function DeleteModal() {
  const { user } = useUser();
  const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] =
    useAppStore((state) => [
      state.isDeleteModalOpen,
      state.setIsDeleteModalOpen,
      state.fileId,
      state.setFileId,
    ]);
  async function deleteFile() {
    if (!user || !fileId) return;

    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

    // Deletes the object from files
    await deleteObject(fileRef)
      .then(async () => {
        // Deletes the ref
        await deleteDoc(doc(db, 'users', user.id, 'files', fileId))
          .then(() => {
            toast.success('File has been deleted');
          })
          .catch((error) => console.error(error))
          .finally(() => {
            setIsDeleteModalOpen(false);
          });
      })
      .catch((error) => console.error(error));
  }

  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => {
        setIsDeleteModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This file will be permanetly deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-100">
          <Button
            variant={'secondary'}
            onClick={() => setIsDeleteModalOpen(false)}
            className="w-[50%]"
          >
            Cancel
          </Button>
          <Button
            variant={'destructive'}
            onClick={() => deleteFile()}
            className="w-[50%]"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
