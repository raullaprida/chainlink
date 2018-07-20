import 'isomorphic-unfetch'
import formatRequestURI from 'utils/formatRequestURI'
import { camelizeKeys } from 'humps'
import { AuthenticationError } from 'errors'

const formatURI = (path, query = {}) => {
  return formatRequestURI(
    path,
    query,
    {
      hostname: global.location.hostname,
      port: process.env.CHAINLINK_PORT
    }
  )
}

const request = (path, query) => {
  const uri = formatURI(path, query)
  return global.fetch(uri)
    .then(response => {
      if (response.status === 401) {
        throw new AuthenticationError(response.statusText)
      }

      return response.json()
    })
    .then((data) => camelizeKeys(data))
}

export const signIn = (email, password) => request('/v2/config')

export const getJobs = (page, size) => request('/v2/specs', {page: page, size: size})

export const getJobSpec = (id) => request(`/v2/specs/${id}`)

export const getJobSpecRuns = (id, page, size) => request(`/v2/specs/${id}/runs`, {page: page, size: size})

export const getJobSpecRun = (id) => request(`/v2/runs/${id}`)

export const getAccountBalance = () => request('/v2/account_balance')

export const getConfiguration = () => request('/v2/config')

export const getBridges = (page, size) => request('/v2/bridge_types', {page: page, size: size})
