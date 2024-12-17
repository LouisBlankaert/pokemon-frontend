export default function LoadMoreButton({ onLoadMore }) {
  return (
    <div className="flex justify-center">
      <button 
        onClick={onLoadMore} 
        className="p-2 rounded-lg mt-4 bg-red-500 text-white hover:bg-red-600">
        Charger plus de Pokémon
      </button>
    </div>
  );
}
