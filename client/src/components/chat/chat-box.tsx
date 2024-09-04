// import { Button } from "../ui/button";
// import { Input } from "../ui/input";

// const ChatBox = () => {
//   return (
//     <div className="flex flex-col h-full w-full overflow-hidden relative">
//       <div className="flex-grow overflow-y-auto">
//         {/* Chat messages */}
//         <div className="flex flex-col mb-4 gap-4 py-4 overflow-y-auto">
//           <div className="flex justify-start">
//             <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
//               <p className="text-gray-900 text-sm">Hey, how are you?</p>
//             </div>
//           </div>
//           <div className="flex justify-end">
//             <div className="bg-blue-500 rounded-lg px-4 py-2 max-w-[80%]">
//               <p className="text-white text-sm">
//                 I'm good, thanks! How about you?
//               </p>
//             </div>
//           </div>
//           {[1, 2, 3, 4, 5, 6, 7, 5, 3, 4, 1, 1].map((m) => (
//             <div className="flex justify-start">
//               <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
//                 <p className="text-gray-900 text-sm">
//                   I'm doing great, thanks for asking!
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="flex justify-center items-center h-16 absolute bottom-4 right-4 left-4 z-10">
//         {/* Chat input */}
//         <Input
//           type="text"
//           className="mr-4 border border-slate-800"
//           placeholder="Type a message..."
//         />
//         <Button>Send</Button>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ChatBox = () => {
  return (
    <div className="flex flex-col flex-1 w-full overflow-hidden h-full">
      <div className="flex-grow overflow-y-auto h-[75%]">
        {/* Chat messages */}
        <div className="flex flex-col gap-4 p-4">
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
              <p className="text-gray-900 text-sm">Hey, how are you?</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-blue-500 rounded-lg px-4 py-2 max-w-[80%]">
              <p className="text-white text-sm">
                I'm good, thanks! How about you?
              </p>
            </div>
          </div>
          {[1, 2, 3, 4, 5, 6, 7, 5, 3, 4, 1, 1].map((m, index) => (
            <div key={index} className="flex justify-start">
              <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
                <p className="text-gray-900 text-sm">
                  I'm doing great, thanks for asking!
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className=" w-full p-4 h-[25%]">
        {/* Chat input */}
        <div className="flex justify-center items-center h-16">
          <Input
            type="text"
            className="mr-4 flex-grow"
            placeholder="Type a message..."
          />
          <Button>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
