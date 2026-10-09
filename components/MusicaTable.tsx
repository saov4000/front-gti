'use client';

import { Musica } from '@/lib/api';

type Props = {
  musicas: Musica[];
  onEdit: (musica: Musica) => void;
  onDelete: (id: number) => void;
};

export default function MusicaTable({ musicas, onEdit, onDelete }: Props) {
  if (musicas.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10 bg-white rounded-2xl shadow-md">
        Nenhuma música cadastrada. 🎶
      </p>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Título
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Artista
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Álbum
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Ano
            </th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {musicas.map((m) => (
            <tr key={m.id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-3 text-gray-800">{m.titulo}</td>
              <td className="px-4 py-3 text-gray-800">{m.artista}</td>
              <td className="px-4 py-3 text-gray-800">{m.album}</td>
              <td className="px-4 py-3 text-gray-800">{m.ano}</td>
              <td className="px-4 py-3 text-right space-x-2">
                <button
                  onClick={() => onEdit(m)}
                  className="bg-amber-400 hover:bg-amber-500 text-white text-sm font-semibold rounded-lg px-3 py-1 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => m.id && onDelete(m.id)}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg px-3 py-1 transition"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
