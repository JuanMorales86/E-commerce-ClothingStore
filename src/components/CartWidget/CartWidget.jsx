//Material
import { Box, IconButton, Button, MenuIcon } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Badge from "@mui/material/Badge";
import { pink, red } from "@mui/material/colors";

const CartWidget = ({ cartQuantity }) => {
  return (
    <Box sx={{ minWidth: "unset", mr: 0 }}>
      {/* <IconButton aria-label="delete">
        <Badge
          badgeContent={cartQuantity}
          color="success"
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <DeleteIcon />
        </Badge>
      </IconButton> */}

      <IconButton color="warning" aria-label="add to shopping cart">
        <Badge
          badgeContent={cartQuantity}
          color="error"
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <AddShoppingCartIcon />
        </Badge>
      </IconButton>
    </Box>
  );
};

export default CartWidget;
