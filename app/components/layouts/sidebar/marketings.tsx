import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import GavelIcon from '@mui/icons-material/Gavel'
import { ListItem } from '@mui/material'

export default function MarketingsMenu() {

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="menu-marketings"
      subheader={
        <ListSubheader component="div" id="menu-marketings">
          Marketing &amp; Contents
        </ListSubheader>
      }
    >
      <ListItem button>
        <ListItemIcon>
          <ViewCarouselIcon />
        </ListItemIcon>
        <ListItemText primary="Banners" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <QuestionAnswerIcon />
        </ListItemIcon>
        <ListItemText primary="F.A.Q" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <GavelIcon />
        </ListItemIcon>
        <ListItemText primary="Terms &amp; Condition" />
      </ListItem>
    </List>
  )
}
