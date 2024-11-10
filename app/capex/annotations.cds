using CapexCatalogService as service from '../../srv/cat-service';
using from '../../db/schema';


annotate service.Capex with @(

    UI.FieldGroup #General                : {
        $Type: 'UI.FieldGroupType',
        Data : [

            {
                $Type: 'UI.DataField',
                Value: orderType,
            },
            {
                $Type: 'UI.DataField',
                Value: companyCode,
            },
            {
                $Type: 'UI.DataField',
                Value: site,
            },
            {
                $Type: 'UI.DataField',
                Value: division,
            },
        ],
    },
    UI.FieldGroup #General2               : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: description,
            },
            {
                $Type: 'UI.DataField',
                Value: amount,
            },
            {
                $Type: 'UI.DataField',
                Value: currency_code,
            },
        ],
    },
    UI.FieldGroup #General3               : {
        $Type: 'UI.FieldGroupType',
        Data : [{
            $Type: 'UI.DataField',
            Value: businessReason,
        },

        ],
    },
    UI.FieldGroup #AppropriationCosts     : {
        $Type: 'UI.FieldGroupType',
        Data : [

            {
                $Type: 'UI.DataField',
                Value: millLabor,
            },
            {
                $Type: 'UI.DataField',
                Value: maintenanceLabor,
            },
            {
                $Type: 'UI.DataField',
                Value: operationsLabor,
            },
            {
                $Type: 'UI.DataField',
                Value: outsideContract,
            },
            {
                $Type: 'UI.DataField',
                Value: materialCost,
            },
            {
                $Type: 'UI.DataField',
                Value: hardwareCost,
            },
            {
                $Type: 'UI.DataField',
                Value: softwareCost,
            },
            {
                $Type: 'UI.DataField',
                Value: contingencyCost,
            },
            {
                $Type : 'UI.DataFieldForAnnotation',
                Target: ![@UI.DataPoint#progressIndicator],
            },
        // {
        //     $Type: 'UI.DataField',
        //     Value: totalCost,
        // },

        ],
    },
    UI.FieldGroup #AppropriationSummary   : {
        $Type: 'UI.FieldGroupType',
        Data : [

            {
                $Type: 'UI.DataField',
                Value: appropriationLife,
            },
            {
                $Type: 'UI.DataField',
                Value: profitImprovementPct,
            },
            {
                $Type: 'UI.DataField',
                Value: profitImprovementNPV,
            },
            {
                $Type: 'UI.DataField',
                Value: paybackWithTaxes,
            },
            {
                $Type: 'UI.DataField',
                Value: paybackWithoutTaxes,
            },
            {
                $Type: 'UI.DataField',
                Value: oneTimeExpenses,
            },
            {
                $Type: 'UI.DataField',
                Value: recurringExpenses,
            },
            {
                $Type: 'UI.DataField',
                Value: startupDate,
            },
            {
                $Type: 'UI.DataField',
                Value: downtime,
            },

        ],
    },
    UI.FieldGroup #AppropriationSummary2  : {
        $Type: 'UI.FieldGroupType',
        Data : [


            {
                $Type: 'UI.DataField',
                Value: environmentalImpacts,
            },
            {
                $Type: 'UI.DataField',
                Value: safetyImplications,
            },
            {
                $Type: 'UI.DataField',
                Value: creditPotential,
            },
            {
                $Type: 'UI.DataField',
                Value: insuranceApproval,
            },


        ],
    },
    UI.FieldGroup #AdminData              : {Data: [
        {Value: createdAt},
        {Value: createdBy},
        {Value: modifiedAt},
        {Value: modifiedBy}
    ]},
    UI.FieldGroup #Notes                  : {Data: [{Value: notes}]},
    UI.DataPoint #Status                  : {
        Value               : status,
        Title               : '{i18n>status}',
        Criticality         : to_Status.criticality,
        ![@Common.QuickInfo]: '{i18n>status}',
    },
    UI.DataPoint #orderNumber             : {
        Value               : orderNumber,
        Title               : '{i18n>orderNumber}',
        Visualization       : #Number,
        // Criticality         : to_Status.criticality,
        ![@Common.QuickInfo]: '{i18n>orderNumber}',
    },
    UI.DataPoint #documentID              : {
        Value               : documentID,
        Title               : '{i18n>documentID}',
        Criticality         : to_Status.criticality,
        ![@Common.QuickInfo]: '{i18n>documentID}',
    },
    UI.Facets                             : [
        {
            $Type : 'UI.CollectionFacet',
            ID    : 'GeneralCollectionFacetID',
            Label : '{i18n>general}',
            Facets: [
                {
                    $Type : 'UI.ReferenceFacet',
                    ID    : 'GeneralFacetID',
                    Label : '',
                    Target: '@UI.FieldGroup#General',
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    ID    : 'GeneralFacetID2',
                    Label : '',
                    Target: '@UI.FieldGroup#General2',
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    ID    : 'GeneralFacetID3',
                    Label : '',
                    Target: '@UI.FieldGroup#General3',
                },
            ]
        },
        {
            $Type : 'UI.CollectionFacet',
            ID    : 'AppropriationCollectionFacetID',
            Label : '{i18n>appropriation}',
            Facets: [
                {
                    $Type : 'UI.CollectionFacet',
                    ID    : 'AppropriationCostCollectionFacetID',
                    Label : '{i18n>costs}',
                    Facets: [{
                        $Type : 'UI.ReferenceFacet',
                        ID    : 'AppropriationCostsFacetID',
                        Label : '',
                        Target: '@UI.FieldGroup#AppropriationCosts',
                    },

                    ]
                },
                {
                    $Type : 'UI.CollectionFacet',
                    ID    : 'AnnualCashFlowCollectionFacetID',
                    Label : '{i18n>AnnualCashFlow}',
                    Facets: [{
                        $Type : 'UI.ReferenceFacet',
                        Label : '',
                        ID    : 'AnnualCashFlow',
                        Target: 'to_CashFlowYear/@UI.LineItem#AnnualCashFlow',
                    },

                    ]
                },
                {
                    $Type : 'UI.CollectionFacet',
                    ID    : 'AppropriationSummaryCollectionFacetID',
                    Label : '{i18n>summary}',
                    Facets: [
                        {
                            $Type : 'UI.ReferenceFacet',
                            Target: '@UI.FieldGroup#AppropriationSummary',
                            ID    : 'AppropriationSummaryFacetID',
                            Label : '',

                        },
                        {
                            $Type : 'UI.ReferenceFacet',
                            Target: '@UI.FieldGroup#AppropriationSummary2',
                            ID    : 'AppropriationSummary2FacetID',
                            Label : '',

                        }

                    ]
                },


            ]
        },


        // {
        //     $Type : 'UI.ReferenceFacet',
        //     Label : '{i18n>AnnualCashFlow}',
        //     ID    : 'AnnualCashFlow',
        //     Target: 'to_CashFlowYear/@UI.LineItem#AnnualCashFlow',
        // },
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>Objectives}',
            ID    : 'Objectives',
            Target: 'to_Objectives/@UI.LineItem#Objectives',
        },
        // {
        //     $Type : 'UI.CollectionFacet',
        //     ID    : 'CapexNotesId',
        //     Label : '{i18n>notes}',
        //     Facets: [{
        //         $Type : 'UI.ReferenceFacet',
        //         Target: '@UI.FieldGroup#Notes',
        //         ID    : 'CapexpReferenceNotesId',
        //         Label : ''
        //     }, ],
        // },
        {
            $Type : 'UI.CollectionFacet',
            ID    : 'CapexTestId',
            Label : '{i18n>notes2}',
            Facets: [{
                $Type : 'UI.ReferenceFacet',
                Target: 'to_Notes/@UI.LineItem',
                ID    : 'CapexpReferenceNotesId',
                Label : ''
            }, ],
        }

    ],
    UI.Identification                     : [
        {
            $Type : 'UI.DataFieldForAction',
            Action: 'CapexCatalogService.validate',
            Label : '{i18n>Validate}',
            Inline: true,
        // Determining: true,
        },
        {
            $Type              : 'UI.DataFieldForAction',
            Action             : 'CapexCatalogService.copyCapex',
            Label              : '{i18n>Copy}',
            ![@UI.IsCopyAction]: true,
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action: 'CapexCatalogService.approve',
            Label : '{i18n>Approve}',
        // Criticality: 3
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action: 'CapexCatalogService.rejectIncomplete',
            Label : '{i18n>rejectIncomplete}',
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action: 'CapexCatalogService.rejectFinal',
            Label : '{i18n>rejectFinal}',
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action: 'CapexCatalogService.rejectFinal2',
            Label : '{i18n>rejectFinal}',
        },
    ],
    UI.SelectionFields                    : [
        documentID,
        orderNumber,
        companyCode,
        site,
        status,
        createdBy,
        modifiedBy,
    ],
    UI.SelectionPresentationVariant #table: {
        $Type              : 'UI.SelectionPresentationVariantType',
        PresentationVariant: {
            $Type         : 'UI.PresentationVariantType',
            Visualizations: ['@UI.LineItem', ],
            SortOrder     : [{
                $Type     : 'Common.SortOrderType',
                Property  : documentID,
                Descending: false,
            }, ],
        },
        SelectionVariant   : {
            $Type        : 'UI.SelectionVariantType',
            SelectOptions: [],
        },
    },
);

