import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { PersonAdd, Settings, Logout, Person } from '@mui/icons-material'
import { Divider, ListItemIcon } from '@mui/material'
import { useDialog } from '@app/hooks'
import useUserAuthenticate from '@app/hooks/userAuthenticate'
import { useRouter } from 'next/router'

interface MenuProps {
  anchorEl: null | HTMLElement;
  isMenuOpen: boolean;
  handleMenuClose(): void;
}

export default function TopbarMenu(props: MenuProps) {
  const { openDialog, DialogScreen} = useDialog()
  const router = useRouter()
  const {
    logout
  } = useUserAuthenticate()

  const {
    anchorEl,
    isMenuOpen,
    handleMenuClose
  } = props
  const menuId = 'primary-search-account-menu'

  const onLogout = async () => {
    handleMenuClose()
    const isOkay = await openDialog({
      title: 'Logout',
      content: 'Are you sure want to Logout?'
    })
    if(!isOkay) return
    logout()
    router.push('/login')
  }

  return (<>
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
        onClick={onLogout}>
        <ListItemIcon>
          <Logout color='error' fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
    <DialogScreen />
    </>)
}
