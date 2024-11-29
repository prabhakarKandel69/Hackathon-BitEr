const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full mt-4">
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
              Upload Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
              {progress}%
            </span>
          </div>
        </div>
        <div className="flex mb-2">
          <div className="w-full bg-gray-200 rounded-full">
            <div
              className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full"
              style={{ width: `${progress}%` }}
            >
              &nbsp;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
