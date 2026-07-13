import React from 'react';

type Props = {
  children: React.ReactNode;
};

export function MainLayout({ children }: Props) {
  return <>{children}</>;
}
