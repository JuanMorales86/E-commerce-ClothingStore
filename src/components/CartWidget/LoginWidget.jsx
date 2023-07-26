//Material
import { Box, IconButton} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import Badge from "@mui/material/Badge";

const LoginWidget = ({ isUser }) => {
  return (
    <Box sx={{ minWidth: "unset", mr: 0 }}>

      <IconButton color="warning" aria-label="add to shopping cart">
        <Badge
          badgeContent={isUser || 0}
          color="error"
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <LoginIcon />
        </Badge>
      </IconButton>
    </Box>
  );
};

export default LoginWidget;