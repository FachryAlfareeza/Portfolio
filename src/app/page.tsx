import { portfolio } from "@/content";

export default function Home() {
  const { profile } = portfolio;
  return (
    <main className="mx-auto w-[min(1100px,calc(100%-56px))] py-32">
      <p className="font-mono text-micro text-green">{profile.availability}</p>
      <h1 className="mt-4 text-5xl font-bold tracking-tightest">
        {profile.name}
      </h1>
      <p className="mt-6 max-w-xl text-muted">{profile.tagline}</p>
    </main>
  );
}