annotate service.Capex with @(UI.DataPoint #progressIndicator: {
    Value        : totalCost,
    TargetValue  : amount,
    Visualization: #Progress,
    // Title        : '{i18n>progressIndicator}',
    Criticality  : 3,
}, );

annotate service.CashFlowYear with @(UI.LineItem #AnnualCashFlow: [
    {
        $Type: 'UI.DataField',
        Value: year,
    },
    {
        $Type: 'UI.DataField',
        Value: cashFlowQOne,
    },
    {
        $Type: 'UI.DataField',
        Value: cashFlowQTwo,
    },
    {
        $Type: 'UI.DataField',
        Value: cashFlowQThree,
    },
    {
        $Type: 'UI.DataField',
        Value: cashFlowQFour,

    },
    {
        $Type: 'UI.DataField',
        Value: total,
    },
]);

annotate service.Comments with @(UI.LineItem: [
    {
        $Type: 'UI.DataField',
        Value: icon,
    },
    {
        $Type: 'UI.DataField',
        Value: info,
    },
    {
        $Type: 'UI.DataField',
        Value: text,
    },

]);

annotate service.Notes with @(UI.LineItem: [
    {
        $Type: 'UI.DataField',
        Value: recipient,
    },
    {
        $Type: 'UI.DataField',
        Value: text,
    },
    {
        //Action as a column of the table
        //Icons only supported for inline actions / intend based navigation
        $Type  : 'UI.DataFieldForAction',
        Action : 'service.changeProgress',
        Label  : 'Send Email',
        IconUrl: 'sap-icon://command-line-interfaces',
        Inline : true,
    },
    {
        $Type: 'UI.DataField',
        Value: createdBy,
    },
    {
        $Type: 'UI.DataField',
        Value: createdAt,
    },
]);

