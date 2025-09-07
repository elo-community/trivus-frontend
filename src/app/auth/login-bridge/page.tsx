'use client';

import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  padding: 20px;
  overflow: hidden;
  box-sizing: border-box;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
`;

const StatusText = styled.p`
  color: #666;
  margin-bottom: 20px;
  font-size: 16px;
`;

interface FlutterAuthMessage {
  type: 'AUTH_TOKEN';
  token: string;
  userEmail: string;
  userName: string;
}

export default function LoginBridgePage() {
  const { setProfile, setIsLoggedIn } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const handleMessage = (event: MessageEvent<FlutterAuthMessage>) => {
      console.log('Received message:', event.data);

      if (event.data.type === 'AUTH_TOKEN') {
        alert(
          `토큰 받음: ${event.data.token}\n이메일: ${event.data.userEmail}\n이름: ${event.data.userName}`
        );
        localStorage.setItem('ACCESS_TOKEN', event.data.token);

        // userStore에 사용자 정보 저장
        setProfile({
          email: event.data.userEmail,
          nickname: event.data.userName,
        });
        setIsLoggedIn(true);

        router.push(ROUTES.elo.root);
      }
    };

    // postMessage 이벤트 리스너 등록
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <Container>
      <LoginCard>
        <Title>로그인 브리지</Title>
        <StatusText>플러터 앱에서 인증 정보를 기다리는 중...</StatusText>
      </LoginCard>
    </Container>
  );
}
