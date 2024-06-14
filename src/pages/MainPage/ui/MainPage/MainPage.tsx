import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '@/widgets/Page';

function MainPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/items');
  }, [navigate]);
  return <Page />;
}

export default memo(MainPage);
