import type { NextPage } from 'next'
import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';

import SidemenuComponent from './sidemenu'
import TopnavComponent from './topnavbar'

import Drawer from '@mui/material/Drawer';
import { PropsWithChildren } from 'react';
import useFilterParams from '@app/hooks/useFilterParams'
import FilterToolbar from '@component/layouts/filterToolbar';
interface FilterParams extends PropsWithChildren {
  filterParams?: ReturnType<typeof useFilterParams>;
  title?: string;
}

const drawerWidth = 280;

const DashboardLayout: NextPage<FilterParams> = (props: FilterParams) => {
  const { children, filterParams, title } = props

  const [ isOpenDrawer, setOpenDrawer ] = React.useState<boolean>(true)
  const toggleOpenDrawer = () => {
    setOpenDrawer(!isOpenDrawer)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopnavComponent onToggleDrawer={toggleOpenDrawer} title={title} />

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
          <SidemenuComponent />
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

        <FilterToolbar filterParams={filterParams} />

        <Box
          component="main"
          sx={{
            paddingX: 2,
            paddingBottom: 6
          }}
        >
          {children}
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

    </Box>
  )
}

export default DashboardLayout
