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
        } = this.entities;

        const db = await cds.connect.to("db");

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
            req.data.documentID = number.toString();;

        });


        this.after('UPDATE', "Capex.drafts", async (req) => {
            console.log("UPDATE Capex.drafts:");

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

                // Calculate total
                total = existingCashFlowQOne + existingCashFlowQTwo + existingCashFlowQThree + existingCashFlowQFour;
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
        return super.init();
    }
}

module.exports = CapexCatalogService;