sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'capex/test/integration/FirstJourney',
		'capex/test/integration/pages/CapexList',
		'capex/test/integration/pages/CapexObjectPage',
		'capex/test/integration/pages/CashFlowYearObjectPage'
    ],
    function(JourneyRunner, opaJourney, CapexList, CapexObjectPage, CashFlowYearObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('capex') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCapexList: CapexList,
					onTheCapexObjectPage: CapexObjectPage,
					onTheCashFlowYearObjectPage: CashFlowYearObjectPage
                }
            },
            opaJourney.run
        );
    }
);