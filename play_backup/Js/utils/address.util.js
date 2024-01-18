const ADDRESS_HELPER = {
	GetCurrentAddress() {
		if (!window) return null;
		if (!window.ethereum) return null;
		if (window.ethereum.selectedAddress == '') return null;
		return window.ethereum.selectedAddress;
	},
};
export default ADDRESS_HELPER;