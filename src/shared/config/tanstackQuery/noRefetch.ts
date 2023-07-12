export const noRefetch = {
    retry: 1,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFOcus: false,
    reefetchOnReconnect: false,
    refetchIntervalInBackground: false,
    refetchInterval: false
} as const
