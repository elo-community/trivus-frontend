'use client';

import styled from 'styled-components';
import Modal from '@/components/modals/Modal';
import { useInfiniteTokenAccumulations } from '@/api/useTokenHistory';
import InfiniteScrollObserver from '@/components/views/InfiniteScrollObserver';
import { ModalButton } from '@/components/modals/style';

interface TokenHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
  margin-bottom: 24px;
  max-height: 400px;
  overflow-y: auto;
`;

const HistoryItem = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid #e5e7eb;
  transition: all 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f9fafb;
    padding-left: 8px;
    padding-right: 8px;
    margin: 0 -8px;
    border-radius: 8px;
  }
`;

const ItemDate = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

const DateText = styled.div`
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
  gap: 16px;
`;

const ActionTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.4;
  flex: 1;
  min-width: 0;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
`;

const Amount = styled.div<{ $isPositive: boolean }>`
  font-size: 16px;
  font-weight: 700;
  color: ${props => (props.$isPositive ? '#059669' : '#6b7280')};
  white-space: nowrap;
`;

const Status = styled.div<{ $status: string }>`
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: ${props => {
    switch (props.$status) {
      case 'pending':
        return '#fef3c7';
      case 'claimed':
        return '#d1fae5';
      case 'expired':
        return '#fee2e2';
      default:
        return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch (props.$status) {
      case 'pending':
        return '#92400e';
      case 'claimed':
        return '#065f46';
      case 'expired':
        return '#991b1b';
      default:
        return '#374151';
    }
  }};
`;

const ButtonContainer = styled.div`
  padding: 0;
  width: 100%;
  display: flex;
`;

const TokenHistoryModal: React.FC<TokenHistoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    data: tokenAccumulationsData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteTokenAccumulations(20);

  // 모든 페이지의 accumulations를 하나의 배열로 합치기
  const allAccumulations =
    tokenAccumulationsData?.pages?.flatMap(page => page.data.accumulations) ||
    [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="수확 가능한 토큰">
      <HistoryList>
        {allAccumulations.map(item => (
          <HistoryItem key={item.id}>
            <ItemDate>
              <Status $status={item.status}>
                {item.status === 'pending'
                  ? '대기중'
                  : item.status === 'claimed'
                    ? '수령완료'
                    : '만료됨'}
              </Status>
              <DateText>{formatDate(item.createdAt)}</DateText>
            </ItemDate>
            <ItemHeader>
              <ActionTitle>{item.reason}</ActionTitle>
              <RightSection>
                <Amount $isPositive={item.status === 'claimed'}>
                  {item.amount} EXP
                </Amount>
              </RightSection>
            </ItemHeader>
          </HistoryItem>
        ))}

        {/* 무한 스크롤 옵저버 */}
        <InfiniteScrollObserver
          onIntersect={handleLoadMore}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          margin="0"
        />

        {/* 확인 버튼 */}
      </HistoryList>
      <ButtonContainer>
        <ModalButton variant="primary" onClick={onClose}>
          확인
        </ModalButton>
      </ButtonContainer>
    </Modal>
  );
};

export default TokenHistoryModal;
