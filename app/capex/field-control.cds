using CapexCatalogService as service from '../../srv/cat-service';


//
// annotations that control the behavior of fields and actions
// Bold Keys and for navigation
annotate service.Capex with @(Common.SemanticKey: [documentID], );


annotate service.Capex {
    // ID                     @UI.Hidden               @readonly  @mandatory  @UI.ExcludeFromNavigationContext;
    ID          @readonly                @mandatory  @UI.ExcludeFromNavigationContext; //don't hide display text only

    status      @Core.Computed;
    totalCost   @Core.Computed @Measures.ISOCurrency:currency_code;

    // description_custom     @Core.Computed           @UI.HiddenFilter: true  @UI.ExcludeFromNavigationContext;
    description @UI.MultiLineText;
    createdAt   @UI.HiddenFilter: false  @UI.ExcludeFromNavigationContext;
    createdBy   @UI.HiddenFilter: false  @UI.ExcludeFromNavigationContext;
    modifiedAt  @UI.HiddenFilter: false  @UI.ExcludeFromNavigationContext;
    modifiedBy  @UI.HiddenFilter: false  @UI.ExcludeFromNavigationContext;


};

annotate service.Objectives {
    // ID                     @UI.Hidden               @readonly  @mandatory  @UI.ExcludeFromNavigationContext;
    ID              @readonly                @mandatory  @UI.ExcludeFromNavigationContext; //don't hide display text only

    objectiveTarget @Measures.Unit  : '%';

    // description_custom     @Core.Computed           @UI.HiddenFilter: true  @UI.ExcludeFromNavigationContext;

    createdAt       @UI.HiddenFilter: false  @UI.ExcludeFromNavigationContext;
    createdBy       @UI.HiddenFilter: false  @UI.ExcludeFromNavigationContext;
    modifiedAt      @UI.HiddenFilter: false  @UI.ExcludeFromNavigationContext;
    modifiedBy      @UI.HiddenFilter: false  @UI.ExcludeFromNavigationContext;


};

annotate service.CashFlowYear {
    // ID                     @UI.Hidden               @readonly  @mandatory  @UI.ExcludeFromNavigationContext;
    ID          @readonly                @mandatory  @UI.ExcludeFromNavigationContext; //don't hide display text only


    total       @Core.Computed;
    // description_custom     @Core.Computed           @UI.HiddenFilter: true  @UI.ExcludeFromNavigationContext;

    createdAt   @UI.HiddenFilter: false  @UI.ExcludeFromNavigationContext;
    createdBy   @UI.HiddenFilter: false  @UI.ExcludeFromNavigationContext;
    modifiedAt  @UI.HiddenFilter: false  @UI.ExcludeFromNavigationContext;
    modifiedBy  @UI.HiddenFilter: false  @UI.ExcludeFromNavigationContext;


};


