import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: {
        '&:before': {
          borderBottom: `2px solid #ccc`,
        },
        '&:hover:not($disabled):not($error):before': {
          borderBottom: `2px solid #ccc`,
        },
        '&:focused:not($disabled):not($error):after': {
          borderBottom: `2px solid #ccc`,
        },
      },
    },
  },
});

export default theme;
