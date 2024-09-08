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

import ChatControlBox from "@/components/chat-control/chat-control-box";
import Header from "@/components/layout/header";
import { PhoneOff, Ellipsis, Mic, MicOff } from "lucide-react";
import { useState } from "react";

const Landing = () => {
  const [micOn, setMicOn] = useState(true);

  const micHandler = () => {
    setMicOn(!micOn);
  };
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Header />
      <div className="grid h-[calc(100vh-60px)] md:grid-cols-2 md:p-4 p-2 overflow-hidden">
        <div className="flex md:h-full w-full flex-col gap-4 h-[35vh]">
          <div className="h-full w-full bg-black relative">
            {/* self camera - for mobile size device */}
            <div className="md:hidden absolute bottom-4 right-4 h-[80px] w-[120px] bg-yellow-200">
              <div className="w-full h-full"></div>
            </div>
          </div>
          {/* self camera - for desktop/tablet size device */}
          <div className="h-full w-full bg-black md:block hidden"></div>
        </div>

        <div className="md:px-4 md:h-full flex-1 overflow-hidden flex justify-center items-center">
          <ChatControlBox />
        </div>
      </div>
    </div>
  );
};

export default Landing;
