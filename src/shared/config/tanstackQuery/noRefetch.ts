export const noRefetch = {
  cacheTime: Infinity,
  reefetchOnReconnect: false,
  refetchInterval: false,
  refetchIntervalInBackground: false,
  refetchOnMount: false,
  refetchOnWindowFOcus: false,
  retry: 1,
  staleTime: Infinity,
} as const
