export function Card() {
  return (
    <div
      data-card-root
      className="card relative bg-white shadow-xl rounded-2xl p-6 w-80 space-y-4 border"
    >
      <button
        type="button"
        aria-label="Close card"
        data-card-close
        className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
      >
        x
      </button>
      <h2 className="text-xl font-bold text-gray-800">Card</h2>

      <p className="text-gray-600">
        Timer: <span data-card-count>0</span>
      </p>

      <button
        type="button"
        data-card-start
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition">
        Start Timer
      </button>

      <button
        type="button"
        data-card-click
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition"
      >
        Click Me
      </button>
    </div>
  );
}
