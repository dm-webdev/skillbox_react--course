import { withStyles } from '@material-ui/core';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';


export const Accordion = withStyles(theme => ({
  root: {
    marginBottom: '25px',
    backgroundColor: 'inherit',
    boxShadow: `none`,
  },
}))(MuiAccordion);

export const AccordionSummary = withStyles({
  content: {
    fontSize: '1.2rem',
    fontWeight: '600',
  },
  focused: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  }
})(MuiAccordionSummary);
