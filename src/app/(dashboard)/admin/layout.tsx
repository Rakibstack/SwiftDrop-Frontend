
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <h1>Admin Layout</h1>
        {children}
    </div>
  );
}