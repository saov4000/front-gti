import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export type Musica = {
  id?: number;
  titulo: string;
  artista: string;
  album: string;
  ano: number;
};