annotate service.Objectives with @(UI.LineItem #Objectives: [
    {
        $Type                  : 'UI.DataField',
        Value                  : objective,
        ![@Common.FieldControl]: {$edmJson: {$If: [
            {$Eq: [
                {$Path: 'filled'},
                true
            ]},
            1,
            3
        ]}}

    },
    {
        $Type                  : 'UI.DataField',
        Value                  : objectiveTarget,
        ![@Common.FieldControl]: {$edmJson: {$If: [
            {$Eq: [
                {$Path: 'filled'},
                true
            ]},
            1,
            3
        ]}},
        ![@HTML5.CssDefaults]  : {width: '15%'}

    },
    // {
    //     $Type: 'UI.DataField',
    //     Value: unit_code,
    //     Label: 'unit_code',
    // },
    {
        $Type: 'UI.DataField',
        Value: impact,

    },
    {
        $Type: 'UI.DataField',
        Value: amount,

    },
]);

annotate service.Capex with @(UI.HeaderInfo: {
    TypeName      : '{i18n>CapexTypeName}',
    TypeNamePlural: '{i18n>CapexTypeNamePlural}',
    Title         : {
        $Type: 'UI.DataField',
        Value: documentID,
    // Criticality: #VeryPositive,
    },
    Description   : {
        $Type: 'UI.DataField',
        Value: description,

    },
    ImageUrl      : 'https://www.kruger.com/wp-content/uploads/2020/03/logo-kruger-300x201.gif',
    TypeImageUrl  : 'sap-icon://sales-order',
});


