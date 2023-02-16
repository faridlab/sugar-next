import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import CssBaseline from '@mui/material/CssBaseline';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Button, Grid, InputAdornment, ListSubheader, OutlinedInput, SelectChangeEvent, Stack } from '@mui/material';
import { Select } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import ArticleIcon from '@mui/icons-material/Article'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add';

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import gridActions from '@data/repositories/datagrid/actions'

import {
  GridCellParams,
  GridEnrichedColDef,
  GridEventListener,
  GridEvents,
} from '@mui/x-data-grid'

import { useDeleteMutation } from '@app/services/api/apiRequest'
import * as dataRepositories from '@data/repositories'
import { useQueryMutation } from '@app/services/api/apiRequest'
import { DatagridPresenter } from '@app/components/presenter'
import { Params } from '@component/presenter/datagrid'
import { useDialog } from '@app/hooks'
import { RequestDataType } from '@device/utils/axios'

const drawerWidth = 280;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(16),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [ isOpenDrawer, setOpenDrawer ] = useState<boolean>(true)
  const toggleOpenDrawer = () => {
    setOpenDrawer(!isOpenDrawer)
  }

  const router = useRouter()
  const { delete_id } = router.query
  const collection = 'provinces'
  const url = `/${collection}`
  const [ columns, setColumns ] = useState<GridEnrichedColDef[]>([])
  const [ rows, setRows ] = useState([])
  const [ loading, setLoading ] = useState<boolean>(false)
  // NOTE: i don't like this approach use ready state, please find ahother cool way
  const [ ready, setReady ] = useState<boolean>(false)
  const [ rowCount, setRowCount ] = useState(0)
  const [ deleteData ] = useDeleteMutation()
  const { openDialog} = useDialog()

  const [ params, setParams ] = useState({
    page: 1,
    limit: 10,
  })

  const [ fetchQuery ] = useQueryMutation()
  const onFetchData = async (url: string, params: Record<string, any> = {}) => {
    try {
      if(loading) return
      setLoading(true)
      const payload = {
        url,
        params
      }
      const response = await fetchQuery(payload).unwrap()
      const { data, meta } = response
      setRows(data)
      setRowCount(meta.recordsFiltered)
      setLoading(false)
    } catch (error) {}
  }

  const onCellClick: GridEventListener<GridEvents.cellClick> = (params: GridCellParams) => {
    const { isEditable, id, colDef } = params
    const { type } = colDef
    if(type === 'actions') return
    if(isEditable) return
    router.push(`/${collection}/${id}`)
  }

  useEffect(() => {
    if(!router.isReady) return
    console.log(collection)
    // const { collection } = router.query
    const { resources } = dataRepositories // as default
    const columns = (dataRepositories as any)[collection as string]?.columns || []
    const parameters = (dataRepositories as any)[collection as string]?.params || resources.params
    // setParams({...params, ...parameters})
    columns.push(gridActions)

    setParams(parameters)
    setColumns(columns)
    setRows([])
    onFetchData(`/${collection}`, parameters)
    setReady(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ router.isReady, collection ])

  useEffect(() => {
    if(!delete_id) return
    onDelete(delete_id as string)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delete_id])

  const onDelete = async (id: string) => {
    try {
      const isOkay = await openDialog({
        title: 'Delete',
        content: 'Are you sure want to delete?'
      })
      if(!isOkay) {
        router.push(`/${collection}`)
        return
      }

      const payload: RequestDataType = {
        url: `/${collection}/${id}`,
        data: {}
      }

      const response = await deleteData(payload).unwrap()
      const { status, message } = response
      openDialog({
        title: status,
        content: message,
        onOk: () => {
          router.push(`/${collection}`)
          onFetchData(url, params)
        }
      })
    } catch (error) {
      const { status, message } = (error as any).data
      openDialog({
        title: status,
        content: message
      })
    }
  }

  const onPaginationChanged = (parameters: Params) => {
    setParams({...params, ...parameters})
    if(!ready) return
    onFetchData(url, {...params, ...parameters})
  }

  const [dateRange, setDateRange] = React.useState('');
  const [openFilter, setOpenFilter] = React.useState<boolean>(false)

  const handleDateRangeChange = (event: SelectChangeEvent) => {
    setDateRange(event.target.value)
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleOpenDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Startapp
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      <Drawer
        variant="persistent"
        sx={{
          width: isOpenDrawer? drawerWidth: 0,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
        open={isOpenDrawer}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
        }}>

        <Toolbar sx={{marginTop: 8, marginLeft: -1, backgroundColor: '#fff'}}>
          <IconButton size="small">
            <KeyboardArrowLeftIcon />
          </IconButton>
          <Select
            id="form-filter-date"
            displayEmpty
            sx={{ m: 1,}}
            variant="outlined"
            size="small"
            value={dateRange}
            onChange={handleDateRangeChange}
          >
            <MenuItem disabled value="">
              <em>Date range</em>
            </MenuItem>
            <MenuItem value={10}>Today</MenuItem>
            <MenuItem value={20}>Last 30 days</MenuItem>
            <MenuItem value={30}>This month</MenuItem>
            <MenuItem value={40}>Last month</MenuItem>
            <MenuItem value={50}>Last 90 days</MenuItem>
            <MenuItem value={60}>Last 6 months</MenuItem>
            <MenuItem value={70}>Last year</MenuItem>
            <MenuItem value={80}>Custom range</MenuItem>
          </Select>
          <OutlinedInput
            id="form-filter-search"
            type="search"
            size='small'
            startAdornment={
              <InputAdornment position="start">
                <IconButton edge="start" >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />


          <Box sx={{ flexGrow: 1 }} />
          <IconButton size="small" onClick={() => setOpenFilter(true)}>
            <FilterAltIcon />
          </IconButton>
        </Toolbar>
        <Divider />

        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid
              item
              xs={6}
              p={2}
            ></Grid>
            <Grid
              item
              xs={6}
              p={2}
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
                spacing={1}
              >
                <Button startIcon={<AddIcon />} color="success">
                  New
                </Button>
                <IconButton aria-label="trash" color="error">
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        <Box
          component="main"
          sx={{
            paddingX: 2,
            paddingBottom: 6
          }}
        >
          <DatagridPresenter
            columns={columns}
            rows={rows}
            rowCount={rowCount}
            params={params}
            isLoading={loading}
            onPaginationChanged={onPaginationChanged}
            onCellClick={onCellClick}
          />
        </Box>

      </Box>

      {/*
      <Drawer
        variant="permanent"
        anchor='right'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      */}

      {/* FILTER DRAWER */}
      <Drawer
        anchor='right'
        variant="temporary"
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        sx={{
          minWidth: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { minWidth: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="menu-filter"
          subheader={
            <ListSubheader component="div" id="menu-filter">
              Filter
            </ListSubheader>
          }
        >
          <ListItem>
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="Posts" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FindInPageIcon />
            </ListItemIcon>
            <ListItemText primary="Pages" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <MenuOpenIcon />
            </ListItemIcon>
            <ListItemText primary="Menus" />
          </ListItem>
        </List>
        </Box>
      </Drawer>

    </Box>
  );
}
