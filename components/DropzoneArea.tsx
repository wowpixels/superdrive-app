'use client';
import { useState } from 'react';

// dropzone import
import Dropzone from 'react-dropzone';

// ChadCn import
import { cn } from '@/lib/utils';

// clerk import
import { useUser } from '@clerk/clerk-react';

// firebase imports
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { db, storage } from '@/firebase';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';

function DropzoneArea() {
  const [loading, setLoading] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('File reading was aborted.');
      reader.onerror = () => console.log('File reading has failed.');
      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadPost = async (selectedFile: File) => {
    if (loading) return;
    if (!user) return;

    setLoading(true);

    // create a doc in firebase collection
    const docRef = await addDoc(collection(db, `users`, user.id, 'files'), {
      userId: user.id,
      fileName: selectedFile.name,
      fullName: user.fullName,
      profileImg: user.imageUrl,
      timestamp: serverTimestamp(),
      type: selectedFile.type,
      size: selectedFile.size,
    });

    // target the storage ref
    const storageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);

    // upload the file to storage
    uploadBytes(storageRef, selectedFile).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(storageRef);

      await updateDoc(doc(db, `users`, user.id, 'files', docRef.id), {
        downloadURL: downloadURL,
      });
    });

    setLoading(false);
  };

  const maxSize = 20971520; // max upload size is 20MB

  return (
    <Dropzone minSize={0} maxSize={maxSize} onDrop={onDrop}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
        return (
          <section className="m-4">
            <div
              {...getRootProps()}
              className={cn(
                'w-full h-52 flex justify-center items-center p5 border border-dashed rounded-lg text-center transition-all hover:border-darkblue-500 hover:bg-darkblue-100 cursor-pointer',
                isDragActive
                  ? 'border-darkblue-500 bg-darkblue-100 animate-pulse dark:bg-slate-800 dark:border-slate-700'
                  : 'border-slate-300 bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 dark:hover:border-slate-700'
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && (
                <p className="text-slate-400">
                  Click here or drop a file to upload!
                </p>
              )}
              {isDragActive && !isDragReject && <p>Drop to upload a file!</p>}
              {isDragReject && (
                <p>File type is not accepted, try something different!</p>
              )}
              {isFileTooLarge && <p>The file size is too large.</p>}
            </div>
          </section>
        );
      }}
    </Dropzone>
  );
}

export default DropzoneArea;
