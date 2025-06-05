import React from "react";
import { TableCell, TableRow } from "../ui/table";
import Image from "next/image";
import NoData from "@/assets/images/NoData.png";

interface ITableNoDataProps {
    colSpan: number;
}

const TableNoData = (props: ITableNoDataProps) => {
    const { colSpan } = props;

    return (
        <TableRow>
            <TableCell colSpan={colSpan} className="h-64 text-center">
                <div className="justify-center flex items-center">
                    <div>
                        <Image
                            src={NoData}
                            alt="No Data"
                            width={100}
                            height={100}
                        />
                        <p className="text-lg font-bold">No Data</p>
                    </div>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default TableNoData;
