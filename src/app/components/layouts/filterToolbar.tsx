import type { NextPage } from 'next'
import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button, InputAdornment, ListSubheader, OutlinedInput, SelectChangeEvent, Stack } from '@mui/material';
import { Select } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import ArticleIcon from '@mui/icons-material/Article'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add';
import { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';

const drawerWidth = 280;

const FilterToolbar: NextPage<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { collection } = router.query

  const [dateRange, setDateRange] = React.useState('');
  const [openFilter, setOpenFilter] = React.useState<boolean>(false)

  const handleDateRangeChange = (event: SelectChangeEvent) => {
    setDateRange(event.target.value)
  };

  const linkTo = (path: string): void => {
    router.push(path)
  }

  return (
    <>
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

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        p={2}
      >
        <Box></Box>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          spacing={1}
        >
          <Button
            startIcon={<AddIcon />}
            color="success"
            onClick={() => linkTo(`/${collection}/create`)}
          >
            New
          </Button>
          <IconButton
            aria-label="trash"
            color="error"
            onClick={() => linkTo(`/${collection}/trash`)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Box>

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
    </>
  )
}

export default FilterToolbar
