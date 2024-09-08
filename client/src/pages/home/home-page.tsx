import { Button } from "@/components/custom/button";
import { FAQ } from "@/components/home/faq";
import InterestedIn from "@/components/home/interested-in";
import Header from "@/components/layout/header";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="container max-w-[700px] p-4">
        <div className="mb-8">
          <div className="w-full h-12 flex justify-center py-12 mb-8">
            <div className="flex justify-center flex-col items-center">
              <h1 className="text-xl underline">Start exploring</h1>
              <p>(Create a random chat)</p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex gap-4">
              <div>
                <Button className="md:py-12 py-8 md:px-24 px-12 text-lg">
                  TEXT
                </Button>
              </div>
              <div>
                <Button className="md:py-12 py-8 md:px-24 px-12 text-lg">
                  VIDEO
                </Button>
              </div>
            </div>
          </div>
          <InterestedIn />
          <div className="border border-slate-600 p-8 mt-8 mx-8">
            <p className="font-semibold text-lg underline">Most Basic Rules:</p>
            <p>1. You must be 18 or older to use this site.</p>
            <p>2. Spamming "M or F" will result in a timeout.</p>
          </div>
        </div>

        <div>
          <div className="w-full h-12 flex justify-center py-12 mb-8">
            <div className="flex justify-center items-center flex-col">
              <h1 className="text-xl underline">Create Room</h1>
              <p>(Create a personal chat)</p>
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="md:py-12 py-8 md:px-24 px-12 text-lg">
              Create Room
            </Button>
          </div>
        </div>
        <div className="mt-12">
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
