// types/video.d.ts
import 'react';

declare module 'react' {
  interface VideoHTMLAttributes<T> extends HTMLAttributes<T> {
    pip?: string | boolean;
  }
}