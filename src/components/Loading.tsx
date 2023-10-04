import { Box, Modal } from '@mui/material';
import { styled } from '@mui/material/styles';

// ----------------------------css---------------------------------------
const LoadingStyles = styled(Box)(({ theme }) => ({
  border: '3px solid #E4E7EC',
  borderRadius: '50%',
  borderTop: `3px solid ${theme.palette.primary.dark}`,
  width: '30px',
  height: '30px',
  webkitAnimation: 'spin 2s linear infinite' /* Safari */,
  animation: 'spin 2s linear infinite',

  /* Safari */
  '@webkitKeyframes spin': {
    '0%': { webkitTransform: 'rotate(0deg)' },
    '100%': { webkitTransform: 'rotate(360deg)' },
  },

  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
}));

const ModalStyles = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '[tabindex]': {
    outline: 'none',
  },
});

// ----------------------------------------------------------------------

export const Loading = () => {
  return (
    <ModalStyles open={true}>
      <LoadingStyles />
    </ModalStyles>
  );
};
