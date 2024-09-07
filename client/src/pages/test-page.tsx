// import ChatBox from "@/components/chat/chat-box";
// import { PhoneOff, Ellipsis, Mic, MicOff } from "lucide-react";
// import { useState } from "react";

// const Landing = () => {
//   const [micOn, setMicOn] = useState(true);

//   const micHandler = () => {
//     setMicOn(!micOn);
//   };
//   return (
//     <div className="grid grid-cols-3 h-screen overflow-hidden p-4">
//       <div className="col-span-2 flex flex-col gap-4">
//         <div className="flex-grow bg-red-200 relative">
//           <div className="absolute bottom-4 right-4 h-[100px] w-[150px] bg-yellow-200">
//             <div className="w-full h-full"></div>
//           </div>
//         </div>
//         <div className="h-[15%] bg-green-200">
//           <div className="h-full w-full flex justify-center items-center">
//             <div className="flex space-x-4 items-center">
//               <div
//                 className="p-4 bg-red-200 rounded-full cursor-pointer"
//                 onClick={micHandler}
//               >
//                 {micOn ? <Mic size={24} /> : <MicOff size={24} />}
//               </div>
//               <div className="p-6 bg-red-200 rounded-full cursor-pointer">
//                 <PhoneOff size={32} />
//               </div>
//               <div className="p-4 bg-red-200 rounded-full cursor-pointer">
//                 <Ellipsis size={24} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="p-4 h-full overflow-hidden">
//         <ChatBox />
//       </div>
//     </div>
//   );
// };

// export default Landing;
import ChatBox from "@/components/chat/chat-box";
import { PhoneOff, Ellipsis, Mic, MicOff } from "lucide-react";
import { useState } from "react";

const Landing = () => {
  const [micOn, setMicOn] = useState(true);

  const micHandler = () => {
    setMicOn(!micOn);
  };
  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="h-[60px] w-full bg-slate-400 top-0 flex justify-center items-center">
        <div className="w-[95%] md:w-[90%] lg:w-[85%] h-full bg-red-500 flex justify-between items-center">
          <h1 className="font-bold text-2xl">Logo</h1>
          <div>App</div>
        </div>
      </div>
      <div className="grid h-[calc(100vh-60px)] md:grid-cols-2 p-4 overflow-hidden">
        <div className="flex md:h-full w-full flex-col gap-4 h-[30vh]">
          <div className="h-full w-full bg-black"></div>
          <div className="h-full w-full bg-black md:block hidden"></div>
        </div>

        <div className="px-4 md:h-full h-[50vh] overflow-hidden flex justify-center items-center">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default Landing;
