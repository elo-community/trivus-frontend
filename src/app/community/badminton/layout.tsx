'use client';

import CommunityLayoutContainer from '@/components/layout/CommunityLayoutContainer';
import WriteButton from '@/components/buttons/WriteButton';
import { ROUTES } from '@/constants/routes';

export default function BadmintonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CommunityLayoutContainer
      additionalElements={
        <WriteButton href={`${ROUTES.community.write}?category=badminton`} />
      }
    >
      {children}
    </CommunityLayoutContainer>
  );
}