// /**
//     UI.HeaderFacets
//     Search-Term: #GeneralFacets
//  */
annotate service.Capex with @(UI.HeaderFacets: [
    {
        $Type : 'UI.CollectionFacet',
        ID    : 'HeaderCollectionFacetId',
        Label : '{i18n>adminData}',
        Facets: [{
            $Type : 'UI.ReferenceFacet',
            Target: '@UI.FieldGroup#AdminData',
            ID    : 'AdminDataID',
            Label : '{i18n>adminData}',
        }]
    },

    {

        $Type : 'UI.ReferenceFacet',
        Target: '@UI.DataPoint#Status',
        ID    : 'statusDataPointID',
        Label : '{i18n>status}',

    },
    {
        $Type : 'UI.ReferenceFacet',
        Target: '@UI.DataPoint#orderNumber',
        ID    : 'OrderNumberDataPointID',
        Label : '{i18n>orderNumber}',

    },
    // {
    //     $Type : 'UI.CollectionFacet',
    //     Facets: [

    //     {
    //         $Type : 'UI.ReferenceFacet',
    //         Target: '@UI.Chart#bulletChart',
    //     }, ],
    // },
    {
        $Type : 'UI.CollectionFacet',
        ID    : 'CollectionFacet1',
        Facets: [
                 // {
                 //     //Search-Term: #DataPoint
                 //     $Type : 'UI.ReferenceFacet',
                 //     Target: '@UI.DataPoint#ratingIndicator',
                 // },
                {
            //Search-Term: #DataPoint
            $Type : 'UI.ReferenceFacet',
            Label : 'Approval Status',
            Target: '@UI.DataPoint#progressIndicator2',
        },

        ],
    },
// {
//     $Type : 'UI.CollectionFacet',
//     ID    : 'CollectionFacet2',
//     Facets: [

//     {
//         $Type : 'UI.ReferenceFacet',
//         Target: '@UI.Chart#radialChart',
//     }, ],
// },


// {
//     //Search-Term: #OPMicroChart
//     $Type : 'UI.ReferenceFacet',
//     Target: '@UI.Chart#harveyChart',
// },
//   {
//         $Type : 'UI.CollectionFacet',
//         ID    : 'HeaderCollection3FacetId',
//         Label : '{i18n>status}',
//         Facets: [{
//             $Type : 'UI.ReferenceFacet',
//             Target: '@UI.DataPoint#Status',
//             ID    : 'statusDataPointID',
//             Label : '{i18n>status}',
//         }]
//     },
//     {
//         $Type : 'UI.CollectionFacet',
//         ID    : 'HeaderCollection2FacetId',
//         Label : '{i18n>adminData}',
//         Facets: [{
//             $Type : 'UI.ReferenceFacet',
//             Target: '@UI.DataPoint#orderNumber',
//             ID    : 'OrderNumberDataPointID',
//             Label : '{i18n>orderNumber}',
//         }]
//     },
]);

