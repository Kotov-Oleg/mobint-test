import {host} from './index';

import {mockCompaniesData} from './mockCompaniesData'

interface CompanyI {
  companyName: string,
  accentColor: string
}

export interface CompaniesI {
  companies: {
    company: {
      companyId: string
    },
    mobileAppDashboard : CompanyI
  }[],
  limit: number,
  offset: number
}
export const loadCompanies = async (offset: number): Promise<CompaniesI> => {
  try {
    const {data} = await host.post<CompaniesI>('getAllCompaniesIdeal', {offset, ie: 'UTF-8', oe: 'UTF-8'})
    return data
  } catch (err: any) {
    throw new Error(err.response.data.message)
  }
}

export const loadCompaniesImitation = async (offset: number): Promise<CompaniesI> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const response: CompaniesI = {
        companies: mockCompaniesData.splice(offset, 10),
        limit: 10,
        offset: offset + 10
      }
      resolve(response)
    }, 1500)
  })
}
