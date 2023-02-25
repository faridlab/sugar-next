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
import FilterDetailToolbar from '@component/layouts/filterDetailToolbar';
interface FilterParams extends PropsWithChildren {
  filterParams?: ReturnType<typeof useFilterParams>;
  title?: string;
}

const drawerWidth = 280;

const DashboardDetailLayout: NextPage<FilterParams> = (props: FilterParams) => {
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
        <FilterDetailToolbar />
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
    </Box>
  )
}

export default DashboardDetailLayout
