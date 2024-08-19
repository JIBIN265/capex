sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment"
], function (MessageToast, MessageBox, Fragment) {
    'use strict';

    return {
        onPost: async function (oEvent) {
            // Get the FeedInput control from the event source or the view
            debugger;
            var oFeedInput = oEvent.getSource();
            var sNewComment = oFeedInput.getValue();
            var sValue = oEvent.getParameter("value");
            // Get the binding context of the FeedInput control
            var oContext = oFeedInput.getBindingContext();

            // Check if the context is valid
            if (!oContext) {
                MessageToast.show("No context found.");
                return;
            }

            // Prepare the new comment entry
            var oNewComment = {
                text: sNewComment,
                // Add other required properties if needed
            };

            // Get the ODataModel from the context
            var oModel = oContext.getModel();

            // Create the new comment entry in the context
            oModel.create("/to_Comments", oNewComment, {
                context: oContext,
                success: function () {
                    MessageToast.show("Comment added successfully!");
                    oFeedInput.setValue(""); // Clear the input field
                },
                error: function () {
                    MessageToast.show("Error adding comment.");
                }
            });
        },

        onSenderPress: function (oEvent) {
            // Handle sender press event
        },

        onIconPress: function (oEvent) {
            // Handle icon press event
        }
    };
});
