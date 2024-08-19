namespace zcapex;

using {
  Country,
  sap.common.CodeList as CodeList,
  cuid,
  User,
  Language,
  managed,
  Currency,
} from '@sap/cds/common';
using {
  sap.common.Region,
  sap.common.UnitOfMeasure,
  sap.common.Criticality
} from '../db/common.cds';
using {Attachments} from '@cap-js/attachments';

type messageImport {
  @description: 'Notes'
  notes : String(1000) default '';
}

type statusCount {
  inProgressCount       : Integer default 0;
  Count                 : Integer default 0;
  rejectIncompleteCount : Integer default 0;
  draftCount            : Integer default 0;
  rejectFinalCount      : Integer default 0;
  approvedCount         : Integer default 0;
}


aspect DocumentId {
  @description: 'Unique Document ID'
  documentID : Integer default 0;
}

entity Division : CodeList {
  key code : String(10);
}

entity BusinessReason : CodeList {
  key code : String(20);
}

entity CompanyCode : CodeList {
  key code : String(10);
}

entity Site : CodeList {
  key code : String(10);
}

aspect CapexMain {

  @description: 'Order Number'
  orderNumber          : String(12); // AUFNR

  @description: 'Order Type'
  orderType            : String(4); // AUART

  @description: 'Company Code'
  companyCode          : String(10); // AUART

  @description: 'Company Code Association'
  to_CompanyCode       : Association to one CompanyCode
                           on to_CompanyCode.code = companyCode;

  @description: 'Site'
  site                 : String(10); // AUART

  @description: 'Site Association'
  to_Site              : Association to one Site
                           on to_Site.code = site;

  @description: 'Division'
  division             : String(10); // AUART

  @description: 'Division Code Association'
  to_Division          : Association to one Division
                           on to_Division.code = division;

  @description: 'Dexcription'
  description          : String(80); // KTEXT

  @description: 'Business Reasons'
  businessReason       : String(20); // ZZBUSREASN

  @description: 'Business Reasons Association'
  to_BusinessReason    : Association to one BusinessReason
                           on to_BusinessReason.code = businessReason;

  @description: 'Amount'
  amount               : Decimal(11, 2) default 0; // ZZPROFIMPR

  @description: 'Currency'
  currency             : Currency;

  @description: 'Strategic'
  strategic            : Boolean default false; // ZZSTRATEGI

  @description: 'Business Sustaining'
  businessSustaining   : Boolean default false; // ZZBSUSTAIN

  @description: 'Mandatory'
  mandatory            : Boolean default false; // ZZMANDATOR

  @description: 'Profit Improvement'
  profitImprovement    : Boolean default false; // ZZPROFIMPR

  @description: 'Mill Labor'
  millLabor            : Decimal(11, 2) default 0; // ZZMILLABOR

  @description: 'Maintenance Labor'
  maintenanceLabor     : Decimal(11, 2) default 0; // ZZMNTLABOR

  @description: 'Operations Labor'
  operationsLabor      : Decimal(11, 2) default 0; // ZZOPSLABOR

  @description: 'Outside Contract'
  outsideContract      : Decimal(11, 2) default 0; // ZZOUTCONTR

  @description: 'Material Cost'
  materialCost         : Decimal(11, 2) default 0; // ZZMATERIAL

  @description: 'Hardware Cost'
  hardwareCost         : Decimal(11, 2) default 0; // ZZ-HARDWARE

  @description: 'Software Cost'
  softwareCost         : Decimal(11, 2) default 0; // ZZSOFTWARE

  @description: 'Contingency Cost'
  contingencyCost      : Decimal(11, 2) default 0; // ZZCONTINGE

  @description: 'Total Cost'
  totalCost            : Decimal(11, 2) default 0; // Total

  @description: 'Appropriation Life'
  appropriationLife    : Integer default 0 @odata.Type: 'Edm.String'; // ZZLIFE

  @description: 'Profit Improvement Percentage Cost'
  profitImprovementPct : Decimal(5, 2) default 0; // ZZPROFIMPP

  @description: 'Profit Improvement N.P.V. ($)'
  profitImprovementNPV : Decimal(11, 2) default 0; // ZZPROFIMPV

  @description: 'Payback Period with taxes'
  paybackWithTaxes     : Decimal(3, 1) default 0; // ZZPAYBCKWT

  @description: 'Payback Period no taxes'
  paybackWithoutTaxes  : Decimal(3, 1) default 0; // ZZPAYBCKNT

  @description: 'Expenses One Time'
  oneTimeExpenses      : Decimal(11, 2) default 0; // ZZEXPENSES

  @description: 'Expenses Recurring per Year'
  recurringExpenses    : Decimal(11, 2) default 0; // ZZEXPENSE2

  @description: 'Start up date from appropriation'
  startupDate          : Date; // ZZSTARTDAT

  @description: 'Down Time in days'
  downtime             : Integer default 0 @odata.Type: 'Edm.String'; // ZZDOWNTIME

  @description: 'Environmental implications'
  environmentalImpacts : Boolean default false; // ZZENVIMPLI

  @description: 'Safety Implications'
  safetyImplications   : Boolean default false; // ZZSAFIMPLI

  @description: 'SR & ED Credit Potential'
  creditPotential      : Boolean default false; // ZZCRDPOTEN

  @description: 'Insurance Approval Required'
  insuranceApproval    : Boolean default false; // ZZINSAPPRV

  @description: 'Status'
  status               : String(1);

  @description: 'Status Value Association'
  to_Status            : Association to one StatusValues
                           on to_Status.code = status;
}

