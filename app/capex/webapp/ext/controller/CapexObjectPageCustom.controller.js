sap.ui.define(['sap/ui/core/mvc/ControllerExtension', 'sap/m/MessageToast'], function (ControllerExtension, MessageToast) {
	'use strict';

	return ControllerExtension.extend('capex.ext.controller.CapexObjectPageCustom', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf capex.ext.controller.CapexObjectPageCustom
			 */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},

			routing: {

				onAfterBinding: async function (oBindingContext) {
					if (!oBindingContext) { return; }


					try {

						const
							oExtensionAPI = this.base.getExtensionAPI(),
							oModel = oExtensionAPI.getModel(),
							extensionAPI = oExtensionAPI, // Store oExtensionAPI in a separate variable for closure
							sFunctionName = "getMessages",
							oFunction = oModel.bindContext(`/${sFunctionName}(...)`),



							statusMappings = {
								'N': { type: sap.ui.core.MessageType.Information, key: 'isInProgress' },
								'X': { type: sap.ui.core.MessageType.Error, key: 'notes' },
								'I': { type: sap.ui.core.MessageType.Warning, key: 'isRejectionIncomplete' },
								'D': { type: sap.ui.core.MessageType.None, key: 'isDraft' },
								'R': { type: sap.ui.core.MessageType.None, key: 'isRejectionFinal' },
								'A': { type: sap.ui.core.MessageType.Success, key: 'isApproved' }
							};

						debugger;
						
						// const oFeedListItemTemplate = oExtensionAPI.byId('capex::CapexObjectPage--fe::CustomSubSection::Feed--feedListItemTemplate')
						// if (oList) {
						// 	// Bind the list to /Capex/to_Comments
						// 	const sPath = `${oBindingContext.getPath()}/to_Comments`;
						// 	if (oList) {
							
						// 		oList.bindItems({
						// 			path: sPath,
						// 			template: oFeedListItemTemplate,
						// 			templateShareable: false
						// 		});
						// 		oList.getBinding("items").refresh();
						// 		// oBindingContext.refresh();
						// 	}
						// 	debugger;
						// }

						const aContext = oModel.bindContext(oBindingContext.getPath());
						// Request the Entity
						aContext.requestObject().then(data => {

							const i18n = extensionAPI.getModel("i18n").getResourceBundle();


							const status = data['status'];

							if (status && statusMappings[status]) {
								const { type, key } = statusMappings[status];
								const messageText = key === 'notes' ? data[key] : i18n.getText(key);
								const oMessage = new sap.ui.core.message.Message({ type, message: messageText });
								extensionAPI.showMessages([oMessage]);
							}

						})
					}
					catch (error) {
						console.error('You should have no error', error.message);

					}
				}

			},

			// onBeforeNavigate: function () {
			// 	debugger;
			// 	const oExtensionAPI = this.base.getExtensionAPI();
			// 	const oList = oExtensionAPI.byId('capex::CapexObjectPage--fe::CustomSubSection::Feed--commentsList');
			// 	if (oList) {
			// 		// Clear the list items
			// 		oList.removeAllItems();
			// 	}
			// }

		},



	});
});
