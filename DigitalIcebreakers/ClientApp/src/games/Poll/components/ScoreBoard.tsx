import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { useSelector } from '../../../store/useSelector';
import { scoreBoardSelector } from '../reducers/presenterReducer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    scores: {
        maxWidth: '50%',
    },
}))

const ScoreBoard = () => {
    const { scores } =  useSelector(scoreBoardSelector);
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h1>Scores</h1>
            <Table 
                classes={{
                    root: classes.scores,
                }}
            >
                <TableBody>
                {scores.map((user, ix) => (
                    <TableRow key={ix.toString()}>
                        <TableCell component="th" scope="row">
                            {user.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {user.score}
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default ScoreBoard;