let registerUrl = "/user/register"
let loginUrl = "/user/login";
// 微信登录相关
let getOpenIdUrl = "/wx/openId/"
let wxLoginUrl ="/wx/login";
// 扫码登录相关
let qrCodeScanUrl ="/qrcode/scan?uuid="
let qrCodeAuthorizeUrl = "/qrcode/authorize"
// 花费种类相关
let getSpendCategoryUrl = '/spendCategory/recordTypeId/';
// 主页
let spendTotalUrl = "/home/spendTotalInMonth/";
let topThreeSpendTotalUrl = "/home/topThreeSpendCategoryTotal/"
// 分析相关
let spendCategoryTotalUrl = "/analysis/spendCategoryTotal/"
let latestSixMonthListUrl = "/analysis/latestSixMonthList"
// 记账相关
let recordInsertUrl = "/record"
let recordListByMonthUrl = "/record/listByMonth";
let updateRecordUrl = "/record/"
let delRecordUrl = "/record/"



const install = (Vue, vm) => {
	let login = (params = {}) => vm.$u.post(loginUrl, params);
	
	let register = (params = {}) => vm.$u.post(registerUrl, params);
	
	let getOpenId = (code) => vm.$u.get(getOpenIdUrl + code);
	
	let wxLogin = (params = {}) => vm.$u.post(wxLoginUrl, params);
	
	let getSpendCategory = (recordTypeId) => vm.$u.get(getSpendCategoryUrl + recordTypeId);
	
	let recordInsert = (params = {}) => vm.$u.post(recordInsertUrl, params);
	
	let getSpendTotal = (date) => vm.$u.get(spendTotalUrl + date);
	
	let getTopThreeSpendTotal = (date) => vm.$u.get(topThreeSpendTotalUrl + date);
	
	let getRecordListByMonth = (params = {}) => vm.$u.post(recordListByMonthUrl, params);
	
	let updateRecord = (id, params = {}) => vm.$u.put(updateRecordUrl + id, params);
	
	let delRecord = (id) => vm.$u.delete(delRecordUrl + id);
	
	let getLatestSixMonthList = (params = {}) => vm.$u.post(latestSixMonthListUrl, params);
	
	let getSpendCategoryTotal = (year, recordType) => vm.$u.get(spendCategoryTotalUrl + year + '/' + recordType);
	
	let qrCodeScan = (uuid) => vm.$u.put(qrCodeScanUrl + uuid);
	
	let qrCodeAuthorize = (params = {}) => vm.$u.put(qrCodeAuthorizeUrl, params);
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {login, getOpenId, wxLogin, getSpendCategory, recordInsert, getSpendTotal, getTopThreeSpendTotal, getRecordListByMonth, 
				updateRecord, delRecord, getLatestSixMonthList, getSpendCategoryTotal, qrCodeScan, qrCodeAuthorize};
}

export default {
	install
}