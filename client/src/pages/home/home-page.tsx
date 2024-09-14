import { FAQ } from "@/components/home/faq";
import InterestedIn from "@/components/home/interested-in";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PrivateRoomTable from "@/components/home/my-private-room-table/private-room-table";

import useCreatePrivateRoom from "@/hooks/mutations/room/useCreatePrivateRoom";
import ShareLinkModal from "@/components/home/share-link-modal";
import StartExploringSection from "./sections/start-exploring-section";
import BasicRulesSection from "./sections/basic-rules-section";
import CreateRoomSection from "./sections/create-room-section";

const HomePage: React.FC = () => {
  const { createRoom, loading, newlyCreateRoomLink } = useCreatePrivateRoom();

  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="container max-w-[700px] p-4">
        <StartExploringSection />
        <InterestedIn />
        <BasicRulesSection />
        <CreateRoomSection createRoomFunction={createRoom} />

        <div className="mt-8 space-y-8">
          <PrivateRoomTable />
          <FAQ />
        </div>
      </div>
      <ShareLinkModal
        loading={loading}
        newlyCreateRoomLink={newlyCreateRoomLink}
      />

      {/* footer section */}
      <div className="mt-12 h-2 w-full border-t border-slate-600" />
      <Footer />
    </div>
  );
};

export default HomePage;
