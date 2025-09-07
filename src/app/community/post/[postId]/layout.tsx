'use client';

import CommunityLayoutContainer from '@/components/layout/CommunityLayoutContainer';

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CommunityLayoutContainer>{children}</CommunityLayoutContainer>;
}
