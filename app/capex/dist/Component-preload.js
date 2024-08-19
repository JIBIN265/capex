//@ui5-bundle capex/Component-preload.js
sap.ui.require.preload({
	"capex/Component.js":function(){
sap.ui.define(["sap/fe/core/AppComponent"],function(e){"use strict";return e.extend("capex.Component",{metadata:{manifest:"json"}})});
},
	"capex/ext/CustomImage.view.xml":'<mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m"><VBox id="myVBox"><Image id="myImage" src="https://www.kruger.com/wp-content/uploads/2020/03/logo-kruger-300x201.gif" alt="Logo" /></VBox></mvc:View>',
	"capex/ext/controller/CapexListReportCustom.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/ControllerExtension"],function(e){"use strict";return e.extend("capex.ext.controller.CapexListReportCustom",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel()},routing:{onAfterBinding:async function(e){try{const o=this.base.getExtensionAPI(),n=o.getModel(),s=o,r="getStatusCount",i=n.bindContext(`/${r}(...)`),a=s.getModel("i18n").getResourceBundle();await i.execute();const c=i.getBoundContext();const u=c.getValue();if(u){const g=a.getText("inProgress",[u.inProgressCount]),l=a.getText("approvedOrders",[u.approvedCount]),d=a.getText("rejectFinal",[u.rejectFinalCount]),p=a.getText("rejectIncomplete",[u.rejectIncompleteCount]),x=`${g}, ${l}, ${d}, ${p}`;var t={message:x,type:sap.ui.core.MessageType.Information};function C(){MessageToast.show("Custom message closed")}s.setCustomMessage(t,null,C)}}catch(m){console.error("You should have no error",m.message)}}}}})});
},
	"capex/ext/controller/CapexObjectPageCustom.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/ControllerExtension","sap/m/MessageToast"],function(e,t){"use strict";return e.extend("capex.ext.controller.CapexObjectPageCustom",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel()},routing:{onAfterBinding:async function(e){if(!e){return}try{const t=this.base.getExtensionAPI(),s=t.getModel(),o=t,n="getMessages",i=s.bindContext(`/${n}(...)`),a={N:{type:sap.ui.core.MessageType.Information,key:"isInProgress"},X:{type:sap.ui.core.MessageType.Error,key:"notes"},I:{type:sap.ui.core.MessageType.Warning,key:"isRejectionIncomplete"},D:{type:sap.ui.core.MessageType.None,key:"isDraft"},R:{type:sap.ui.core.MessageType.None,key:"isRejectionFinal"},A:{type:sap.ui.core.MessageType.Success,key:"isApproved"}};const c=t.byId("capex::CapexObjectPage--fe::CustomSubSection::Feed--commentsList");if(c){const t=`${e.getPath()}/to_Comments`;if(c){const t=new sap.m.FeedListItem({id:"feedListItemTemplate",sender:"{createdBy}",icon:"{icon}",info:"{info}",timestamp:"{modifiedAt}",text:"{text}",convertLinksToAnchorTags:"All"});const s=`${e.getPath()}/to_Comments`;c.bindItems({path:s,template:t})}}const r=s.bindContext(e.getPath());r.requestObject().then(e=>{const t=o.getModel("i18n").getResourceBundle();const s=e["status"];if(s&&a[s]){const{type:n,key:i}=a[s];const c=i==="notes"?e[i]:t.getText(i);const r=new sap.ui.core.message.Message({type:n,message:c});o.showMessages([r])}})}catch(e){console.error("You should have no error",e.message)}}}},onPost:function(){t.show("Pressed on "+oEvent.getSource().getSender())}})});
},
	"capex/ext/fragment/Feed.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core"\n    xmlns="sap.m"\n    xmlns:l="sap.ui.layout"\n    displayBlock="true"><l:VerticalLayout id="verticalLayout" class="sapUiContentPadding" width="100%"><l:content><FeedInput id="feedInput"\n                       post=".onPost"\n                       icon="test-resources/sap/m/images/dronning_victoria.jpg"\n                       class="sapUiSmallMarginTopBottom"/><List id="commentsList" headerText="Comments" showSeparators="Inner"></List></l:content></l:VerticalLayout></core:FragmentDefinition>\n',
	"capex/ext/fragment/Feed.js":function(){
sap.ui.define(["sap/m/MessageToast","sap/m/MessageBox","sap/ui/core/Fragment"],function(e,t,n){"use strict";return{onPost:async function(t){debugger;var n=t.getSource();var o=n.getValue();var s=t.getParameter("value");var r=n.getBindingContext();if(!r){e.show("No context found.");return}var a={text:o};var u=r.getModel();u.create("/to_Comments",a,{context:r,success:function(){e.show("Comment added successfully!");n.setValue("")},error:function(){e.show("Error adding comment.")}})},onSenderPress:function(e){},onIconPress:function(e){}}});
},
	"capex/i18n/customI18N.properties":'## Search-Term: "enhanceI18n"\nC_COMMON_ACTION_PARAMETER_DIALOG_CANCEL=Custom cancel text\nC_OPERATIONS_ACTION_CONFIRM_MESSAGE|RootEntities|criticalAction=Custom text for the critical action message\nC_TRANSACTION_HELPER_OBJECT_PAGE_CONFIRM_DELETE_WITH_OBJECTTITLE_SINGULAR|RootEntities=Custom text for the delete RootEntities message\nC_COMMON_DIALOG_OK=Agree\nNEW_OBJECT=New Order\nC_TRANSACTION_HELPER_OBJECT_CREATED=Order Submitted to SAP for Activation\nC_TRANSACTION_HELPER_OBJECT_SAVED=Order Saved\nT_ANNOTATION_HELPER_DEFAULT_HEADER_TITLE_NO_HEADER_INFO=No Order Description\nT_OP_OBJECT_PAGE_SAVE=Save Order\nT_OP_RELATED_APPS=Related Apps\nT_NEW_OBJECT=New Order\nM_ILLUSTRATEDMESSAGE_DESCRIPTION=This may happen if your access is restricted or the data is incomplete.\nM_COMMON_TABLE_CREATE=+ Order\n',
	"capex/i18n/customI18N_en.properties":'C_COMMON_ACTION_PARAMETER_DIALOG_CANCEL=Custom cancel text\nC_OPERATIONS_ACTION_CONFIRM_MESSAGE|RootEntities|criticalAction=Custom text for the critical action message\nC_TRANSACTION_HELPER_OBJECT_PAGE_CONFIRM_DELETE_WITH_OBJECTTITLE_SINGULAR|Capex=Confirm Order Delete\nC_COMMON_DIALOG_OK=Agree\nNEW_OBJECT=New Order\nC_TRANSACTION_HELPER_OBJECT_CREATED=Order submitted to SAP\nC_TRANSACTION_HELPER_OBJECT_SAVED=Order Saved\nT_ANNOTATION_HELPER_DEFAULT_HEADER_TITLE_NO_HEADER_INFO=No Order Description\nT_OP_OBJECT_PAGE_SAVE=Submit Order\nT_OP_OBJECT_PAGE_CREATE=Submit Order to SAP\nT_OP_RELATED_APPS=Related Apps\nT_NEW_OBJECT=New Order\nM_ILLUSTRATEDMESSAGE_DESCRIPTION=This may happen if your access is restricted or the data is incomplete.\nM_COMMON_TABLE_CREATE|Capex=+ Order\nM_COMMON_TABLE_CREATE|to_CashFlowYear=+ Year\nM_COMMON_TABLE_CREATE|to_Objectives=+ Objective\nM_COMMON_TABLE_CREATE|to_Attachments=+ Attachments\nST_DRAFT_DATALOSS_CREATE_ENTITY_TOL|Capex=Create the Order\nST_DRAFT_DATALOSS_POPUP_MESSAGE_CREATE|Capex=You haven\'t created this Order yet.What would you like to do?\nM_TABLE_AND_CHART_NO_FILTERS_NO_DATA_TEXT|to_CashFlowYear=Add an year\nM_TABLE_AND_CHART_NO_FILTERS_NO_DATA_TEXT|to_Objectives=Add an objective\nT_TABLE_AND_CHART_NO_DATA_TEXT_WITH_FILTER|Capex=No Orders found. Try adjusting the search or filter parameters.',
	"capex/i18n/i18n.properties":'# This is the resource bundle for com.cpggpc.xt.fe.productcore\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=Capex\n\n#YDES: Application description\nappDescription=Capital Projects Appropriation\n\nflpTitle=Capex Orders\n\nhasErrors=This report was rejected by SAP due to XYZ',
	"capex/i18n/i18n_en.properties":'# This is the resource bundle for featureShowcase\n\n#Texts for manifest.json\n#XTIT: Application name\nappTitle=Capex\n\n#YDES: Application description\nappDescription=Capital Projects Appropriation\n\nflpTitle=Capex Orders\n\n#YDES: Application description\ncustomSubSection=custom subsection\n\nreject=Reject\nhasErrors=This report was rejected by SAP due to XYZ\n\nisDraft=This order is in draft status. Please submit it to create.\nisRejectionFinal=This order has been finally rejected.\nisRejectionIncomplete=This order has an incomplete rejection.\nisInProgress=This order has been submitted for Approval.\nisApproved=This is an approved order. Edit with caution.\ninProgress=Orders in progress: {0}\napprovedOrders=Approved orders: {0}\nrejectFinal=Final rejected orders: {0}\nrejectIncomplete=Incomplete rejected orders: {0}\n\n\n\t\t\t\t\t\t\t\n',
	"capex/manifest.json":'{"_version":"1.59.0","sap.app":{"id":"capex","type":"application","i18n":{"bundleName":"capex.i18n.i18n","supportedLocales":["en","fr"],"fallbackLocale":"en"},"applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:lrop","version":"1.14.3","toolsId":"fc159ce1-9e34-4214-a661-2c0d35fc6971"},"dataSources":{"mainService":{"uri":"odata/v4/capex-catalog/","type":"OData","settings":{"annotations":[],"odataVersion":"4.0"}}},"crossNavigation":{"inbounds":{"Zcapex-manage":{"semanticObject":"Zcapex","action":"manage","title":"{{flpTitle}}","signature":{"parameters":{},"additionalParameters":"allowed"}}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"extends":{"extensions":{"sap.ui.viewExtensions":{"sap.fe.templates.ListReport.ListReport":{"BeforeFacetExtension":{"className":"sap.ui.core.mvc.View","viewName":"capex.ext.CustomImage","type":"XML"}}},"sap.ui.controllerExtensions":{"sap.fe.templates.ObjectPage.ObjectPageController#capex::CapexObjectPage":{"controllerName":"capex.ext.controller.CapexObjectPageCustom"},"sap.fe.templates.ListReport.ListReportController#capex::CapexList":{"controllerName":"capex.ext.controller.CapexListReportCustom"}}}},"flexEnabled":true,"dependencies":{"minUI5Version":"1.127.0","libs":{"sap.m":{},"sap.ui.core":{},"sap.ushell":{},"sap.fe.templates":{},"sap.f":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"capex.i18n.i18n","supportedLocales":["en","fr"],"fallbackLocale":"en"}},"":{"dataSource":"mainService","preload":true,"settings":{"operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}},"@i18n":{"type":"sap.ui.model.resource.ResourceModel","uri":"i18n/i18n.properties"}},"resources":{"css":[]},"routing":{"config":{"flexibleColumnLayout":{"defaultTwoColumnLayoutType":"TwoColumnsMidExpanded","defaultThreeColumnLayoutType":"ThreeColumnsMidExpanded"},"routerClass":"sap.f.routing.Router"},"routes":[{"pattern":":?query:","name":"CapexList","target":["CapexList"]},{"pattern":"Capex({key}):?query:","name":"CapexObjectPage","target":["CapexList","CapexObjectPage"]},{"pattern":"Capex({key})/to_CashFlowYear({key2}):?query:","name":"CashFlowYearObjectPage","target":["CapexList","CapexObjectPage","CashFlowYearObjectPage"]}],"targets":{"CapexList":{"type":"Component","id":"CapexList","name":"sap.fe.templates.ListReport","options":{"settings":{"contextPath":"/Capex","enhanceI18n":"i18n/customI18N.properties","variantManagement":"Page","navigation":{"Capex":{"detail":{"route":"CapexObjectPage"}}},"initialLoad":"Enabled","controlConfiguration":{"@com.sap.vocabularies.UI.v1.SelectionFields":{"showClearButton":true,"filterFields":{"modifiedAt":{"settings":{"operatorConfiguration":[{"path":"key","equals":"TODAYXYDAYS","exclude":true},{"path":"key","equals":"LASTMINUTES","exclude":true},{"path":"key","equals":"NEXTDAYS","exclude":true},{"path":"key","equals":"TODAYFROMTO","exclude":true},{"path":"key","equals":"LASTDAYS","exclude":true},{"path":"key","equals":"LASTWEEKS","exclude":true},{"path":"key","equals":"LASTYEARS","exclude":true},{"path":"key","equals":"LASTMONTHS","exclude":true},{"path":"key","equals":"NEXTHOURS","exclude":true},{"path":"key","equals":"NEXTYEARS","exclude":true},{"path":"key","equals":"NEXTYEAR","exclude":true},{"path":"key","equals":"LASTHOURS","exclude":true},{"path":"key","equals":"NEXTMINUTES","exclude":true},{"path":"key","equals":"NEXTWEEK","exclude":true},{"path":"key","equals":"NEXTWEEKS","exclude":true},{"path":"key","equals":"NEXTMONTH","exclude":true},{"path":"key","equals":"NEXTMONTHS","exclude":true},{"path":"key","equals":"THISQUARTER","exclude":true},{"path":"key","equals":"LASTQUARTER","exclude":true},{"path":"key","equals":"LASTQUARTERS","exclude":true},{"path":"key","equals":"NEXTQUARTER","exclude":true},{"path":"key","equals":"NEXTQUARTERS","exclude":true},{"path":"key","equals":"QUARTER1","exclude":true},{"path":"key","equals":"QUARTER2","exclude":true},{"path":"key","equals":"QUARTER3","exclude":true},{"path":"key","equals":"QUARTER4","exclude":true}]}}}},"@com.sap.vocabularies.UI.v1.LineItem":{"tableSettings":{"type":"ResponsiveTable","enableExport":true,"selectAll":true,"enablePaste":true,"condensedTableLayout":true},"actions":{"MenuActions":{"text":"{i18n>reject}","menu":["DataFieldForAction::CapexCatalogService.rejectIncomplete","DataFieldForAction::CapexCatalogService.rejectFinal"]},"DataFieldForAction::CapexCatalogService.approve":{"enableOnSelect":"multi"},"DataFieldForAction::CapexCatalogService.copyCapex":{"enableOnSelect":"single","afterExecution":{"enableAutoScroll":true}}}}},"defaultTemplateAnnotationPath":"com.sap.vocabularies.UI.v1.SelectionPresentationVariant#table"}},"controlAggregation":"beginColumnPages","contextPattern":""},"CapexObjectPage":{"type":"Component","id":"CapexObjectPage","name":"sap.fe.templates.ObjectPage","options":{"settings":{"editableHeaderContent":false,"enhanceI18n":"i18n/customI18N.properties","showRelatedApps":true,"contextPath":"/Capex","navigation":{"to_CashFlowYear":{"detail":{"route":"CashFlowYearObjectPage"}}},"controlConfiguration":{"@com.sap.vocabularies.UI.v1.FieldGroup#General2":{"fields":{"DataField::description":{"formatOptions":{"textLinesDisplay":1,"textMaxLines":"2","textLinesEdit":1,"textMaxLength":80,"textMaxCharactersDisplay":50,"textExpandBehaviorDisplay":"Popover"}}}},"@com.sap.vocabularies.UI.v1.FieldGroup#Notes":{"fields":{"DataField::notes":{"formatOptions":{"textLinesDisplay":2,"textMaxLines":"5","textLinesEdit":4,"textMaxLength":1000,"textMaxCharactersDisplay":300,"textExpandBehaviorDisplay":"Popover"}}}},"to_CashFlowYear/@com.sap.vocabularies.UI.v1.LineItem#AnnualCashFlow":{"tableSettings":{"creationMode":{"createAtEnd":true,"name":"InlineCreationRows"},"selectAll":true,"selectionMode":"Multi"}},"to_Objectives/@com.sap.vocabularies.UI.v1.LineItem#Objectives":{"tableSettings":{"selectionMode":"Multi","condensedTableLayout":true,"selectAll":true,"creationMode":{"createAtEnd":true,"name":"Inline"},"quickVariantSelection":{"paths":[{"annotationPath":"com.sap.vocabularies.UI.v1.SelectionVariant#SelectionVariantActive"},{"annotationPath":"com.sap.vocabularies.UI.v1.SelectionVariant#SelectionVariantExpired"},{"annotationPath":"com.sap.vocabularies.UI.v1.SelectionVariant#SelectionVariantAll"}]}}}},"content":{"header":{"actions":{"MenuActions":{"text":"{i18n>reject}","menu":["DataFieldForAction::CapexCatalogService.rejectIncomplete","DataFieldForAction::CapexCatalogService.rejectFinal"]},"DataFieldForAction::CapexCatalogService.copyCapex":{"afterExecution":{"enableAutoScroll":true}}}},"body":{"sections":{"Feed":{"template":"capex.ext.fragment.Feed","position":{"placement":"After","anchor":"Attachments"},"title":"Feed"}}}}}},"controlAggregation":"midColumnPages","contextPattern":"/Capex({key})"},"CashFlowYearObjectPage":{"type":"Component","id":"CashFlowYearObjectPage","name":"sap.fe.templates.ObjectPage","options":{"settings":{"editableHeaderContent":false,"contextPath":"/Capex/to_CashFlowYear"}},"controlAggregation":"endColumnPages","contextPattern":"/Capex({key})/to_CashFlowYear({key2})"}}},"rootView":{"viewName":"sap.fe.templates.RootContainer.view.Fcl","type":"XML","async":true,"id":"appRootView"}},"sap.fiori":{"registrationIds":[],"archeType":"transactional"},"sap.cloud":{"public":true,"service":"hana.app"}}'
});
//# sourceMappingURL=Component-preload.js.map
