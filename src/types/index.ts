export interface Table {
  id: number;
  name: string;
  qr_code: string;
  created_at: Date;
  media_files: MediaFile[];
}

export interface MediaFile {
  id: number;
  table_id: number;
  filename: string;
  original_filename: string;
  file_type: 'photo' | 'video' | 'audio' | 'text';
  description?: string;
  created_at: Date;
}

export interface User {
  id?: number;
  username: string;
  email?: string;
}
