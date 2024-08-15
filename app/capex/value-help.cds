using CapexCatalogService as service from '../../srv/cat-service';

annotate service.Capex with {
    status      @(Common: {
        ValueListWithFixedValues: true,
        Label                   : 'SAP Status',
        ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'StatusValues',
            Parameters    : [
                {
                    $Type            : 'Common.ValueListParameterInOut',
                    LocalDataProperty: status,
                    ValueListProperty: 'code'
                },
                {
                    $Type            : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'value'
                }
            ]
        },
    });

    companyCode @(Common: {
        ValueList: {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'Cot001Set',
            Label : 'Choose a company Code',
            Parameters    : [
                {
                    $Type            : 'Common.ValueListParameterInOut',
                    LocalDataProperty: companyCode,
                    ValueListProperty: 'Bukrs',
                },
                {
                    $Type            : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'Butxt'
                },
                {
                    $Type            : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'Waers'
                }
            ]
        },
    });
};
