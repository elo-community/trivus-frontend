'use client';

import styled from 'styled-components';
import BottomNavigation from './BottomNavigation';

const LayoutContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;

  max-width: 768px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  background: rgb(255, 255, 255);
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto; /* 콘텐츠 영역만 스크롤 */
  padding-bottom: 80px; /* BottomNavigation 높이만큼 패딩 */
`;

interface CommunityLayoutContainerProps {
  children: React.ReactNode;
  additionalElements?: React.ReactNode; // WriteButton 등을 위한 추가 요소
}

export default function CommunityLayoutContainer({
  children,
  additionalElements,
}: CommunityLayoutContainerProps) {
  return (
    <LayoutContainer>
      <ContentWrapper>{children}</ContentWrapper>
      {additionalElements}
      <BottomNavigation />
    </LayoutContainer>
  );
}

// 개별 스타일드 컴포넌트들도 export (필요시 사용)
export { LayoutContainer, ContentWrapper };
