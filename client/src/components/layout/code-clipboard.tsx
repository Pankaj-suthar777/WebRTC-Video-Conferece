import { useToast } from "@/hooks/use-toast";

const CodeClipboard = ({ roomId }: { roomId: string }) => {
  const { toast } = useToast();

  const copyToClipboardHandler = () => {
    navigator.clipboard.writeText(roomId);
    toast({
      title: "Copied to clipboard successfully",
    });
  };
  return (
    <div className="w-full">
      <div className="bg-gray-900 text-white p-4 rounded-md w-full">
        <div className="flex justify-between items-center mb-2">
          <button
            className="code bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-md"
            data-clipboard-target="#code"
            onClick={copyToClipboardHandler}
          >
            Copy
          </button>
        </div>
        <div className="overflow-x-auto">
          <pre id="code" className="text-gray-300">
            <code>{roomId}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeClipboard;