annotate service.Objectives with @(

    UI.SelectionVariant #SelectionVariantActive : {
        ID           : 'SelectionVariantActiveID',
        Text         : 'Sustainability2030',
        SelectOptions: [{
            PropertyName: filled,
            Ranges      : [{
                Sign  : #I,
                Option: #EQ,
                Low   : true,
            }, ],
        }, ],
    },
    UI.SelectionVariant #SelectionVariantExpired: {
        ID           : 'SelectionVariantExpiredID',
        Text         : 'Other Objectives',
        SelectOptions: [{
            PropertyName: filled,
            Ranges      : [{
                Sign  : #I,
                Option: #EQ,
                Low   : false,
            }, ],
        }, ],
    },
    UI.SelectionVariant #SelectionVariantAll    : {
        Text         : 'All Objectives',
        ID           : 'SelectionVariantAllID',
        SelectOptions: [{PropertyName: filled}]
    },
);

annotate service.Capex with @(UI.LineItem: {
    // #LineItemHighlight
    ![@UI.Criticality]: to_Status.criticality, // Annotation, so that the row has a criticality
    $value            : [
        {
            $Type                : 'UI.DataField',
            Value                : documentID,
            ![@UI.Importance]    : #High,
            ![@HTML5.CssDefaults]: {width: '25%'}
        },
        {
            $Type                : 'UI.DataField',
            Value                : orderNumber,
            ![@UI.Importance]    : #High,
            ![@HTML5.CssDefaults]: {width: '25%'}
        },
        // {
        //     //Search-Term: #MicroChart
        //     $Type : 'UI.DataFieldForAnnotation',
        //     Target: '@UI.Chart#radialChart',
        //     Label : '{i18n>radialChart}',
        // },
        // {
        //     //Search-Term: #ProgressIndicator
        //     $Type            : 'UI.DataFieldForAnnotation', //Added progress indicator to table
        //     Label            : '{i18n>progressIndicator}',
        //     Target           : '@UI.DataPoint#progressIndicator2',
        //     ![@UI.Importance]: #Low,
        // },
        {
            $Type            : 'UI.DataFieldForAnnotation',
            Label            : '{i18n>progressIndicator}',
            Target           : '@UI.DataPoint#progressIndicator',
            ![@UI.Importance]: #Low,
        },
        // {
        //     //Search-Term: #RatingIndicator
        //     $Type            : 'UI.DataFieldForAnnotation', //Added rating indicator to table
        //     Label            : '{i18n>ratingIndicator}',
        //     Target           : '@UI.DataPoint#ratingIndicator',
        //     ![@UI.Importance]: #Low,
        // },
        // {
        //     //Search-Term: #MicroChart
        //     $Type            : 'UI.DataFieldForAnnotation',
        //     Label            : '{i18n>bulletChart}',
        //     Target           : '@UI.Chart#bulletChart',
        //     ![@UI.Importance]: #High,
        // },
        {
            $Type: 'UI.DataField',
            Value: orderType,
        },
        {
            $Type: 'UI.DataField',
            Value: companyCode,
        },
        {
            $Type: 'UI.DataField',
            Value: site,
        },
        {
            $Type: 'UI.DataField',
            Value: division,
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action: 'CapexCatalogService.approve',
            Label : '{i18n>Approve}',
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action: 'CapexCatalogService.rejectIncomplete',
            Label : '{i18n>rejectIncomplete}',
        },
        // {
        //     $Type : 'UI.DataFieldForAction',
        //     Action: 'CapexCatalogService.rejectFinal',
        //     Label : '{i18n>rejectFinal}',
        // },
        {
            $Type : 'UI.DataFieldForAction',
            Action: 'CapexCatalogService.rejectFinal2',
            Label : '{i18n>rejectFinal}',
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action: 'CapexCatalogService.validate',
            Label : '{i18n>Validate}',
        },
        {
            $Type              : 'UI.DataFieldForAction',
            Action             : 'CapexCatalogService.copyCapex',
            Label              : '{i18n>Copy}',
            ![@UI.IsCopyAction]: true,
        },
        {
            $Type: 'UI.DataField',
            Value: businessReason,
        },
        {
            $Type: 'UI.DataField',
            Value: amount,
        },
        {
            $Type                    : 'UI.DataField',
            Value                    : status,
            Criticality              : to_Status.criticality, //Supported values 0,1,2,3,5
            CriticalityRepresentation: #WithIcon,
        },
        {
            $Type                : 'UI.DataField',
            Value                : createdBy,
            ![@HTML5.CssDefaults]: {width: '20%'}
        },
        {
            $Type                : 'UI.DataField',
            Value                : createdAt,
            ![@HTML5.CssDefaults]: {width: '20%'}
        },
    ]
},

);

