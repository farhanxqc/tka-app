export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]" />
      <div className="absolute -top-40 left-1/2 h-[36rem] w-[52rem] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl dark:bg-primary/12" />
      <div className="absolute top-1/3 -left-40 h-80 w-80 rounded-full bg-orange-400/10 blur-3xl dark:bg-orange-500/8" />
      <div className="absolute top-1/3 -right-40 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl dark:bg-sky-500/8" />
      <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-violet-400/8 blur-3xl dark:bg-violet-500/6" />
      <div className="absolute inset-0 bg-noise" />
    </div>
  );
}
