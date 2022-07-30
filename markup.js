const currentObj = {
  id: "62e58697903fa238d2a84527",
  date: "7/30/2022",
  standupMembers: [
    {
      user: {
        id: "62cbbf8888464fd23db0d6fe",
        username: "GattsuStan",
        discordId: "169676914737414145",
        avatar:
          "https://cdn.discordapp.com/avatars/169676914737414145/7bd323b047b04b815e23af9276e5ba1c.jpg",
        refreshToken: "K8ZLdJ7DsKYLsZteEWdJY4S1d6LCJz",
        accessToken: "dg1A2u9PD40JPpLVXlq7PuezLMOAoQ",
      },
      tasks: [
        {
          id: "62e59e0ae469ea1dd1e6486c",
          completed: false,
          label: "Get a new Vape",
          standUpMembersId: "62e590ea903fa238d2a8452a",
        },
        {
          id: "62e59e0ae469ea1dd1e6486c",
          completed: false,
          label: "Get a new Vape",
          standUpMembersId: "62e590ea903fa238d2a8452a",
        },
      ],
      id: "62e590ea903fa238d2a8452a",
    },
    {
      user: {
        id: "62d4521ba8817c5f49ac7b3f",
        username: "Acedia",
        discordId: "170263155509821440",
        avatar:
          "https://cdn.discordapp.com/avatars/170263155509821440/7fe66101df6db44ecb0e1dc8cc3b1d2c.webp",
        refreshToken: "cIcGuY1K3NLKv5hTschs5vLkPe4b0f",
        accessToken: "Zoyv9Nkmh5btJffF0hWloL0zIDqU6N",
      },
      tasks: [],
      id: "62e5abe078b93dacda59fb78",
    },
  ],
};

function generateMessage(standupObj) {
  return `
  \`\`\`
  ## Today's Tasks
  -------------
  Date:${standupObj.date}
  -------------
  ${standupObj.standupMembers.map((member) => {
    return generateMember(member);
  })}
  \`\`\`
  `;
}

function generateMember(standupMember) {
  return `
  Username: ${standupMember.user.username}
  Task: ${standupMember.tasks.map((task) => {
    return `\n   ${task.label}, Completed: ${task.completed}`;
  })}
  -------------

  `;
}

module.exports = generateMessage;
