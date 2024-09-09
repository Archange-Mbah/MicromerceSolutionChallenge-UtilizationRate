import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo } from "react";
import sourceData from "./source-data.json";
import type { SourceDataType, TableDataType } from "./types";

/**
 * Example of how a tableData object should be structured.
 *
 * Each `row` object has the following properties:
 * @prop {string} person - The full name of the employee.
 * @prop {number} past12Months - The value for the past 12 months.
 * @prop {number} y2d - The year-to-date value.
 * @prop {number} june - The value for june
 * @prop {number} july - The value for July.
 * @prop {number} august - The value for august.
 * @prop {number} netEarningsPrevMonth - The net earnings for the previous month.
 */

const tableData: TableDataType[] = (
  sourceData as unknown as SourceDataType[]
).map((dataRow) => {
  const person = `${dataRow?.employees?.firstname ?? dataRow?.externals?.firstname ?? " N/A"} - ...`; //obtaining the first name of the employee
  const past12Months =parseFloat(dataRow?.employees?.workforceUtilisation?.utilisationRateLastTwelveMonths || dataRow?.externals?.workforceUtilisation?.utilisationRateLastTwelveMonths ||  'N/A') ;//obtaining the utilisation rate for the past 12 months
  const y2d =parseFloat(dataRow?.employees?.workforceUtilisation?.utilisationRateYearToDate ||dataRow?.externals?.workforceUtilisation?.utilisationRateYearToDate || 'N/A' );
  const lastThreeMonths = dataRow?.employees?.workforceUtilisation?.lastThreeMonthsIndividually || dataRow?.externals?.workforceUtilisation?.lastThreeMonthsIndividually || [];
  const juneUtilisation = parseFloat (lastThreeMonths[2]?.utilisationRate || 'N A');
  const julyUtilisation = parseFloat (lastThreeMonths[1]?.utilisationRate || 'N/A');
  const augustUtilisation = parseFloat (lastThreeMonths[0]?.utilisationRate || 'N/A');
  
  const netEarningsPrevMonth = dataRow?.employees?.workforceUtilisation?.totalCostPerCustomer || dataRow?.externals?.workforceUtilisation?.totalCostPerCustomer || 'N/A';

  const row: TableDataType = {
    person: `${person}`,
    past12Months: ` ${past12Months *100  } % `,
    y2d: ` ${y2d *100}  % `,
    june: ` ${juneUtilisation *100} %`,
    july: ` ${julyUtilisation *100} %`,
    august: ` ${augustUtilisation *100} %`,
    netEarningsPrevMonth: ` ${netEarningsPrevMonth} EUR `,
  };

  return row;
});

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<TableDataType>[]>(
    () => [
      {
        accessorKey: "person",
        header: "Person",
      },
      {
        accessorKey: "past12Months",
        header: "Past 12 Months",
      },
      {
        accessorKey: "y2d",
        header: "Y2D",
      },
      {
        accessorKey: "june",
        header: "June",
      },
      {
        accessorKey: "july",
        header: "July",
      },
      {
        accessorKey: "august",
        header: "August",
      },
      {
        accessorKey: "netEarningsPrevMonth",
        header: "Net Earnings Prev Month",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: tableData,
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
