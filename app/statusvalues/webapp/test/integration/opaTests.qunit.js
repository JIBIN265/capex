sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'statusvalues/test/integration/FirstJourney',
		'statusvalues/test/integration/pages/StatusValuesList',
		'statusvalues/test/integration/pages/StatusValuesObjectPage'
    ],
    function(JourneyRunner, opaJourney, StatusValuesList, StatusValuesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('statusvalues') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheStatusValuesList: StatusValuesList,
					onTheStatusValuesObjectPage: StatusValuesObjectPage
                }
            },
            opaJourney.run
        );
    }
);