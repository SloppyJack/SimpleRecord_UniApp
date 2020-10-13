let getSpendCategoryUrl = '/v1/spendCategory/getByRecordType';
let indexUrl = '/ebapi/public_api/index';
let recordInsertUrl = "/v1/record/insert"
let getSpendTotalUrl = "v1/record/getSpendTotalInMonth";
let getTopThreeSpendTotalUrl = "v1/record/getTopThreeSpendTotal"


const install = (Vue, vm) => {
	let getSpendCategory = (params) => vm.$u.get(getSpendCategoryUrl, params);
	
	let recordInsert = (params = {}) => vm.$u.post(recordInsertUrl, params);
	
	let getSpendTotal = (params) => vm.$u.get(getSpendTotalUrl, params);
	
	let getTopThreeSpendTotal = (params) => vm.$u.get(getTopThreeSpendTotalUrl, params);
	
	// 此处使用了传入的params参数，一切自定义即可
	let getInfo = (params = {}) => vm.$u.post(indexUrl, params);
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {getSpendCategory, getInfo, recordInsert, getSpendTotal, getTopThreeSpendTotal};
}

export default {
	install
}