annotate service.Capex with @(
    UI.SelectionVariant #SelectionVariantAll       : {
        Text         : 'All Orders',
        ID           : 'SelectionVariantAll',
        SelectOptions: [{PropertyName: status}]
    },
    UI.SelectionVariant #SelectionVariantApproved  : {
        ID           : 'SelectionVariantApproved',
        Text         : 'Approved',
        SelectOptions: [{
            PropertyName: status,
            Ranges      : [{
                Sign  : #I,
                Option: #EQ,
                Low   : 'E0009',
            }, ],
        }, ],
    },
    UI.SelectionVariant #SelectionVariantFinal     : {
        ID           : 'SelectionVariantFinal',
        Text         : 'Rejected Final',
        SelectOptions: [{
            PropertyName: status,
            Ranges      : [{
                Sign  : #I,
                Option: #EQ,
                Low   : 'E0010',
            }, ],
        }, ],
    },
    UI.SelectionVariant #SelectionVariantIncomplete: {
        ID           : 'SelectionVariantIncomplete',
        Text         : 'Rejected Incomplete',
        SelectOptions: [{
            PropertyName: status,
            Ranges      : [{
                Sign  : #I,
                Option: #EQ,
                Low   : 'E0011',
            }, ],
        }, ],
    },
);


// annotate service.Capex with @(UI.SelectionPresentationVariant #SelectionPresentationVariant: {
//     Text               : '{i18n>SelectionPresentationVariant}',
//     SelectionVariant   : {
//         $Type        : 'UI.SelectionVariantType',
//         SelectOptions: [{
//             PropertyName: createdBy,
//             Ranges      : [{
//                 Sign  : #I,
//                 Option: #EQ,
//                 Low   : createdBy
//             }, ],
//         }, ],
//     },
//     PresentationVariant: {
//         SortOrder     : [{
//             Property  : documentID,
//             Descending: false,
//         }, ],
//         Visualizations: ['@UI.LineItem#simplified', ],
//     },
// }, );
// annotate service.Capex with @(
//     UI.DataPoint #progressIndicator : {
//         Value : 3,
//         TargetValue : 100,
//         Visualization : #Progress,
//         Title : '{i18n>progressIndicator}',
//         //Criticality: criticality,
//     },

// );

// annotate service.Capex with @(

//     UI.DataPoint #radialChart : {
//         Value : 2,
//         TargetValue : 5,
//         Criticality : 2,
//     },

