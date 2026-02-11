export default function GridBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 grid h-screen w-full grid-cols-6"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-full w-px justify-self-center bg-neutral-100"
        />
      ))}
    </div>
  );
}
