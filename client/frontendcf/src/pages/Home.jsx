import React, { useState, useEffect } from 'react';
import { useStateContext } from '../context';

import { DisplayCampaigns } from '../components';

const Home = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ campaigns, setCampaigns ] = useState([]);

  const { address, contract, getCampaigns  } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const campaignsData  = await getCampaigns();
    console.log("Campaign Data :", campaignsData);
    setCampaigns(campaignsData);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Home
