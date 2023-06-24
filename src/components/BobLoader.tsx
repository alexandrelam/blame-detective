export function BobLoader() {
  return (
    <div className="flex flex-col items-center mt-24">
      <img
        src="public/sponge-bob-looking.gif"
        alt="loading gif"
        className="m-auto"
      />
      <h2 className="text-2xl mt-4 text-secondary font-bold">
        Bob is looking for your files...
      </h2>
    </div>
  );
}
