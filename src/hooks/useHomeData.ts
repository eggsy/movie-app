// Hooks
import useTrending from "./useTrending";
import useDiscovery from "./useDiscovery";

export const useHomeData = () => {
  const {
    data: trending,
    loading: trendingLoading,
    error: trendingError,
  } = useTrending();

  const {
    data: discovery,
    loading: discoveryLoading,
    error: discoveryError,
  } = useDiscovery();

  return {
    loading: trendingLoading || discoveryLoading,
    error: trendingError || discoveryError,
    data: {
      trending,
      discovery,
    },
  };
};

export default useHomeData;
