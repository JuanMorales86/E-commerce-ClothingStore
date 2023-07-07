//Material
import { Box, IconButton} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Badge from "@mui/material/Badge";

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
          badgeContent={cartQuantity || 0}
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
