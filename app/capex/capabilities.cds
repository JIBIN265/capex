using CapexCatalogService as service from '../../srv/cat-service';

annotate service.Capex with @odata.draft.enabled; //Search-Term: #Draft


// annotate service.ProductMaster with @fiori.draft.enabled; //Search-Term: #Draft
// annotate service.ProductCoreEntity with @sap.searchable: false;
annotate service.Capex with @(Capabilities: {

SearchRestrictions: {
    $Type     : 'Capabilities.SearchRestrictionsType',
    Searchable: true,
},

});

annotate service.Capex with @(
    //Disables the delete option dependent of the fields value
    Capabilities.DeleteRestrictions: {Deletable: to_Status.deletePossible, //Search-Term: #DynamicCRUD
    },
    /* Capabilities.UpdateRestrictions : {
        Updatable : updatePossible, //UpdateRestrictions are ignored in determining if the edit button is visible or not, but it still affects wheather the fields are editable or not
    }, */
    UI.DeleteHidden                : {$edmJson: {$If: [
        {$Eq: [
            {$Path: 'to_Status/deletePossible'},
            false
        ]},
        true,
        false
    ]}},
    UI.UpdateHidden                : {$edmJson: {$If: [
        {$Eq: [
            {$Path: 'to_Status/updatePossible'},
            false
        ]},
        true,
        false
    ]}}, //Search-Term: #DynamicCRUD

/* Capabilities.FilterRestrictions : {
    RequiredProperties : [
        stringProperty //Search-Term: #RequiredFilter
    ],
}, */
);

annotate service.Capex with @(Capabilities: {
    FilterRestrictions: {FilterExpressionRestrictions: [
        {
            Property          : 'createdAt',
            AllowedExpressions: 'SingleRange'
        },
        {
            Property          : 'modifiedAt',
            AllowedExpressions: 'SingleRange'
        },
    ]},

    CountRestrictions : {
        $Type    : 'Capabilities.CountRestrictionsType',
        Countable: true,
    },
});

// @sap.searchable: true annotate service.SapDescription with  @(Capabilities: {SearchRestrictions: {
//     $Type     : 'Capabilities.SearchRestrictionsType',
//     Searchable: true,
// }, });

// annotate service.SapDescription with {
//     description  @Search.defaultSearchElement  @Search.fuzzinessThreshold: 0.7
// };
