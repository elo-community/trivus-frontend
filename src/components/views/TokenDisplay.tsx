'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/useModal';
import { ROUTES } from '@/constants/routes';
import Image from 'next/image';
import { ICONS } from '@/assets';
import TokenHistoryModal from '../modals/TokenHistoryModal';
import LoadingDots from './LoadingDots';

interface TokenDisplayProps {
  tokens: number;
  harvestableTokens?: number;
  onHarvestAll?: () => void;
  harvestButtonText?: string;
  isHarvesting?: boolean;
}

const TokenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.textBlack};
`;

const TokenInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const TokenLabel = styled.div`
  font-size: ${props => props.theme.typography.fontSizes.xs};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  opacity: 0.9;
  color: ${props => props.theme.colors.textBlack};
`;

const TokenAmount = styled.div`
  font-size: ${props => props.theme.typography.fontSizes.lg};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  display: flex;
  align-items: center;
  gap: 6px;
`;

const TokenIcon = styled.span`
  font-size: 16px;
`;

const HarvestSection = styled.div`
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 14px;
  margin: 0;
  color: ${props => props.theme.colors.textBlack};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

const HarvestInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const HarvestButton = styled.button<{
  disabled: boolean;
  $isLoading?: boolean;
}>`
  background: rgba(255, 255, 255, 0.18);
  border-radius: 8px;
  padding: 4px 10px;
  color: ${props => props.theme.colors.textBlack};
  font-size: ${props => props.theme.typography.fontSizes.xs};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  cursor: ${props =>
    props.disabled || props.$isLoading ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;
  white-space: nowrap;
  border: 1px solid ${props => props.theme.colors.border};
  opacity: ${props => (props.$isLoading ? 0.7 : 1)};

  &:hover {
    background: ${props =>
      props.$isLoading
        ? 'rgba(255, 255, 255, 0.18)'
        : 'rgba(255, 255, 255, 0.28)'};
  }

  &:active {
    transform: ${props => (props.$isLoading ? 'none' : 'translateY(1px)')};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const HistoryButton = styled.button`
  background: ${props => props.theme.colors.background};
  border-radius: 8px;
  padding: 4px 10px;
  color: ${props => props.theme.colors.textBlack};
  font-size: ${props => props.theme.typography.fontSizes.xs};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  border: 1px solid ${props => props.theme.colors.border};

  &:hover {
    background: ${props => props.theme.colors.backgroundGray};
  }

  &:active {
    transform: translateY(1px);
  }
`;

const HarvestButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const TokenColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
  max-width: 400px;
  width: 100%;
  align-self: center;
`;

export default function TokenDisplay({
  tokens,
  harvestableTokens = 0,
  onHarvestAll,
  harvestButtonText = '수확하기',
  isHarvesting = false,
}: TokenDisplayProps) {
  const router = useRouter();
  const tokenHistoryModal = useModal();

  const handleViewHistory = () => {
    tokenHistoryModal.openModal();
  };

  const handleNavigateToTokenHistory = () => {
    router.push(ROUTES.profile.tokenHistory);
  };

  return (
    <TokenColumn>
      <TokenContainer>
        <TokenInfo>
          <TokenLabel>보유 토큰</TokenLabel>
          <TokenAmount>
            <TokenIcon>🪙</TokenIcon>
            {tokens.toLocaleString()}
          </TokenAmount>
        </TokenInfo>
        <HistoryButton onClick={handleNavigateToTokenHistory}>
          내역보기
        </HistoryButton>
      </TokenContainer>

      <HarvestSection>
        <HarvestInfo>
          <TokenLabel>수확 가능한 토큰</TokenLabel>
          <TokenAmount>
            <TokenIcon>🌾</TokenIcon>
            {harvestableTokens.toLocaleString()}
          </TokenAmount>
        </HarvestInfo>
        <HarvestButtonGroup>
          <HarvestButton
            onClick={onHarvestAll}
            disabled={harvestableTokens === 0 || isHarvesting}
            $isLoading={isHarvesting}
          >
            {isHarvesting ? (
              <LoadingDots isLoading={isHarvesting} />
            ) : (
              harvestButtonText
            )}
          </HarvestButton>
          <HistoryButton onClick={handleViewHistory}>
            <Image src={ICONS.HISTORY} alt="history" />
          </HistoryButton>
        </HarvestButtonGroup>
      </HarvestSection>

      {/* 토큰 내역 모달 */}
      <TokenHistoryModal
        isOpen={tokenHistoryModal.isOpen}
        onClose={tokenHistoryModal.closeModal}
      />
    </TokenColumn>
  );
}
