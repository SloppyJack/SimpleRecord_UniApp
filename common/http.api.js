let getSpendCategoryUrl = '/v1/spendCategory/recordTypeId/';
let recordInsertUrl = "/v1/record"
let spendTotalUrl = "v1/record/spendTotalInMonth/";
let topThreeSpendTotalUrl = "v1/record/topThreeSpendCategoryTotal/"
let recordListByMonthUrl = "v1/record/recordListByMonth";
let updateRecordUrl = "v1/record/"
let delRecordUrl = "v1/record/"


const install = (Vue, vm) => {
	let getSpendCategory = (recordTypeId) => vm.$u.get(getSpendCategoryUrl + recordTypeId);
	
	let recordInsert = (params = {}) => vm.$u.post(recordInsertUrl, params);
	
	let getSpendTotal = (date) => vm.$u.get(spendTotalUrl + date);
	
	let getTopThreeSpendTotal = (date) => vm.$u.get(topThreeSpendTotalUrl + date);
	
	let getRecordListByMonth = (params = {}) => vm.$u.post(recordListByMonthUrl, params);
	
	let updateRecord = (id, params = {}) => vm.$u.put(updateRecordUrl + id, params);
	
	let delRecord = (id) => vm.$u.delete(delRecordUrl + id);
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {getSpendCategory, recordInsert, getSpendTotal, getTopThreeSpendTotal, getRecordListByMonth, updateRecord,
				delRecord};
}

export default {
	install
}