const TEAM_ID = 
{
    1:
    {
        name: "HODL Heroes",
        feature: "This team is all about the classic strategy of holding onto their digital assets for the long term. Members of this team are patient and strategic, always thinking about the big picture and the potential future value of their investments.",
        src: "../assets/images/Hero_Team_Id_1.png"
    },
    2:
    {
        name: "Trading Titans",
        feature: "This team is focused on short-term gains through active trading in the crypto market. Members of this team are skilled traders, always looking for opportunities to buy and sell at the right time for maximum profit.",
        src: "../assets/images/Hero_Team_Id_2.png"
    },
    3:
    {
        name: "NFT Ninjas",
        feature: "This team is focused on earning through the booming market for non-fungible tokens (NFTs), which are unique digital assets such as art, collectibles, and gaming items. Members of this team are creative and always on the lookout for the next big NFT opportunity.",
        src: "../assets/images/Hero_Team_Id_3.png"
    },
    4:
    {
        name: "Staking Stars",
        feature: "This team is focused on earning through the process of staking, which involves holding a certain amount of digital assets in a wallet in order to support the network and earn rewards. Members of this team are strategic and focused on maximizing their staking rewards.",
        src: "../assets/images/Hero_Team_Id_4.png"
    }
}

export default 
{
    GetInfoTeamId(teamId)
    {
        return TEAM_ID[teamId];
    },

    GetTeamId()
    {
        return TEAM_ID;
    },

    GetNameOfTeamId(teamId)
    {
        return TEAM_ID[teamId].name;
    },
    
    GetFeatureOfTeamId(teamId)
    {
        return TEAM_ID[teamId].feature;
    },

    GetSrcOfTeamId(teamId)
    {
        return TEAM_ID[teamId].src;
    }
}