'use client';

import styled from 'styled-components';
import BottomNavigation from '@/components/layout/BottomNavigation';

const LayoutContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;

  max-width: 768px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  background: ${props => props.theme.colors.background};
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto; /* 콘텐츠 영역만 스크롤 */
  padding-bottom: 80px; /* BottomNavigation 높이만큼 패딩 */
`;

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutContainer>
      <ContentWrapper>{children}</ContentWrapper>
      <BottomNavigation />
    </LayoutContainer>
  );
}
