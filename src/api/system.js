import request from '@/utils/request'

// 区域
export function fRegionList(data) {
  return request({
    url: '/common/region/list',
    method: 'post',
    data
  })
}

export function fRegionGet(regionId) {
  return request({
    url: '/account/manage/login.json',
    method: 'post',
    data: {
      regionId
    }
  })
}

// 人员
export function fAccountList(data) {
  return request({
    url: '/company/account/pageList',
    method: 'post',
    data
  })
}

export function fLogList(data) {
  return request({
    url: '/company/log/pageList',
    method: 'post',
    data
  })
}

export function fAccountAdd(data) {
  return request({
    url: '/company/account/addCompanyAccount',
    method: 'post',
    data
  })
}

export function fAccountModify(data) {
  return request({
    url: '/company/account/modifyCompanyAccount',
    method: 'post',
    data
  })
}

export function fAccountEnable(data) {
  return request({
    url: '/company/account/enableCompanyAccount',
    method: 'post',
    data
  })
}

