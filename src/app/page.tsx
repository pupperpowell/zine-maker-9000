'use client'

import Link from "next/link";
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

  // Function to create a new zine
  const createNewZine = () => {
    // Generate unique ID for new zine
    const zineId = crypto.randomUUID();
    const newZine = {
      id: zineId,
      title: "Untitled Zine",
      pages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    // Save to localStorage and navigate to editor
    localStorage.setItem(`zine-${zineId}`, JSON.stringify(newZine));
    router.push(`/editor/${zineId}`);
  };

  return (
    <>
      {/* Display existing zines if any exist */}
      {existingZines.length > 0 && (
        <ul className="">
          {existingZines.map((zine) => (
            <li key={zine.id} className="flex items-center justify-between">
              {/* Link to edit each zine */}
              <Link
                href={`/editor/${zine.id}`}
                className="hover:underline"
              >
                {zine.title}
              </Link>
              {/* Show last updated date */}
              <span className="text-sm text-gray-500">
                {new Date(zine.updatedAt).toLocaleDateString()}
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
