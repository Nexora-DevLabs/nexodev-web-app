"use client";

export default function HomeHeroContent() {
  return (
    <main className="absolute inset-0 z-20 flex items-center justify-center">
      <div className="max-w-4xl px-6 text-center">
        <div className="relative mb-8 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
          <span className="text-primary text-sm font-medium">
            ✨ Nexora DevLabs
          </span>
        </div>

        <h1 className="font-heading mb-6 text-5xl font-bold leading-tight text-white md:text-7xl">
          <span className="text-primary">Simplify.</span> Build.{" "}
          <span className="text-primary">Grow.</span>
        </h1>

        <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-white/80">
          Simplifying technology to build innovative, impactful, and
          collaborative digital solutions that empower brands worldwide.
        </p>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          <span className="bg-primary/20 text-primary border-primary/30 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-sm">
            Web Development
          </span>
          <span className="bg-secondary/20 text-secondary-foreground border-secondary/30 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-sm">
            Mobile Apps
          </span>
          <span className="bg-accent/20 text-accent-foreground border-accent/30 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-sm">
            Digital Strategy
          </span>
          <span className="bg-muted/20 text-muted-foreground border-muted/30 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-sm">
            Brand Solutions
          </span>
        </div>
      </div>
    </main>
  );
}
