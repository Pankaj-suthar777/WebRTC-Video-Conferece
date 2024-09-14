const ChatMessages = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-start">
        <div className="max-w-[80%] rounded-lg bg-gray-100 px-4 py-2">
          <p className="text-sm text-gray-900">Hey, how are you?</p>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-lg bg-blue-500 px-4 py-2">
          <p className="text-sm text-white">I'm good, thanks! How about you?</p>
        </div>
      </div>
      {[1, 2, 3, 4, 5, 6, 7, 5, 3, 4, 1, 1].map((_, index) => (
        <div key={index} className="flex justify-start">
          <div className="max-w-[80%] rounded-lg bg-gray-100 px-4 py-2">
            <p className="text-sm text-gray-900">
              I'm doing great, thanks for asking!
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
