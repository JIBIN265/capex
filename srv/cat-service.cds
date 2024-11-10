using zcapex as persistence from '../db/schema';
using {sap.common as common} from '../db/common';
using {ZODATA_INTERNAL_ORDER_SRV as external} from './external/ZODATA_INTERNAL_ORDER_SRV';

service CapexCatalogService @(requires: 'authenticated-user') {

    entity Cot001Set             as projection on external.Cot001Set;
    entity OrderTypeF4Set        as projection on external.OrderTypeF4Set;
    entity BusinessReasonF4Set   as projection on external.BusinessReasonF4Set;
    entity DivisionF4Set         as projection on external.DivisionF4Set;
    entity SiteF4Set             as projection on external.SiteF4Set;
    entity MasterDataSet         as projection on external.MasterDataSet;
    entity CurrencyF4Set         as projection on external.CurrencyF4Set;
    entity ChangeStatusSet       as projection on external.ChangeStatusSet;

    type inText : {
        comment : String;
    };

    entity Capex                 as projection on persistence.CapexEntity
        actions {
            // @(
            //     cds.odata.bindingparameter.name: '_it',
            //     Common.SideEffects             : {TargetProperties: ['_it']}
            // )
            action copyCapex(in : $self)               returns Capex;
            action validate()                          returns Capex;
            @(Common.IsActionCritical: true)
            @(
                cds.odata.bindingparameter.name: '_it',
                Common.SideEffects             : {TargetEntities: ['$Return']}
            )
            action approve(in : $self)                 returns Capex;
            @(
                cds.odata.bindingparameter.name: '_it',
                Common.SideEffects             : {TargetEntities: ['$Return']}
            )
            action rejectFinal(in : $self)             returns Capex;
            @(
                cds.odata.bindingparameter.name: '_it',
                Common.SideEffects             : {TargetEntities: ['$Return']}
            )
            action rejectFinal2(text : inText:comment) returns Capex;
            @(
                cds.odata.bindingparameter.name: '_it',
                Common.SideEffects             : {TargetEntities: ['$Return']}
            )
            action rejectIncomplete(in : $self)        returns Capex;

            @(
                cds.odata.bindingparameter.name: '_it',
                Common.SideEffects             : {TargetEntities: ['_it']}
            )
            action workflowApprove()                   returns {
                status : String(10);
                orderNumber : String(12);
            };

            action workflowIncomplete()                returns {
                status : String(10);
                orderNumber : String(12);
            };

            action workflowFinal()                     returns {
                status : String(10);
                orderNumber : String(12);
            }
        };

    entity Comments              as projection on persistence.CapexEntity.to_Comments
        actions {

            action changeProgress(in : $self) returns Comments
        };

    entity CashFlowYear          as projection on persistence.CapexEntity.to_CashFlowYear;
    entity Objectives            as projection on persistence.CapexEntity.to_Objectives;
    entity RejectionReasons      as projection on persistence.CapexEntity.to_RejectionReasons;
    entity Attachments           as projection on persistence.CapexEntity.attachments;
    entity Notes                 as projection on persistence.CapexEntity.to_Notes;

    @readonly
    entity CompanyCode           as projection on persistence.CompanyCode;

    @readonly
    entity Site                  as projection on persistence.Site;

    @readonly
    entity Division              as projection on persistence.Division;

    @readonly
    entity BusinessReason        as projection on persistence.BusinessReason;

    entity StatusValues          as projection on persistence.StatusValues;

    @readonly
    entity Countries             as projection on common.Countries;

    @readonly
    entity Currencies            as projection on common.Currencies;


    @readonly
    entity UnitOfMeasureCodeList as projection on common.UnitOfMeasureCodeList;

    entity Sustainability2030    as projection on persistence.Sustainability2030;
    function getMessages(Key : String(32)) returns persistence.messageImport;
    function getStatusCount()              returns persistence.statusCount;

};
