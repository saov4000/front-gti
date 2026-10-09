'use client';

import { useEffect, useState } from 'react';
import { api, Musica } from '@/lib/api';
import MusicaForm from '@/components/MusicaForm';
import MusicaTable from '@/components/MusicaTable';

export default function Home() {
  const [musicas, setMusicas] = useState<Musica[]>([]);
  const [emEdicao, setEmEdicao] = useState<Musica | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = async () => {
    setLoading(true);
    setErro(null);
    try {
      const { data } = await api.get<Musica[]>('/musicas');
      setMusicas(data);
    } catch (e) {
      console.error(e);
      setErro('Erro ao carregar músicas. O backend Laravel está rodando?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const handleCreateOrUpdate = async (musica: Musica) => {
    try {
      if (emEdicao?.id) {
        await api.put(`/musicas/${emEdicao.id}`, musica);
        setEmEdicao(null);
      } else {
        await api.post('/musicas', musica);
      }
      await carregar();
    } catch (e: any) {
      alert(e.response?.data?.erro || 'Erro ao salvar música');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Deseja realmente excluir esta música?')) return;
    try {
      await api.delete(`/musicas/${id}`);
      await carregar();
    } catch {
      alert('Erro ao excluir música');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            🎵 Playlist GTI
          </h1>
          <p className="text-gray-600 mt-1">
            Gerencie suas músicas favoritas
          </p>
        </header>

        <MusicaForm
          onSubmit={handleCreateOrUpdate}
          musicaEmEdicao={emEdicao}
          onCancelEdit={() => setEmEdicao(null)}
        />

        {erro && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6">
            {erro}
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-500 py-8">Carregando...</p>
        ) : (
          <MusicaTable
            musicas={musicas}
            onEdit={(m) => setEmEdicao(m)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </main>
  );
}