// );
annotate service.Capex with @(
    UI.DataPoint #progressIndicator2: {
        //Search-Term: #ProgressIndicator
        Value        : integerValue,
        TargetValue  : 5,
        Visualization: #Progress,
        Title        : '{i18n>progressIndicator}',
    //Criticality   : criticality, //> optional criticality
    },
    UI.DataPoint #ratingIndicator   : {
        //Search-Term: #RatingIndicator
        Value               : starsValue, //Amount of stars, which are filled. Values between x.25 and x.74 are displaced as a half star.
        TargetValue         : 4, //Max amount of stars
        Visualization       : #Rating,
        Title               : '{i18n>ratingIndicator}',
        ![@Common.QuickInfo]: 'Tooltip via Common.QuickInfo',
    },
    UI.DataPoint #bulletChart       : {
        //Search-Terms: #MicroChart, #microChartBullet
        Value        : integerValue, //horizontal bar in relation to the goal line
        TargetValue  : targetValue, //visual goal line in the UI
        ForecastValue: forecastValue, //horizontal bar behind the value bar with, slightly larger with higher transparency
        Criticality  : to_Status.criticality, //> optional criticality
        MinimumValue : 0, //Minimal value, needed for output rendering
    },
    UI.DataPoint #radialChart       : {
        //Search-Terms: #MicroChart, #microChartRadial
        Value      : integerValue,
        TargetValue: targetValue, //The relation between the value and the target value will be displayed as a percentage
        Criticality: to_Status.criticality, //> optional criticality
    },
    UI.DataPoint #harveyChart       : {
        //Search-Term: #microChartHarvey
        Value       : fieldWithPrice,
        MaximumValue: fieldWithUoM, //MaximumValue needs to be of type Decimal
        Criticality : to_Status.criticality
    },
    UI.DataPoint #fieldWithPrice    : {
        //Search-Term: #KeyValue
        Value: fieldWithPrice,
        Title: '{i18n>fieldWithPrice}',
    },
    UI.DataPoint #fieldWithTooltip  : {
        //Search-Term: #ToolTip
        Value               : dimensions,
        ![@Common.QuickInfo]: '{i18n>Tooltip}', //Can also be a dynamic property path
    },
);

annotate service.Capex with @Aggregation.ApplySupported: {
    Transformations       : [
        'aggregate',
        'topcount',
        'bottomcount',
        'identity',
        'concat',
        'groupby',
        'filter',
        'expand',
        'search'
    ],
    Rollup                : #None,
    PropertyRestrictions  : true,
    GroupableProperties   : [
        orderNumber,
        status,
        site,
        orderType,
        division
    ],
    AggregatableProperties: [{Property: documentID, }],
};

annotate service.Capex with @(
    UI.Chart #bulletChart: {
        //Search-Terms: #MicroChart, #microChartBullet
        Title            : '{i18n>bulletChart}',
        Description      : '{i18n>ThisIsAMicroChart}',
        ChartType        : #Bullet,
        Dimensions       : [dimensions],
        Measures         : [integerValue],
        MeasureAttributes: [{
            $Type    : 'UI.ChartMeasureAttributeType',
            Measure  : integerValue,
            Role     : #Axis1,
            DataPoint: '@UI.DataPoint#bulletChart',
        }, ],
    },
    UI.Chart #radialChart: {
        //Search-Terms: #MicroChart, #microChartRadial
        Title            : '{i18n>radialChart}',
        Description      : '{i18n>ThisIsAMicroChart}',
        ChartType        : #Donut,
        Measures         : [integerValue],
        MeasureAttributes: [{
            $Type    : 'UI.ChartMeasureAttributeType',
            Measure  : integerValue,
            Role     : #Axis1,
            DataPoint: '@UI.DataPoint#radialChart',
        }, ],
    },
    UI.Chart #harveyChart: {
        //Search-Term: #microChartHarvey
        Title            : '{i18n>harveyChart}',
        Description      : '{i18n>ThisIsAMicroChart}',
        ChartType        : #Pie,
        Measures         : [fieldWithPrice],
        MeasureAttributes: [{
            $Type    : 'UI.ChartMeasureAttributeType',
            Measure  : fieldWithPrice,
            Role     : #Axis1,
            DataPoint: '@UI.DataPoint#harveyChart',
        }]
    },
);
