export function BobLoader() {
  return (
    <div className="flex flex-col items-center mt-24">
      <img
        src="/src/assets/sponge-bob-looking.gif"
        alt="loading gif"
        className="m-auto"
      />
      <h2 className="text-2xl mt-4 text-secondary font-bold">
        Loading, Bob is fetching data...
      </h2>
    </div>
  );
}
