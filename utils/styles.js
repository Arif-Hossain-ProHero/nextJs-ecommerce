import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  navbar: {
    backgroundColor: '#203040',
    '& a': {
      color: 'white',
      textDecoration: 'none',
      marginLeft: '10px',
    },
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  grow: {
    flexGrow: '1',
  },
  main: {
    minHeight: '80vh',
  },
  footer: {
    textAlign: 'center',
  },
});

export default useStyles;
