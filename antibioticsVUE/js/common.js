new Vue({

	el: '#helloName',
	data: {
		name: '',
		namePlacholder: 'enter your name...',
		showName: true,
		btnVal: "Hide",
		note: false
	},
	methods: {				testConLog(e) {					
			console.log(e.which)
		},
		btnShow() {
			this.showName = !this.showName;
			this.showName ? (this.btnVal = "Hide") : (this.btnVal = "Show");
		}
	}

})