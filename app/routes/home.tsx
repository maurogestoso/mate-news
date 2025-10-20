import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mate News" },
    { name: "description", content: "An old school forum for my mates." },
  ];
}

export default function Home() {
  return (
    <>
      <header>
        <h1>🧉 Mate News</h1>
      </header>
      <main></main>
    </>
  );
}
