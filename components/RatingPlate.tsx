// Signature element: rating as a stamped scrap-metal plate.
export function RatingPlate({ rating }: { rating: number }) {
  return (
    <div className="rating-plate inline-flex flex-col items-center rounded-sm px-4 py-3">
      <span className="font-mono text-3xl font-bold text-rust">{rating.toFixed(1)}</span>
      <span className="stencil text-[10px] tracking-widest text-ash">/ 5.0 RATING</span>
    </div>
  );
}
