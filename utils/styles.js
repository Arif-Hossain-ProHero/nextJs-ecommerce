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
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  footer: {
    textAlign: 'center',
    marginTop: '2em',
  },
  form: {
    maxWidth: 800,
    margin: '0 auto',
  },
  navbarButton: {
    color: 'ffffff',
    textTransform: 'initial',
  },
});

export default useStyles;
