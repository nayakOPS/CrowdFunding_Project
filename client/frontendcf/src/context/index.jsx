import React, { useContext, createContext, children } from 'react';
import { useContractEvents, useAddress, useContract, useConnect, useContractWrite, useContractRead, Web3Button, useMetamask } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0x04E057FB303cCA00Ba3015fEC097C7Cc8412024b');
    const { mutateAsync : createCampaign } = useContractWrite(contract, 'createCampaign');
    // const { data: campaignsData } = useContractRead(contract, 'getCampaigns');

    const address = useAddress();
    const connect = useMetamask();

   /*  const publishCampaign = async (form) => {
        try {
            const data = await createCampaign([
                address, // address of the owner
                form.title, // title
                form.description, // description
                // ethers.utils.parseUnits(form.target, 18), // target in wei
                form.target, //ETH target
                new Date(form.deadline).getTime(),
                form.image
            ])
            console.log("Contract Call Success", data);            
        } catch (error) {
            console.log("Contract call UnSuccessfull", error);
        }
    } */

        const publishCampaign = async (form) => {
            try {
                const target = ethers.utils.parseUnits(form.target, 18); // target in wei
                const deadline = Math.floor(new Date(form.deadline).getTime() / 1000); // Convert deadline to timestamp
    
                const data = await createCampaign({
                    args: [
                        address, // address of the owner
                        form.title, // title
                        form.description, // description
                        target, // target in wei
                        deadline, // deadline timestamp
                        form.image // image URL
                    ]
                });
    
                console.log("Contract Call Success", data);
            } catch (error) {
                console.log("Contract call Unsuccessful", error);
            }
        };

        const getCampaigns = async () => {
            const campaigns__ = await contract.call('getCampaigns')
            console.log("before try catch");
            try {
                console.log("isnide try catch");
                if (campaigns__) {
                    const parsedCampaigns = campaigns__.map((campaign, i) => ({
                        owner : campaign.owner,
                        title : campaign.title,
                        description : campaign.description,
                        target : ethers.utils.formatEther(campaign.target.toString()),
                        deadline : campaign.deadline.toNumber(),
                        amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
                        image : campaign.image,
                        pId: i
                    }));
                    console.log("after try catch");
                    console.log("Campaigns fetched successfully", parsedCampaigns);
                    return parsedCampaigns;
                }
            } catch (error) {
                console.log("Contract Call failure from getCampaigns:", error);
            }
        }
    
        const getUserCampaigns = async() => {
            const allCampaigns = await getCampaigns();

            const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

            return filteredCampaigns;
        }

        const donate = async (pId, amount) => {
            const data = await contract.call('donateToCampaign', pId, {value: ethers.utils.parseEther(amount)});
            return data;
        }

        const getDonations = async (pId) => {
            const donations = await contract.call('getDonators',pId);
            const numberOfDonations = donations[0].length;

            const parsedDonations = [ ];

            for(let i = 0; i < numberOfDonations; i++){
                parsedDonations.push({
                    donator:donations[0][i],
                    donation:ethers.utils.formatEther(donations[1][i].toString())
                })
            }

            return parsedDonations;
        }

    return(
        <StateContext.Provider
            value={{
                address,
                connect,
                contract,
                createCampaign: publishCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);