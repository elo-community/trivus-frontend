import styled from 'styled-components';

interface LoadingDotsProps {
  isLoading: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const DotsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const Dot = styled.div<{ $delay: number; $size: string; $color: string }>`
  width: ${props => {
    switch (props.$size) {
      case 'small':
        return '4px';
      case 'medium':
        return '6px';
      case 'large':
        return '8px';
      default:
        return '6px';
    }
  }};
  height: ${props => {
    switch (props.$size) {
      case 'small':
        return '4px';
      case 'medium':
        return '6px';
      case 'large':
        return '8px';
      default:
        return '6px';
    }
  }};
  border-radius: 50%;
  background-color: ${props => props.$color};
  animation: loadingDots 1.4s infinite ease-in-out;
  animation-delay: ${props => props.$delay}s;

  @keyframes loadingDots {
    0%,
    80%,
    100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% {
      transform: scale(1.2);
      opacity: 1;
    }
  }
`;

const LoadingDots: React.FC<LoadingDotsProps> = ({
  isLoading,
  size = 'medium',
  color = '#E8C87D',
}) => {
  if (!isLoading) return null;

  return (
    <DotsContainer>
      <Dot $delay={0} $size={size} $color={color} />
      <Dot $delay={0.2} $size={size} $color={color} />
      <Dot $delay={0.4} $size={size} $color={color} />
    </DotsContainer>
  );
};

export default LoadingDots;
