//Material
import { Box, IconButton, Tooltip} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import Badge from "@mui/material/Badge";

const LoginWidget = ({ isUser }) => {
  return (
    <Box sx={{ minWidth: "unset", mr: 0 }}>
      <Tooltip title="Iniciar Sesión">
      <IconButton color="secondary" aria-label="Accesar al sistema de administracion">
        <Badge
          badgeContent={isUser || 0}
          color="error"
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Box>
          <LoginIcon />
          </Box>
         
        </Badge>
      </IconButton>
      </Tooltip>
    </Box>
  );
};

export default LoginWidget;