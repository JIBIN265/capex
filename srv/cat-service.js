const cds = require("@sap/cds");
const { SELECT, INSERT, UPDATE } = cds.ql;
const SequenceHelper = require("./lib/SequenceHelper");
const defaults = require("dotenv").config({
    path: "./srv/defaults/sap-defaults.env",
});
class CapexCatalogService extends cds.ApplicationService {
    async init() {
        const {
            Capex,
            CashFlowYear,
            Objectives,
            RejectionReasons,
            CompanyCode,
            Site,
            Division,
            BusinessReason,
            Sustainability2030,
            Cot001Set
        } = this.entities;

        const db = await cds.connect.to("db");

        const ecc = await cds.connect.to('ZODATA_INTERNAL_ORDER_SRV');

        this.on('READ', [Cot001Set], async req => {
            return ecc.run(req.query);
        });

        this.before("NEW", Capex.drafts, async (req) => {

            console.log(req.target.name)

            console.log(process.env.COMPANYCODE)
            if (req.target.name !== "CapexCatalogService.Capex.drafts") { return; }
            const { ID } = req.data;
            req.data.status = process.env.DRAFTSTATUS;
            req.data.companyCode = process.env.COMPANYCODE;
            req.data.currency_code = process.env.CURRENCY;
            console.log(req.data.to_CashFlowYear)
            const documentID = new SequenceHelper({
                db: db,
                sequence: "ZCAPEX_DOCUMENT_ID",
                table: "zcapex_CapexEntity",
                field: "documentID",
            });

            let number = await documentID.getNextNumber();
            req.data.documentID = number.toString();

            const records = await db.run(SELECT.from(Sustainability2030));
            console.log(records);
            req.data.to_Objectives = records;
        });


        this.before('UPDATE', Capex.drafts, async (req) => {
            console.log("UPDATE Capex.drafts:");
            const {
                ID,
                millLabor,
                maintenanceLabor,
                operationsLabor,
                outsideContract,
                materialCost,
                hardwareCost,
                softwareCost,
                contingencyCost,
            } = req.data;

            // Initialize total to 0
            let total = 0;
            const record = await db.run(SELECT.one.from(Capex.drafts).where({ ID: ID }));
            console.log(record);
            if (record) {
                // Use existing values from the record if any of the new values are undefined
                const existingMillLabor = millLabor !== undefined ? Number(millLabor) : Number(record.millLabor);
                const existingMaintenanceLabor = maintenanceLabor !== undefined ? Number(maintenanceLabor) : Number(record.maintenanceLabor);
                const existingOperationsLabor = operationsLabor !== undefined ? Number(operationsLabor) : Number(record.operationsLabor);
                const existingOutsideContract = outsideContract !== undefined ? Number(outsideContract) : Number(record.outsideContract);
                const existingMaterialCost = materialCost !== undefined ? Number(materialCost) : Number(record.materialCost);
                const existingHardwareCost = hardwareCost !== undefined ? Number(hardwareCost) : Number(record.hardwareCost);
                const existingSoftwareCost = softwareCost !== undefined ? Number(softwareCost) : Number(record.softwareCost);
                const existingContingencyCost = contingencyCost !== undefined ? Number(contingencyCost) : Number(record.contingencyCost);
                // Calculate total
                total = existingMillLabor + existingMaintenanceLabor + existingOperationsLabor + existingOutsideContract +
                    existingMaterialCost + existingHardwareCost + existingSoftwareCost + existingContingencyCost;

                if (total) {
                    await db.run(
                        UPDATE(Capex.drafts)
                            .set({ totalCost: total })
                            .where({ ID: ID }))  // Using the current ID}
                }
            }

            console.log("new total", total)
            req.data.totalCost = total;
            console.log(req.data)

        });

        // this.after('UPDATE', CashFlowYear.drafts, async (_, req) => {
        //     console.log("UPDATE CashFlowYear.drafts:");
        //     const { ID } = req.data;

        //     const record = await db.run(SELECT.one.from(CashFlowYear.drafts).where({ ID: ID }));

        //     if (record) {
        //         let total = 0;
        //         total = record.cashFlowQOne + record.cashFlowQTwo + record.cashFlowQThree + record.cashFlowQFour;
        //         console.log("Total calculated:", total);
        //         if (total) {
        //             await db.run(
        //                 UPDATE(CashFlowYear.drafts)
        //                     .set({ total: total })
        //                     .where({ ID: ID }))  // Using the current ID}
        //         }
        //     }
        // });
        // this.after(UPDATE, CashFlowYear, async (data) => {
        //     console.log("ptach CashFlowYear.drafts:");
        //     await UPDATE(CashFlowYear.drafts, data.ID).set`total = cashFlowQOne + cashFlowQTwo + cashFlowQThree + cashFlowQFour`
        // });
        this.before('UPDATE', CashFlowYear.drafts, async (req) => {
            console.log("UPDATE before CashFlowYear.drafts:");

            const {
                ID,
                year,
                cashFlowQOne,
                cashFlowQTwo,
                cashFlowQThree,
                cashFlowQFour
            } = req.data;

            // Initialize total to 0
            let total = 0;
            const record = await db.run(SELECT.one.from(CashFlowYear.drafts).where({ ID: ID }));
            if (record) {
                // Use existing values from the record if any of the new values are undefined
                const existingCashFlowQOne = cashFlowQOne !== undefined ? Number(cashFlowQOne) : Number(record.cashFlowQOne);
                const existingCashFlowQTwo = cashFlowQTwo !== undefined ? Number(cashFlowQTwo) : Number(record.cashFlowQTwo);
                const existingCashFlowQThree = cashFlowQThree !== undefined ? Number(cashFlowQThree) : Number(record.cashFlowQThree);
                const existingCashFlowQFour = cashFlowQFour !== undefined ? Number(cashFlowQFour) : Number(record.cashFlowQFour);
                const existingyear = year !== undefined ? Number(year) : Number(record.year);

                // Calculate total
                total = existingCashFlowQOne + existingCashFlowQTwo + existingCashFlowQThree + existingCashFlowQFour;

                if (total) {
                    await db.run(
                        UPDATE(CashFlowYear.drafts)
                            .set({ total: total })
                            .where({ ID: ID }))  // Using the current ID}
                }
            }

            console.log("new total", total)
            req.data.total = total;
            console.log(req.data)
        });


        this.after('NEW', "CashFlowYear.drafts", async (_, req) => {
            console.log("NEW CashFlowYear.drafts:");
            console.log(req.data);
            console.log(_);
            const {
                cashFlowQOne,
                cashFlowQTwo,
                cashFlowQThree,
                cashFlowQFour
            } = req.data;
            const {
                ID,
                DraftAdministrativeData_DraftUUID
            } = _;
            console.log(ID);
            const record = await db.run(SELECT.one.from(CashFlowYear.drafts).where({ ID: ID }));
            console.log(record);
            // Initialize total to 0
            let total = 0;

            if (cashFlowQOne !== undefined) total += Number(cashFlowQOne);
            if (cashFlowQTwo !== undefined) total += Number(cashFlowQTwo);
            if (cashFlowQThree !== undefined) total += Number(cashFlowQThree);
            if (cashFlowQFour !== undefined) total += Number(cashFlowQFour);

            req.data.total = total;
            if (record && total) {
                await db.run(
                    UPDATE(CashFlowYear.drafts)
                        .set({ total: total })
                        .where({ ID: ID }))  // Using the current ID}
            }
            console.log("Calculated total:", req.data.total);
        });

        this.after('SAVE', Capex, async (_, req) => {
            console.log(req.data);
            let testData = {
                "definitionId": "us10.yk2lt6xsylvfx4dz.zcapexworkflow.triggerWorkflow",
                "context": {
                    "documentId": req.data.documentID.toString()
                }
            };

            let BPA_WORKFLOW = await cds.connect.to('BPA_WORKFLOW');

            let response = await BPA_WORKFLOW.send('POST', '/', testData);

            if (response.status >= 200 && response.status < 300) {
                debugger;
                console.log('Success:', response.data);
            } else {
                debugger;
                console.log('Error:', response.status, response.statusText);
            }
        });


        return super.init();
    }
}

module.exports = CapexCatalogService;