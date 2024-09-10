export const generateUniqueRoomId = () => {
  return "xxxxxxx".replace(/[x]/g, () =>
    Math.floor(Math.random() * 26).toString(16)
  );
};

export const roomLink = (roomId: string) => {
  return "http://localhost:5173/room/" + roomId;
};
