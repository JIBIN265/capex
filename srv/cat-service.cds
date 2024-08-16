using zcapex as persistence from '../db/schema';
using {sap.common as common} from '../db/common';
using {ZODATA_INTERNAL_ORDER_SRV as external} from './external/ZODATA_INTERNAL_ORDER_SRV';

service CapexCatalogService @(requires: 'authenticated-user') {

    entity Cot001Set             as projection on external.Cot001Set;
    entity OrderTypeF4Set        as projection on external.OrderTypeF4Set;
    entity BusinessReasonF4Set   as projection on external.BusinessReasonF4Set;
    entity DivisionF4Set         as projection on external.DivisionF4Set;
    entity SiteF4Set             as projection on external.SiteF4Set;

    entity Capex                 as projection on persistence.CapexEntity
        actions {
            action validate() returns Capex;
            action approve()  returns Capex;
            action reject()   returns Capex;
            action escalate() returns Capex;
        };


    entity CashFlowYear          as projection on persistence.CapexEntity.to_CashFlowYear;
    entity Objectives            as projection on persistence.CapexEntity.to_Objectives;
    entity RejectionReasons      as projection on persistence.CapexEntity.to_RejectionReasons;

    @readonly
    entity CompanyCode           as projection on persistence.CompanyCode;

    @readonly
    entity Site                  as projection on persistence.Site;

    @readonly
    entity Division              as projection on persistence.Division;

    @readonly
    entity BusinessReason        as projection on persistence.BusinessReason;

    @readonly
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