entity StatusValues {
  key code           : String(1);
      value          : String(20);
      criticality    : Integer default 0;
      deletePossible : Boolean default false;
      insertPossible : Boolean default false;
      updatePossible : Boolean default false;
}

entity CapexEntity : cuid, managed, CapexMain, DocumentId, messageImport {

  @description: 'Cash Flow Year Composition'
  to_CashFlowYear     : Composition of many CashFlowYear;

  @description: 'Objectives Composition'
  to_Objectives       : Composition of many Objectives;

  @description: 'Rejection Reasons Composition'
  to_RejectionReasons : Composition of many RejectionReasons;

  @description: 'Comments Composition'
  to_Comments         : Composition of many Comments;

  @description: 'Attachments Composition'
  to_Attachments      : Composition of many Attachments;
};

aspect Comments : cuid, managed {

  icon : String default '![sap-icon://account]';
  info : String;
  text : String;

}

aspect Objectives : cuid, managed {

  @description: 'Objective'
  objective       : String(50); // ZZOTOBJEC3

  @description: 'Target'
  // @UoM.Unit   : '%'
  objectiveTarget : Decimal(5, 2) default 0; // ZZOTTARGE3

  @description: 'Filled'
  filled          : Boolean default false;

  @description: 'Impact'
  impact          : Boolean default false; // ZZOTIMPAC3

  @description: 'Amount'
  amount          : String(50); // ZZOTAMOUN3
}

aspect CashFlowYear : cuid, managed {

  @description: 'Year'
  year           : Integer default 0; // ZZYEAR4

  @description: 'Quarter One'
  cashFlowQOne   : Decimal(11, 2) default 0; // ZZ4CASHFLQ1

  @description: 'Cash Flow Quarter Two'
  cashFlowQTwo   : Decimal(11, 2) default 0; // ZZ4CASHFLQ2

  @description: 'Cash Flow Quarter Three'
  cashFlowQThree : Decimal(11, 2) default 0; // ZZ4CASHFLQ3

  @description: 'Cash Flow Quarter Four'
  cashFlowQFour  : Decimal(11, 2) default 0; // ZZ4CASHFLQ4

  @description: 'Total'
  total          : Decimal(11, 2) default 0; // ZZ4CASHFLQ1

}

aspect RejectionReasons : cuid, managed {

  @description: 'Reason for Rejection'
  reason : String(1000); // ZZ4CASHFLQ1


}

entity Sustainability2030 : cuid, managed {

  @description: 'Objective'
  objective       : String(50); // ZZOTOBJEC3

  @description: 'Target'
  // @UoM.Unit   : '%'
  objectiveTarget : Decimal(5, 2) default 0; // ZZOTTARGE3

  @description: 'Filled'
  filled          : Boolean default false;

  @description: 'Impact'
  impact          : Boolean default false; // ZZOTIMPAC3

  @description: 'Amount'
  amount          : String(50); // ZZOTAMOUN3
}
