import React from 'react';

const getTypeBackgroundColor = (types) => {
  // Récupérer la couleur de fond selon le type (comme avant)
  if (types.includes('fire')) return 'bg-red-500';
  if (types.includes('water')) return 'bg-blue-500';
  if (types.includes('normal')) return 'bg-gray-300';
  if (types.includes('grass')) return 'bg-green-400';
  if (types.includes('bug')) return "bg-custom-green";
  if (types.includes('poison')) return "bg-purple-400";
  if (types.includes('electric')) return "bg-yellow-400";
  if (types.includes('ground')) return "bg-yellow-600";
  if (types.includes('fairy')) return "bg-red-300";
  if (types.includes('fighting')) return "bg-orange-400";
  if (types.includes('psychic')) return "bg-purple-300";
  if (types.includes('ice')) return "bg-blue-300";
  if (types.includes('rock')) return "bg-gray-500";
  if (types.includes('dragon')) return "bg-purple-600";
  if (types.includes('dark')) return "bg-gray-700";
  if (types.includes('ghost')) return "bg-gray-100";
};

export default function PokemonCard({ name, image, types }) {
  const backgroundColor = getTypeBackgroundColor(types);

  return (
    <div className={`flex items-center justify-center flex-col p-4 rounded-lg ${backgroundColor}`}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <h4>{types.length === 1 
          ? `Type : ${types[0]}`
          : `Types : ${types.join(', ')}`}
      </h4>
    </div>
  );
}
