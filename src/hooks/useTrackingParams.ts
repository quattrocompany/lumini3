'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export function useTrackingParams() {
  const searchParams = useSearchParams();
  const [trackingData, setTrackingData] = useState({});

  useEffect(() => {
    // 1. Extrai os parâmetros de origem da URL
    const paramsFromUrl = {
      utm_source: searchParams.get('utm_source') || '',
      utm_medium: searchParams.get('utm_medium') || '',
      utm_campaign: searchParams.get('utm_campaign') || '',
      utm_term: searchParams.get('utm_term') || '',
      utm_content: searchParams.get('utm_content') || '',
      gclid: searchParams.get('gclid') || '', // ID de clique do Google Ads
    };

    // 2. Se houver algum parâmetro presente na URL, salva no sessionStorage
    const hasParams = Object.values(paramsFromUrl).some((val) => val !== '');

    if (hasParams) {
      sessionStorage.setItem('lumini3_tracking', JSON.stringify(paramsFromUrl));
      setTrackingData(paramsFromUrl);
    } else {
      // Se não houver na URL atual, tenta recuperar do sessionStorage
      const saved = sessionStorage.getItem('lumini3_tracking');
      if (saved) {
        setTrackingData(JSON.parse(saved));
      }
    }
  }, [searchParams]);

  return trackingData;
}