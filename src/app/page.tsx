'use client'

// import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Define the structure of a Zine object
type Zine = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export default function Dashboard() {
  const router = useRouter();
  // Store list of zines in state
  const [existingZines, setExistingZines] = useState<Zine[]>([]);

  // Load zines when component mounts
  useEffect(() => {
    const loadExistingZines = () => {
      const zines: Zine[] = [];
      // Loop through localStorage to find zine data
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        // Only process items that start with 'zine-'
        if (key?.startsWith('zine-')) {
          const zineData = JSON.parse(localStorage.getItem(key) || '');
          zines.push(zineData);
        }
      }
      // Sort zines by update date, newest first
      setExistingZines(zines.sort((a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      ));
    };

    loadExistingZines();
  }, []);

  // Random zine name generator (debugging purposes)
  const randomZineName = () => {
    const adjectives = ["Amazing", "Fantastic", "Incredible", "Spectacular", "Wonderful", "Ocular", "Orthodox", "Elder", "Venerable"];
    const nouns = ["Adventure", "Journey", "Quest", "Odyssey", "Expedition", "Monastery", "Skete"];
    return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
  }

  // Function to create a new zine
  const createNewZine = () => {
    // Generate unique ID for new zine
    const zineId = crypto.randomUUID();
    const newZine = {
      id: zineId,
      title: randomZineName(),
      pages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    // Save to localStorage and navigate to editor
    localStorage.setItem(`zine-${zineId}`, JSON.stringify(newZine));
    handleZineSelect(zineId);
  };

  const handleZineSelect = (zineId: string) => {
    localStorage.setItem('currentZineId', zineId)
    router.push('/editor')
  }

  return (
    <>
      {/* Display existing zines if any exist */}
      {existingZines.length > 0 && (
        <ul className="pb-2">
          {existingZines.map((zine) => (
            <li key={zine.id} className="flex items-center">

              {/* Link to edit each zine */}
              <div
                key={zine.id}
                onClick={() => handleZineSelect(zine.id)}
                className="cursor-pointer mb-1"
              >
                {zine.title}
              </div>
              {/* Dotted underline connecting titles and dates */}
              <div className="flex-grow border-b-2 border-dotted border-gray-400 h-4"></div>

              {/* Show last updated date */}
              <span className="text-base text-gray-500">
                {new Date(zine.createdAt).toLocaleDateString()}
              </span>

            </li>
          ))}
        </ul>
      )}

      {/* Button to create new zine */}
      <button
        onClick={createNewZine}
        className="text-foreground hover:underline"
      >
        Create a new zine
      </button> →
    </>
  );
}
