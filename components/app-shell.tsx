'use client';

import * as React from 'react';
import { Sidebar } from './sidebar';
import { CommandPalette } from './command-palette';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [commandOpen, setCommandOpen] = React.useState(false);

  return (
    <>
      <Sidebar onOpenCommandPalette={() => setCommandOpen(true)} />
      <main className="ml-64 min-h-screen">
        {children}
      </main>
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}
