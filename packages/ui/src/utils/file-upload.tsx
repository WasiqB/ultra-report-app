'use client';

import { Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { JSX, useState } from 'react';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { Label } from '../components/label';

export const FileUpload = (): JSX.Element => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (file) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/process-file', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to process file');
        }

        localStorage.setItem('xml-data', JSON.stringify(await response.json()));

        router.push('/loading');
      } catch (error) {
        console.error('Error processing file:', error);
        alert(error instanceof Error ? error.message : 'Error processing file');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-md'>
      <div
        // eslint-disable-next-line @stylistic/js/max-len
        className='border-muted-foreground hover:border-primary hover:text-primary cursor-pointer rounded-lg border-4 border-dashed p-8 text-center transition-all'
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          type='file'
          accept='.xml'
          onChange={handleFileChange}
          className='hidden'
          id='file-upload'
        />
        <Label htmlFor='file-upload' className='cursor-pointer'>
          <Upload className='text-muted-foreground mx-auto mb-4 h-12 w-12' />
          <p className='text-muted-foreground'>
            {file
              ? file.name
              : 'Click to select or drag and drop testng-results.xml file'}
          </p>
        </Label>
      </div>
      <Button type='submit' className='mt-4 w-full' disabled={!file || loading}>
        {loading ? 'Generating your Report...' : 'Generate Report'}
      </Button>
    </form>
  );
};
