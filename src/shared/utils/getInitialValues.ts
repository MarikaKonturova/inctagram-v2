import { isEmpty } from 'lodash'
import { COUNTRIES } from 'shared/constants/countryList'
import { type ProfileDataModel } from 'shared/types/auth'

export const getInitialValues = (
  userData?: ProfileDataModel
): ProfileDataModel & { country: string } => {
  if (isEmpty(userData)) {
    return {} as ProfileDataModel & { country: string }
  }
  let country = ''

  for (const key in COUNTRIES) {
    if (COUNTRIES[key].includes(userData.city)) {
      country = key
    }
  }

  return { ...userData, country }
}
