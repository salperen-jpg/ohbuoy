"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

export default function Home() {
  return (
    <div className='px-8 py-4 max-w-7xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Welcome to Oh Buoys!</h1>
      <Map />
    </div>
  );
}
