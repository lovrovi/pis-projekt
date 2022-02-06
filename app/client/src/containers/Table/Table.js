import React from 'react'
import './Table.css'
import { useTableStyles } from '../../materialStyles/TableStyles'
import { Table as MaterialTable } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { StyledTableCell, StyledTableRow } from '../../materialStyles/TableStyles';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md'
import _ from "lodash"
import { isAdmin } from '../../customHooks/isAdmin';
import { BiCommentDetail } from 'react-icons/bi'
import { AiTwotoneCalendar, AiFillCheckSquare } from 'react-icons/ai'

export const Table = (
    {
        tableData,
        customTableData,
        customTableHeader,
        clickEditIconAction,
        clickDeleteIconAction,
        clickCommentIconAction,
        clickReservationIconAction,
        clickUpdateIconAction,
        clickRegisterIconAction
    }) => {
    const classes = useTableStyles();

    const generateTableHeader = () => {
        return Object.keys(tableData[0] || {}).map((value, index) => {
            return <StyledTableCell align="center" key={index}>{_.capitalize(value.split(/(?=[A-Z])/).join(" "))}</StyledTableCell>
        })
    }

    const generateCustomTableHeader = () => {
        return customTableHeader.map((head, index) => {
            return <StyledTableCell align="center" key={index}>{_.capitalize(head)}</StyledTableCell>
        })
    }

    const generateTableBody = () => {
        return tableData.map((row, index) => {
            return (
                <StyledTableRow key={index}>
                    {
                        Object.keys(tableData[0] || {}).map((key, i) => {
                            return <StyledTableCell align="center" key={i}>{row[key]}</StyledTableCell>
                        })
                    }

                    {
                        (clickEditIconAction ||
                        clickDeleteIconAction ||
                        clickCommentIconAction ||
                        clickReservationIconAction ||
                        clickUpdateIconAction ||
                        clickRegisterIconAction) &&
                        <StyledTableCell align="center">
                            <div className="actionButtons">
                                <span
                                    className="actionButton"
                                    onClick={() => isAdmin() ? clickEditIconAction(row.id) : clickCommentIconAction(row.id)}
                                >
                                    {
                                        isAdmin() !== true ? clickCommentIconAction ? <BiCommentDetail size={22} /> : "" : clickEditIconAction ? <BiEdit size={22} /> : ""

                                    }

                                </span>
                                {
                                    isAdmin() &&
                                    (<span
                                        className="actionButton"
                                        onClick={() => clickDeleteIconAction(row.id)}
                                    >
                                        {clickDeleteIconAction ? <MdDelete size={22} /> : ""}
                                    </span>)
                                }
                                <span
                                    className="actionButton"
                                    onClick={() => clickUpdateIconAction(row.id)}
                                >
                                    {clickUpdateIconAction ? <AiFillCheckSquare size={22} /> : ""}
                                </span>
                                <span
                                    className="actionButton"
                                    onClick={() => clickReservationIconAction(row.id)}
                                >
                                    {clickReservationIconAction ? <AiTwotoneCalendar size={22} /> : ""}
                                </span>
                                <span
                                    className="actionButton"
                                    onClick={() => clickRegisterIconAction(row.email)}
                                >
                                    {clickRegisterIconAction ? <AiFillCheckSquare size={22} /> : ""}
                                </span>
                            </div>
                        </StyledTableCell>
                    }

                </StyledTableRow>
            )
        })
    }

    return (
        <MaterialTable className={classes.table} aria-label="customized table">
            <TableHead>
                <TableRow>
                    {
                        customTableHeader ?
                            generateCustomTableHeader() :
                            <>
                                {generateTableHeader()}

                                {
                                    (clickEditIconAction ||
                                    clickDeleteIconAction ||
                                    clickCommentIconAction ||
                                    clickReservationIconAction ||
                                    clickRegisterIconAction) &&
                                    <StyledTableCell align="center">Actions</StyledTableCell>
                                }

                            </>
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {customTableData ? customTableData : generateTableBody()}
            </TableBody>
        </MaterialTable>
    )
}
