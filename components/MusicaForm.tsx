'use client';

import { useEffect, useState } from 'react';
import { Musica } from '@/lib/api';

type Props = {
  onSubmit: (musica: Musica) => Promise<void>;
  musicaEmEdicao: Musica | null;
  onCancelEdit: () => void;
};

const vazio: Musica = {
  titulo: '',
  artista: '',
  album: '',
  ano: new Date().getFullYear(),
};

export default function MusicaForm({
  onSubmit,
  musicaEmEdicao,
  onCancelEdit,
}: Props) {
  const [form, setForm] = useState<Musica>(vazio);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    setForm(musicaEmEdicao ?? vazio);
  }, [musicaEmEdicao]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'ano' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    try {
      await onSubmit(form);
      setForm(vazio);
    } finally {
      setEnviando(false);
    }
  };

  const inputClass =
    'border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition';

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-2xl p-6 mb-8 grid grid-cols-1 md:grid-cols-5 gap-4"
    >
      <input
        name="titulo"
        value={form.titulo}
        onChange={handleChange}
        placeholder="Título"
        required
        className={inputClass}
      />
      <input
        name="artista"
        value={form.artista}
        onChange={handleChange}
        placeholder="Artista"
        required
        className={inputClass}
      />
      <input
        name="album"
        value={form.album}
        onChange={handleChange}
        placeholder="Álbum"
        required
        className={inputClass}
      />
      <input
        name="ano"
        type="number"
        value={form.ano}
        onChange={handleChange}
        placeholder="Ano"
        required
        className={inputClass}
      />

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={enviando}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-4 py-2 transition disabled:opacity-50"
        >
          {enviando ? '...' : musicaEmEdicao ? 'Atualizar' : 'Adicionar'}
        </button>
        {musicaEmEdicao && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg px-4 py-2 transition"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
