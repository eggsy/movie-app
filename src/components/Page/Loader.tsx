export const PageLoader: React.FC<{
  seasons?: boolean;
  trailerButton?: boolean;
  error?: string | null;
}> = ({ seasons = false, trailerButton = true, error = null }) => (
  <>
    <div className="absolute inset-0 h-72 -z-10 bg-gray-200/40">
      <div className="inset-0 w-full h-full h-90 w-90" />
    </div>

    <div className="flex flex-col items-center gap-10 px-6 md:px-0">
      <div
        className="relative flex-shrink-0 w-48 bg-gray-200 bg-center bg-cover rounded-md h-72"
        style={{
          backgroundImage: error !== null ? `url('/load-error.svg')` : "none",
        }}
      >
        {trailerButton && (
          <div className="absolute inset-x-0 flex justify-center -bottom-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full ring-4 ring-white"></div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-center space-y-52">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-col items-center w-full space-y-2">
            <div className="w-2/3 h-12 rounded-md bg-gray-300/40 animate-pulse" />
            <div className="w-1/3 h-6 rounded-md bg-gray-300/40 animate-pulse" />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {new Array(4).fill(null).map((_, idx) => (
              <div
                key={idx}
                className="w-12 h-12 rounded-full animate-pulse bg-gray-300/40"
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

          {/* Cast section */}
          <SeasonsSection />
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

// This component is also used to mimic the "Cast" section
const SeasonsSection: React.FC = () => (
  <div className="flex flex-col items-center space-y-4">
    <div className="w-2/4 h-12 rounded-md bg-gray-300/40" />

    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
      {new Array(3).fill(null).map((_, idx) => (
        <div
          key={idx}
          className="relative w-full rounded-md shadow-sm md:px-24 bg-gray-200/40 animate-pulse h-80"
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
