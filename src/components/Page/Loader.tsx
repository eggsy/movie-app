export const PageLoader: React.FC<{
  seasons?: boolean;
  error?: string | null;
}> = ({ seasons = false, error = null }) => (
  <>
    <div className="absolute inset-0 h-72 -z-10 bg-gray-200/40">
      <div className="inset-0 w-full h-full h-90 w-90" />
    </div>

    <div className="flex flex-col items-center gap-10">
      <div
        className="relative flex-shrink-0 w-48 bg-gray-200 bg-center bg-cover rounded-md h-72"
        style={{
          backgroundImage: error !== null ? `url('/no-image.svg')` : "none",
        }}
      >
        <div className="absolute inset-x-0 flex justify-center -bottom-6">
          <div className="w-16 h-16 bg-gray-200 rounded-full ring-4 ring-white"></div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-52">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-2/3 h-12 rounded-md bg-gray-300/40 animate-pulse" />

          <div className="flex flex-wrap justify-center gap-2">
            {new Array(6).fill(null).map((_, idx) => (
              <div
                key={idx}
                className="w-16 h-6 px-2 py-1 rounded-md bg-gray-300/40"
              />
            ))}
          </div>
        </div>

        <div className="w-full space-y-40">
          <div className="flex flex-col items-center gap-4">
            <div className="w-2/4 h-12 rounded-md bg-gray-300/40" />

            <div className="flex flex-col items-center w-full gap-2">
              <div className="w-full h-5 rounded-md bg-gray-300/40" />
              <div className="w-full h-5 rounded-md bg-gray-300/40" />
              <div className="w-2/3 h-5 rounded-md bg-gray-300/40" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="w-2/3 h-12 rounded-md bg-gray-300/40" />
            <div className="w-1/3 h-6 rounded-md bg-gray-300/40" />
          </div>

          {seasons ? <SeasonsSection /> : <RevenueSection />}
        </div>
      </div>
    </div>
  </>
);

const RevenueSection: React.FC = () => (
  <div className="flex flex-col items-center gap-4">
    <div className="w-2/3 h-12 rounded-md bg-gray-300/40" />

    <div className="flex flex-col items-center w-full gap-2">
      <div className="w-full h-5 rounded-md bg-gray-300/40" />
      <div className="w-1/3 h-5 rounded-md bg-gray-300/40" />
    </div>
  </div>
);

const SeasonsSection: React.FC = () => (
  <div className="flex flex-col items-center gap-4">
    <div className="w-2/4 h-12 rounded-md bg-gray-300/40" />

    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {new Array(3).fill(null).map((_, idx) => (
        <div
          key={idx}
          className="relative w-40 rounded-md shadow-sm bg-gray-200/40 animate-pulse h-60"
        >
          <div className="absolute inset-x-0 bottom-0 p-4 text-white bg-gradient-to-t from-black/10 rounded-b-md">
            <div className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm">
              <div className="w-full h-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default PageLoader;
