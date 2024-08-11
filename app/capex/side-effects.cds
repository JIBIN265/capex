using CapexCatalogService as service from '../../srv/cat-service';


annotate service.CashFlowYear @(Common: {SideEffects #pr_enabledChanged: {
    SourceProperties: [
        cashFlowQFour,
        cashFlowQOne,
        cashFlowQThree,
        cashFlowQTwo
    ],
    TargetProperties: ['total']
}});


annotate service.CashFlowYear @(Common: {SideEffects #pr_enabledChanged3: {
    SourceProperties: [
        cashFlowQFour,
        cashFlowQOne,
        cashFlowQThree,
        cashFlowQTwo
    ],
    TargetEntities  : ['']
}});
