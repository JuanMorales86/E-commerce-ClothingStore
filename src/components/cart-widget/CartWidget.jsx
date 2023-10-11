//Material
import { Box, IconButton} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Badge from "@mui/material/Badge";

const CartWidget = ({ cartQuantity }) => {
  return (
    <Box sx={{ minWidth: "unset", mr: 0 }}>

      <IconButton color="warning">
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
