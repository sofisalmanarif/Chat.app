export const getSender = (loggedUser, users) => {
    const sender = users.filter((user) => user._id !== loggedUser._id).map(user=>user.userName);
    return sender
  };
  