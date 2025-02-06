// DisabledLink.tsx (Client Component)
'use client'; // Important: Mark as client component

import { LinkProps } from 'next/link';
import React, { ReactNode } from 'react';

interface DisabledLinkProps extends Omit<LinkProps, 'onClick' | 'href'> {
  children: ReactNode;
}

function DisabledLink({ children }: DisabledLinkProps) {
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log("Link is disabled.");
  };

  return (
    <span className='cursor-not-allowed lowercase text-gray-300 dark:text-gray-600' onClick={handleClick}>
      {children}
    </span>
  );
}

export default DisabledLink;