sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('capex.ext.controller.CapexListReportCustom', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf capex.ext.controller.CapexListReportCustom
			 */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			routing: {
				onAfterBinding: function (oBindingContext, mParameters) {
					try {

						debugger;

						const oExtensionAPI = this.base.getExtensionAPI();
						const oModel = oExtensionAPI.getModel();
						const extensionAPI = oExtensionAPI; // Store oExtensionAPI in a separate variable for closure
						const sFunctionName = "getStatusCount";
						// const oFunction = oModel.bindContext(`/${sFunctionName}(...)`);

						// extensionAPI.getEditFlow().invokeAction(sFunctionName)
						// 	.then((result) => {
						// 		console.log(result);
						// 	})
						// 	.catch((error) => {
						// 		console.error("Error invoking action:", error);
						// 	});

						const oContext = oModel.createBindingContext("/getStatusCount");
						// const oData = oContext.getRe();
						oContext.requestObject().then(function (oData) {
							console.log("Result from getStatusCount:", oData);
						}).catch(function (oError) {
							console.error("Error during request:", oError);
						});
						console.log("Result from getStatusCount:", oData)

						// oModel.createBindingContext("/getStatusCount", null, null, function(oContext) {
						// 	if (oContext) {
						// 		// Read the data from the context
						// 		const oData = oContext.getObject();
						// 		console.log(oData); // This will log the result of the unbound function
						// 	} else {
						// 		console.error("Failed to create binding context");
						// 	}
						// });

						// let path = `/${sFunctionName}(...)`;
						// let oBinding = oModel.bindContext(path);



						// oBinding.execute().then((response) => {
						// 	var oActionContext = oBinding.getBoundContext();
						// 	var messages = oActionContext.getModel().getMessagesByPath("");
						// 	var message = messages[messages.length - 1];
						// 	if (message.type !== "Success") {
						// 		MessageBox.error(message.message);
						// 		return;
						// 	}
						// 	MessageBox.success(message.message);
						// })

						// const oFunction = oModel.bindContext(`/${sFunctionName}()`);

						// oFunction.execute().then((result) => {
						// 	console.log(result);
						// }).catch((error) => {
						// 	console.error("Error invoking function:", error);
						// });

						// oModel.createBindingContext(`/${sFunctionName}`, null, null, function (oContext) {
						// 	const oData = oContext.getObject();
						// 	console.log("Result from getStatusCount:", oData);
						// });

						// oFunction.execute().then((oResult) => {
						// 	debugger;
						// 	const oData = oResult.getObject(); // Handle the result from the function call
						// 	console.log("Result from getStatusCount:", oData);
						// });

						var oMessage = {
							message: "There are Products with errors, Have a nice day",
							type: sap.ui.core.MessageType.Information
						}
						//extensionAPI = this.base.getExtensionAPI();

						function fnOnClose() {
							MessageToast.show("Custom message closed");
						}

						extensionAPI.setCustomMessage(oMessage, null, fnOnClose);
					} catch {
						console.error('You should have no error', error.message);
					}
				}
			}
		}
	});
});
