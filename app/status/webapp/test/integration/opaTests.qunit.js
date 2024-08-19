sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'status/test/integration/FirstJourney',
		'status/test/integration/pages/StatusValuesList',
		'status/test/integration/pages/StatusValuesObjectPage'
    ],
    function(JourneyRunner, opaJourney, StatusValuesList, StatusValuesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('status') + '/index.html'
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