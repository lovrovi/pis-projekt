import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export const useTableStyles = makeStyles({
    table: {
        minWidth: 800,
    },
});

export const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#48494a",
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14,
        padding: 0
    },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    }
}))(TableRow);