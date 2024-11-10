sap.ui.define(["sap/ui/core/mvc/ControllerExtension","sap/m/MessageToast"],function(e,s){"use strict";return e.extend("capex.ext.controller.CapexObjectPageCustom",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel()},routing:{onAfterBinding:async function(e){if(!e){return}try{const s=this.base.getExtensionAPI(),t=s.getModel(),o=s,n="getMessages",r=t.bindContext(`/${n}(...)`),a={N:{type:sap.ui.core.MessageType.Information,key:"isInProgress"},X:{type:sap.ui.core.MessageType.Error,key:"notes"},I:{type:sap.ui.core.MessageType.Warning,key:"isRejectionIncomplete"},D:{type:sap.ui.core.MessageType.None,key:"isDraft"},R:{type:sap.ui.core.MessageType.None,key:"isRejectionFinal"},A:{type:sap.ui.core.MessageType.Success,key:"isApproved"}};debugger;const i=t.bindContext(e.getPath());i.requestObject().then(e=>{const s=o.getModel("i18n").getResourceBundle();const t=e["status"];if(t&&a[t]){const{type:n,key:r}=a[t];const i=r==="notes"?e[r]:s.getText(r);const c=new sap.ui.core.message.Message({type:n,message:i});o.showMessages([c])}})}catch(e){console.error("You should have no error",e.message)}}}}})});
//# sourceMappingURL=CapexObjectPageCustom.controller.js.map