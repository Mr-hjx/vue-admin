import request from '@/utils/request'
import requestBlob from '@/utils/requestBlob'

export function fCeShi() {
  return request({
    url: '/api/v1/customers/1271380907378479104/enable?enable=false',
    method: 'post'
  })
}

export function fGetCodeImage(code) {
  return requestBlob({
    url: '/account/manage/getCodeImage.json',
    method: 'post',
    data: {
      code
    }
  })
}

export function login(data) {
  return request({
    url: '/account/manage/login.json',
    method: 'post',
    data
  })
}

export function fModifyPwd(data) {
  return request({
    url: '/account/manage/modifyPwd.do',
    method: 'post',
    data
  })
}

// 角色
export function fQueryRoles(data) {
  return request({
    url: '/role/manage/queryRoles.do',
    method: 'post',
    data
  })
}

export function fCreateRole(data) {
  return request({
    url: '/role/manage/createRole.do',
    method: 'post',
    data
  })
}

export function fModifyRole(data) {
  return request({
    url: '/role/manage/modifyRole.do',
    method: 'post',
    data
  })
}

export function fDelRole(roleId) {
  return request({
    url: '/role/manage/delRole.do',
    method: 'post',
    data: {
      roleId
    }
  })
}

// 员工
export function fQueryEmployees(data) {
  return request({
    url: '/employee/manage/queryEmployees.do',
    method: 'post',
    data
  })
}

export function fGetEmployeeDetails(employeeId) {
  return request({
    url: '/employee/manage/getEmployeeDetails.do',
    method: 'post',
    data: {
      employeeId
    }
  })
}

export function fCreateEmployee(data) {
  return request({
    url: '/employee/manage/createEmployee.do',
    method: 'post',
    data
  })
}

export function fModifyEmployee(data) {
  return request({
    url: '/employee/manage/modifyEmployee.do',
    method: 'post',
    data
  })
}

export function fDelEmployee(data) {
  return request({
    url: '/employee/manage/delEmployee.do',
    method: 'post',
    data
  })
}

// 重置密码
export function fResetPwd(accountId) {
  return request({
    url: '/account/manage/resetPwd.do',
    method: 'post',
    data: {
      accountId
    }
  })
}

