//Material
import { Box, IconButton, Tooltip} from "@mui/material";
//import LoginIcon from '@mui/icons-material/Login';
import Badge from "@mui/material/Badge";
import { MdiAccountCircle } from "../utilities/iconoentrada";

const LoginWidget = ({ isUser }) => {
  return (
    <Box sx={{ minWidth: "unset", mr: 0 }}>
      <Tooltip title="Iniciar Sesión">
      <IconButton color="secondary">
        <Badge
          badgeContent={isUser || 0}
          color="error"
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Box>
          <MdiAccountCircle/>
          </Box>
        </Badge>
      </IconButton>
      </Tooltip>
    </Box>
  );
};

export default LoginWidget;