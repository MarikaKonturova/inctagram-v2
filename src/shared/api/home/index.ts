import { type PublicationsResponseType } from '../../types/home'
import { $api } from '../api'

export const HomeService = {
  getProfileData(pageParam: number) {
    return $api.get<PublicationsResponseType>(
      `/home/publications-followers?pageNumber=${pageParam}`
    )
  },
}
