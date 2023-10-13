import { type PublicationsResponse } from '../../types/home'
import { $api } from '../api'

export const HomeService = {
    getProfileData (pageParam: number) {
        return $api.get<PublicationsResponse>(`/home/publications-followers?pageNumber=${pageParam}`)
    }
}
