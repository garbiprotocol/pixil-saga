const ROBOT_LEVEL = 
{
    0:
    {
        name: "AVA-0",
        level: 0,
        rewardPerBlock: 0,
        feature: "",
        src: "../assets/images/Robot_level_Id_0.png",
    },

    1:
    {
        name: "AVA-1",
        level: 1,
        rewardPerBlock: 1,
        feature: "",
        src: "../assets/images/Robot_level_Id_1.png",
    },

    2:
    {
        name: "AVA-2",
        level: 2,
        rewardPerBlock: 2,
        feature: "",
        src: "../assets/images/Robot_level_Id_2.png",
    },
    3:
    {
        name: "AVA-3",
        level: 3,
        rewardPerBlock: 3,
        feature: "",
        src: "../assets/images/Robot_level_Id_3.png",
    }
}

export default
{
    getInfoRobotByLevel(level)
    {
        return ROBOT_LEVEL[level];
    },

    getNameRobotByLevel(level)
    {
        return ROBOT_LEVEL[level].name;
    },

    getRewardPerBlockByLevel(level)
    {
        return ROBOT_LEVEL[level].rewardPerBlock;
    },

    getSrcRobotByLevel(level)
    {
        return ROBOT_LEVEL[level].src;
    }
}