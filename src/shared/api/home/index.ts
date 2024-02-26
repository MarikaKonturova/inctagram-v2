import { LastPublicationsResponse, PublicationsResponseType } from '../../types/home'
import { $api } from '../api'

export const HomeService = {
  getLastPublications() {
    return $api.get<LastPublicationsResponse>(`/home/last-publications`)
  },
  getProfileData(pageParam: number) {
    return $api.get<PublicationsResponseType>(
      `/home/publications-followers?pageNumber=${pageParam}`
    )
  },
}
