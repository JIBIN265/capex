sap.ui.define(["sap/ui/core/mvc/ControllerExtension"],function(e){"use strict";return e.extend("capex.ext.controller.CapexObjectPageCustom",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel()},routing:{onAfterBinding:async function(e){if(!e){return}try{const s=this.base.getExtensionAPI(),t=s.getModel(),o=s,n="getMessages",r=t.bindContext(`/${n}(...)`),i={N:{type:sap.ui.core.MessageType.Information,key:"inProgress"},X:{type:sap.ui.core.MessageType.Error,key:"notes"},I:{type:sap.ui.core.MessageType.Warning,key:"isRejectionIncomplete"},D:{type:sap.ui.core.MessageType.None,key:"isDraft"},R:{type:sap.ui.core.MessageType.None,key:"isRejectionFinal"},A:{type:sap.ui.core.MessageType.Success,key:"isApproved"}};const a=t.bindContext(e.getPath());a.requestObject().then(e=>{const s=o.getModel("i18n").getResourceBundle();const t=e["status"];if(t&&i[t]){const{type:n,key:r}=i[t];const a=r==="notes"?e[r]:s.getText(r);const c=new sap.ui.core.message.Message({type:n,message:a});o.showMessages([c])}})}catch(e){console.error("You should have no error",e.message)}}}}})});
//# sourceMappingURL=CapexObjectPageCustom.controller.js.map