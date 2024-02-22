import { isEmpty } from 'lodash'
import { COUNTRIES_EN, COUNTRIES_RU, CountriesType } from 'shared/constants/countryList'
import { type ProfileDataModel } from 'shared/types/auth'

const getCountriesLanguage = (city: string, array: CountriesType) => {
  for (const key in array) {
    if (array[key].includes(city)) {
      return key
    }
  }
}

export const getInitialValues = (
  userData?: ProfileDataModel
): ProfileDataModel & { country: string } => {
  if (isEmpty(userData)) {
    return {} as ProfileDataModel & { country: string }
  }

  const country =
    getCountriesLanguage(userData.city, COUNTRIES_EN) ||
    getCountriesLanguage(userData.city, COUNTRIES_RU) ||
    ''

  return { ...userData, country }
}
