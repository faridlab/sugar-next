import * as React from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'

import Divider from '@mui/material/Divider'
import { Breadcrumbs, Link, Typography } from '@mui/material'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { FunctionComponent, PropsWithChildren } from 'react'
import { useRouter } from 'next/router'

import useFilterParams from '@app/hooks/useFilterParams'
interface FilterParams extends PropsWithChildren {
  filterParams?: ReturnType<typeof useFilterParams>;
}

const FilterDetailToolbar: FunctionComponent<FilterParams> = (props: FilterParams) => {
  const { children, filterParams } = props
  const router = useRouter()
  const { collection } = router.query

  return (
    <>
      <Toolbar sx={{marginTop: 8, marginLeft: -1, backgroundColor: '#fff'}}>
        <IconButton size="small" onClick={() => router.back()}>
          <KeyboardArrowLeftIcon />
        </IconButton>

        <Breadcrumbs maxItems={1} itemsBeforeCollapse={0} aria-label="breadcrumb"  sx={{ mx: 1 }}>
          <Link underline="hover" color="inherit" href={`/${collection||''}`}>
            {collection || ''}
          </Link>
          <Typography color="text.primary">Indonesia</Typography>
        </Breadcrumbs>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton size="small">
          <FilterAltIcon />
        </IconButton>
      </Toolbar>
      <Divider />
    </>
  )
}

export default FilterDetailToolbar
