import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { PersonAdd, Settings, Logout, Person } from '@mui/icons-material'
import { Divider, ListItemIcon } from '@mui/material'

interface MenuProps {
  anchorEl: null | HTMLElement;
  isMenuOpen: boolean;
  handleMenuClose(): void;
}

export default function TopbarMenu(props: MenuProps) {
  const {
    anchorEl,
    isMenuOpen,
    handleMenuClose
  } = props
  const menuId = 'primary-search-account-menu'

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <Person fontSize="small" />
        </ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <Person fontSize="small" />
        </ListItemIcon>
        My account
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <PersonAdd fontSize="small" />
        </ListItemIcon>
        Add another account
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <Divider />
      <MenuItem
        sx={{
          color: 'error.main'
        }}
        onClick={handleMenuClose}>
        <ListItemIcon>
          <Logout color='error' fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  )
}
