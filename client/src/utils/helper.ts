export const generateUniqueRoomId = () => {
  return "xxxxxxx".replace(/[x]/g, () =>
    Math.floor(Math.random() * 26).toString(16)
  );
};
