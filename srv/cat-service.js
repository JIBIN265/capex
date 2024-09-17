const cds = require("@sap/cds");
const { SELECT, INSERT, UPDATE } = cds.ql;
const SequenceHelper = require("./lib/SequenceHelper");
const { data } = require("@sap/cds/lib/dbs/cds-deploy");
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
            Cot001Set,
            OrderTypeF4Set,
            BusinessReasonF4Set,
            DivisionF4Set,
            SiteF4Set,
            MasterDataSet,
            CurrencyF4Set,
            ChangeStatusSet
        } = this.entities;

        const db = await cds.connect.to("db");

        const ecc = await cds.connect.to('ZODATA_INTERNAL_ORDER_SRV');

        this.on('READ', [Cot001Set, OrderTypeF4Set, BusinessReasonF4Set,
            DivisionF4Set, SiteF4Set, CurrencyF4Set, MasterDataSet], async req => {
                return ecc.run(req.query);

            });

        this.before('READ', Capex, async (req) => {
            try {
                const masterData = await ecc.tx(req).run(SELECT.from('MasterDataSet'));

                if (!masterData) {
                    return req.error(500, 'ECC Server could not be reached');
                }

                if (Array.isArray(masterData)) {
                    // Insert new records from MasterDataSet to local DB
                    await Promise.all(masterData.map(async (item) => {
                        const existingRecord = await db.run(
                            SELECT.from(Capex).where({ orderNumber: item.orderNumber })
                        );

                        if (existingRecord.length === 0) {
                            // If the record doesn't exist, insert it
                            console.log(`Inserting new record with orderNumber: ${item.orderNumber}`);
                            const documentID = new SequenceHelper({
                                db: db,
                                sequence: "ZCAPEX_DOCUMENT_ID",
                                table: "zcapex_CapexEntity",
                                field: "documentID",
                            });

                            let number = await documentID.getNextNumber();
                            const insertStmt = INSERT.into(Capex).entries({
                                documentID: number.toString(),
                                orderNumber: item.orderNumber,
                                orderType: item.orderType,
                                companyCode: item.companyCode,
                                site: item.site,
                                division: item.division,
                                description: item.description,
                                businessReason: item.businessReason,
                                currency_code: item.currency,
                                appropriationLife: item.appropriationLife,
                                downtime: item.downtime,
                                amount: item.amount,
                                millLabor: item.millLabor,
                                maintenanceLabor: item.maintenanceLabor,
                                operationsLabor: item.operationsLabor,
                                outsideContract: item.outsideContract,
                                materialCost: item.materialCost,
                                hardwareCost: item.hardwareCost,
                                softwareCost: item.softwareCost,
                                contingencyCost: item.contingencyCost,
                                totalCost: item.totalCost,
                                profitImprovementPct: item.profitImprovementPct,
                                profitImprovementNPV: item.profitImprovementNPV,
                                paybackWithTaxes: item.paybackWithTaxes,
                                paybackWithoutTaxes: item.paybackWithoutTaxes,
                                oneTimeExpenses: item.oneTimeExpenses,
                                recurringExpenses: item.recurringExpenses,
                                startupDate: item.startupDate,
                                strategic: item.strategic,
                                businessSustaining: item.businessSustaining,
                                mandatory: item.mandatory,
                                profitImprovement: item.profitImprovement,
                                environmentalImpacts: item.environmentalImpacts,
                                safetyImplications: item.safetyImplications,
                                creditPotential: item.creditPotential,
                                insuranceApproval: item.insuranceApproval,
                                businessArea: item.businessArea,
                                controllingArea: item.controllingArea,
                                status: item.status,
                                stonr: item.stonr
                            });
                            await db.run(insertStmt);
                        } else {
                            // If the record exists, we do nothing
                            console.log(`Record with orderNumber: ${item.orderNumber} already exists. Skipping.`);
                        }
                    }));
                    console.log('Synchronization with ECC completed successfully');
                }

            } catch (error) {
                console.error('Error during synchronization:', error);
                return req.error(500, error.message);
            }

        });

        this.before("NEW", Capex.drafts, async (req) => {

            if (req.target.name !== "CapexCatalogService.Capex.drafts") { return; }
            const { ID } = req.data;
            req.data.status = process.env.DRAFTSTATUS;
            if (!req.data.companyCode) { req.data.companyCode = process.env.COMPANYCODE; }
            // if (!req.data.currency_code) { req.data.currency_code = process.env.CURRENCY; }
            // req.data.currency_code = process.env.CURRENCY;

            const documentID = new SequenceHelper({
                db: db,
                sequence: "ZCAPEX_DOCUMENT_ID",
                table: "zcapex_CapexEntity",
                field: "documentID",
            });

            let number = await documentID.getNextNumber();
            req.data.documentID = number.toString();
            if (!req.data.to_Objectives) {
                const records = await db.run(SELECT.from(Sustainability2030));
                req.data.to_Objectives = records;
            }
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
                amount,
            } = req.data;

            // Initialize total to 0
            let total = 0;
            const record = await db.run(SELECT.one.from(Capex.drafts).where({ ID: ID }));
            //console.log(record);
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
                const existingAmount = amount !== undefined ? Number(amount) : Number(record.amount);

                // Calculate total
                total = existingMillLabor + existingMaintenanceLabor + existingOperationsLabor + existingOutsideContract +
                    existingMaterialCost + existingHardwareCost + existingSoftwareCost + existingContingencyCost;

                if (existingAmount < total) {
                    req.warn(404, `Exceeded Total Amount`);
                }

                if (total) {
                    await db.run(
                        UPDATE(Capex.drafts)
                            .set({ totalCost: total })
                            .where({ ID: ID }))  // Using the current ID}
                }
            }

            console.log("new total", total)
            req.data.totalCost = total;
            // console.log(req.data)

        });

        this.on('getStatusCount', async (req) => {
            try {
                const statusKeys = ['N', 'X', 'E0011', 'D', 'E0010', 'E0009']; // Example status keys
                const statusCount = await getStatusCounts(statusKeys);

                return statusCount;
            } catch (error) {
                // Handle errors gracefully
                console.error('Error in getErrorCount:', error.message);
                // throw new Error('Failed to retrieve error count.');
            }
        });


        async function getStatusCounts(keys) {
            const keyMappings = {
                'N': 'inProgressCount',
                'X': 'Count',
                'E0011': 'rejectIncompleteCount',
                'D': 'draftCount',
                'E0010': 'rejectFinalCount',
                'E0009': 'approvedCount'
            };

            const statusCount = {};

            const conditions = keys.map(key => `status = '${key}'`).join(' OR ');
            const query = SELECT
                .from(Capex)
                .columns(['status', 'COUNT(*) AS count'])
                .where(conditions)
                .groupBy('status');

            const results = await db.run(query);

            results.forEach(result => {
                const mappedKey = keyMappings[result.status];
                statusCount[mappedKey] = result.count;
            });

            return statusCount;
        }



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

        this.before('SAVE', Capex, async req => {
            // console.log(req.event)
            if (!req.event === 'CREATE' && !req.event === 'UPDATE') { return; }  //only calculate if create or update
            const {
                ID,
                totalCost,
                amount
            } = req.data;

            if (totalCost > amount) {
                req.error(400, `TOTALCOST`, `in/amount`, [totalCost, amount]);
            }

            const record = await db.run(SELECT.one.from(Capex).where({ ID: ID }));

            if (req.errors) { req.reject(); }

            // let data = req.data;
            let data = JSON.parse(JSON.stringify(req.data));
            // Delete unnecessary fields
            const fieldsToDelete = [
                'currency_code', 'to_CashFlowYear', 'to_Objectives', 'attachments', 'to_RejectionReasons',
                'ID', 'status', 'documentID', 'notes', 'numericSeverity', 'to_Comments', 'downtime', 'appropriationLife'
            ];
            fieldsToDelete.forEach(field => delete data[field]);

            // Convert specific fields
            data.downtime = req.data.downtime !== undefined ? req.data.downtime.toString() : "0";
            data.appropriationLife = req.data.appropriationLife !== undefined ? req.data.appropriationLife.toString() : "0";
            data.currency = req.data.currency_code;
            data.orderNumber = req.data.documentID.toString();

            console.log("SAP", data);

            let errorMessage = '';
            let successData = null;

            try {
                // result = await ecc.run(INSERT.into(MasterDataSet).entries(data));
                let insertQuery = INSERT.into('MasterDataSet', [data])

                // Execute query against backend system
                let result = await ecc.tx(req).run(insertQuery)

                // If we reach here, it means the operation was successful
                successData = result;
                req.data.orderNumber = successData.orderNumber;
                //req.info(`Order ${successData.orderNumber} created successfully`);
                console.log(`Order ${successData.orderNumber} created successfully`);
            } catch (error) {
                // Handle the error case
                if (error.code) {
                    errorMessage = error.message || "An exception was raised.";

                    // Extract more detailed error information if available
                    if (error.innerError && error.innerError.errordetails) {
                        error.innerError.errordetails.forEach(detail => {
                            errorMessage += `\n${detail.code}: ${detail.message}`;
                        });
                    }
                } else {
                    errorMessage = "An unexpected error occurred";
                }
            }

            // Now you can use errorMessage and successData as needed
            if (errorMessage) {
                req.data.notes = errorMessage;
                console.error("Error:", errorMessage);
                //    req.info("Error:" + errorMessage);
            } else {
                console.log("Success:", successData);
                //req.info("Success:" + successData);
            }

        });

        this.after('SAVE', Capex, async (_, req) => {
            console.log(req.data);


            try {
              //  const { CapexEntity } = this.entities;

                // Fetch the CapexEntity with its attachments using expand
                const capex = await SELECT.one.from(Capex)
                    .where({ ID: req.data.ID });

                // const url = req.data.url;
                // const mediaObj = attachments.findOne({ url });

                if (attachments && attachments.length > 0) {
                    const attachment = attachments[0];
                    fileName = attachment.name;

                    // Read the file content
                    if (attachment.content instanceof Buffer) {
                        fileContent = attachment.content.toString('base64');
                    } else if (typeof attachment.content === 'function') {
                        const stream = attachment.content();
                        fileContent = await new Promise((resolve, reject) => {
                            const chunks = [];
                            stream.on('data', (chunk) => chunks.push(chunk));
                            stream.on('error', reject);
                            stream.on('end', () => resolve(Buffer.concat(chunks).toString('base64')));
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching or processing attachment:', error);
            }


            let testData = {
                "definitionId": "us10.yk2lt6xsylvfx4dz.zcapexworkflow.triggerWorkflow",
                "context": {
                    "orderNumber": String(req.data.orderNumber || ""),
                    "orderType": String(req.data.orderType || ""),
                    "companyCode": String(req.data.companyCode || ""),
                    "site": String(req.data.site || ""),
                    "division": String(req.data.division || ""),
                    "description": String(req.data.description || ""),
                    "businessReasons": req.data.businessReason || "",
                    "amount": String(req.data.amount || ""),
                    "currency": req.data.currency_code || "",
                    "appropriationsCosts": [
                        {
                            "millLabor": String(req.data.millLabor || ""),
                            "maintenanceLabor": String(req.data.maintenanceLabor || ""),
                            "operationsLabor": String(req.data.operationsLabor || ""),
                            "outsideContract": String(req.data.outsideContract || ""),
                            "materialCost": String(req.data.materialCost || ""),
                            "hardwareCost": String(req.data.hardwareCost || ""),
                            "softwareCost": String(req.data.softwareCost || ""),
                            "contingencyCost": String(req.data.contingencyCost || ""),
                            "totalCost": String(req.data.totalCost || "")
                        }
                    ],
                    "_id": String(req.data.ID || "")
                }
            };


            let BPA_WORKFLOW = await cds.connect.to('BPA_WORKFLOW');

            let response = await BPA_WORKFLOW.send('POST', '/', testData);

            if (response.status >= 200 && response.status < 300) {
                console.log('Success:', response.data);
            } else {
                console.log('Error:', response.status, response.statusText);
            }
        });

        this.on('copyCapex', async (req) => {
            const { ID } = req.params[0];
            // console.log(req)
            // console.log(req.params)
            const originalCapex = await db.run(
                SELECT.one.from(Capex)
                    .columns(cpx => {
                        cpx`*`,                   // Select all columns from Capex
                            cpx.to_CashFlowYear(cfy => { cfy`*` }) // Select all columns from the composition entity CashFlowYear
                    })
                    .where({ ID: ID })
            );

            if (!originalCapex) {
                req.error(404, 'Original Capex entity not found');
                return;
            }

            // Create a deep copy of the entity
            const copiedCapex = Object.assign({}, originalCapex);
            delete copiedCapex.ID;  // Remove the ID to ensure a new entity is created
            delete copiedCapex.createdAt;
            delete copiedCapex.createdBy;
            delete copiedCapex.modifiedAt;
            delete copiedCapex.modifiedBy;


            // copiedCapex.HasActiveEntity = false;
            copiedCapex.DraftAdministrativeData_DraftUUID = cds.utils.uuid();
            // Ensure all related entities are copied
            if (originalCapex.to_CashFlowYear) {
                copiedCapex.to_CashFlowYear = originalCapex.to_CashFlowYear.map(cashFlow => {
                    const copiedCashFlow = Object.assign({}, cashFlow);
                    delete copiedCashFlow.ID; // Remove the ID to create a new related entity
                    delete copiedCashFlow.up__ID;
                    delete copiedCashFlow.createdAt;
                    delete copiedCashFlow.createdBy;
                    delete copiedCashFlow.modifiedAt;
                    delete copiedCashFlow.modifiedBy;
                    // copiedCashFlow.HasActiveEntity = false;
                    copiedCashFlow.DraftAdministrativeData_DraftUUID = cds.utils.uuid();
                    return copiedCashFlow;
                });
            }
            //create a draft
            const oCapex = await this.send({
                query: INSERT.into(Capex).entries(copiedCapex),
                event: "NEW",
            });
            req.notify("Order has been successfully copied and saved as a new draft.");
            //return the draft
            return oCapex;

        });

        this.on("validate", async req => {
            return req.notify(`Validate action pressed`); //Search-Term: #MessageToast
        });
        this.on("rejectFinal2", async req => {
            return req.notify(`Reject final action pressed`); //Search-Term: #MessageToast
        });

        async function statusChange(req, ID, newStatus) {
            try {
                const updatedDbRecord = await db.run(
                    UPDATE(Capex)
                        .set({ status: newStatus })
                        .where({ ID: ID })
                );

                if (!updatedDbRecord) {
                    return req.error(404, `Record with ID ${ID} not found in the local DB.`);
                }

                const record = await db.run(SELECT.one.from(Capex).where({ ID: ID }));
                const eccPayload = {
                    orderNumber: record.orderNumber,
                    status: newStatus,
                };

                let successData = null;
                let updateQuery = INSERT.into('ChangeStatusSet', [eccPayload])

                let result = await ecc.tx(req).run(updateQuery)
                successData = result;
                req.data.status = successData.status;
                req.notify(`Status updated to ${newStatus} for order ${record.orderNumber} in both DB and ECC`);
                let finalReturn = {
                    orderNumber: record.orderNumber,
                    status: "Success",
                }
                return req.reply(finalReturn);

            } catch (error) {
                if (error.code) {
                   let errorMessage = error.message || "An exception was raised.";

                    // Extract more detailed error information if available
                    if (error.innerError && error.innerError.errordetails) {
                        error.innerError.errordetails.forEach(detail => {
                            errorMessage += `\n${detail.code}: ${detail.message}`;
                        });
                    }
                    let finalReturn = {
                        orderNumber: errorMessage,
                        status: "Error",
                    }
                    return req.reply(finalReturn);
                } else {
                    let errorMessage = "An unexpected error occurred";
                    let finalReturn = {
                        orderNumber: errorMessage,
                        status: "Error",
                    }
                    return req.reply(finalReturn);
                }
            }
        }

        this.on("approve", async (req) => {
            const { ID } = req.params[0];
            const newStatus = "E0009";
            await statusChange(req, ID, newStatus);
        });

        this.on("rejectFinal", async (req) => {
            const { ID } = req.params[0];
            const newStatus = "E0010";
            await statusChange(req, ID, newStatus);
        });

        this.on("rejectIncomplete", async (req) => {
            const { ID } = req.params[0];
            const newStatus = "E0011";
            await statusChange(req, ID, newStatus);
        });

        this.on("workflowApprove", async (req) => {
            const { ID } = req.params[0];
            const newStatus = "E0009";
            await statusChange(req, ID, newStatus);
        });

        this.on("workflowFinal", async (req) => {
            const { ID } = req.params[0];
            const newStatus = "E0010";
            await statusChange(req, ID, newStatus);
        });

        this.on("workflowIncomplete", async (req) => {
            const { ID } = req.params[0];
            const newStatus = "E0011";
            await statusChange(req, ID, newStatus);
        });

        return super.init();
    }
}

module.exports = CapexCatalogService;