function generateMessage(standupObj) {
  console.log("Generate Message Object: ", standupObj)
  return `
  \`\`\`
  ## Today's Tasks
  -------------
  Date:${standupObj.date}
  -------------
  ${ standupObj.standupMembers && standupObj.standupMembers.map((member) => {
    return generateMember(member);
  })}
  \`\`\`
  `;
}

function generateMember(standupMember) {
  return `
  Username: ${standupMember.user.username}
  Task: ${standupMember.tasks && standupMember.tasks.map((task) => {
    return `\n   ${task.label}, Completed: ${task.completed}`;
  })}
  -------------

  `;
}

module.exports = { generateMessage };
