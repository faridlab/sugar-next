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
import { Button, InputAdornment, OutlinedInput, SelectChangeEvent, Stack } from '@mui/material';
import { Select } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import ArticleIcon from '@mui/icons-material/Article'
import ClearIcon from '@mui/icons-material/Clear'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add';
import { FunctionComponent, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';

import useFilterParams from '@app/hooks/useFilterParams'
interface FilterParams extends PropsWithChildren {
  filterParams?: ReturnType<typeof useFilterParams>;
}
const drawerWidth = 280;

const FilterToolbar: FunctionComponent<FilterParams> = (props: FilterParams) => {
  const { children, filterParams } = props
  const router = useRouter()
  const { collection } = router.query
  const [openFilter, setOpenFilter] = React.useState<boolean>(false)

  const {
    params,
    dateOptions,
    handleDateOptionChanged,
    handleSearchChanged
  } = filterParams

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
          value={params.dateOption}
          onChange={handleDateOptionChanged}
        >
          <MenuItem disabled value="">
            <em>Date range</em>
          </MenuItem>
          {dateOptions.map((item) => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)}
        </Select>
        <OutlinedInput
          id="form-filter-search"
          type="search"
          value={params.search}
          onChange={handleSearchChanged}
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
        <List>
          <ListItem>
            <ListItemIcon>
              <FilterAltIcon />
            </ListItemIcon>
            <ListItemText primary="Filters" />
            <IconButton size="small">
              <ClearIcon />
            </IconButton>
          </ListItem>
        </List>
        <Divider />
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="menu-filter"
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