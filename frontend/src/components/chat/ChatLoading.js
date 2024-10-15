const ChatLoading = () => {
  return (
    <div className="flex flex-col space-y-2 p-3 rounded-lg shadow-md bg-gray-100">
      <div className="h-8 animate-pulse rounded-lg bg-gray-200"></div>
      <div className="h-8 animate-pulse rounded-lg bg-gray-200"></div>
      <div className="flex flex-row justify-between h-8">
        <div className="w-3/4 animate-pulse rounded-lg bg-gray-200"></div>
        <div className="w-1/4 animate-pulse rounded-lg bg-gray-200"></div>
      </div>
      <div className="h-8 animate-pulse rounded-lg bg-gray-200"></div>
      <div className="flex flex-row justify-between h-8">
        <div className="w-2/3 animate-pulse rounded-lg bg-gray-200"></div>
        <div className="w-1/3 animate-pulse rounded-lg bg-gray-200"></div>
      </div>
      <div className="h-8 animate-pulse rounded-lg bg-gray-200"></div>
      <div className="flex flex-row justify-between h-8">
        <div className="w-5/12 animate-pulse rounded-lg bg-gray-200"></div>
        <div className="w-7/12 animate-pulse rounded-lg bg-gray-200"></div>
      </div>
      <div className="h-8 animate-pulse rounded-lg bg-gray-200"></div>
      <div className="h-8 animate-pulse rounded-lg bg-gray-200"></div>
    </div>
  );
};

export default ChatLoading;
