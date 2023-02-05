import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ArticleIcon from '@mui/icons-material/Article'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import { ListItem } from '@mui/material'

export default function PostsMenu() {

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="menu-posts"
      subheader={
        <ListSubheader component="div" id="menu-posts">
          Posts &amp; Pages
        </ListSubheader>
      }
    >
      <ListItem button>
        <ListItemIcon>
          <ArticleIcon />
        </ListItemIcon>
        <ListItemText primary="Posts" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <FindInPageIcon />
        </ListItemIcon>
        <ListItemText primary="Pages" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <MenuOpenIcon />
        </ListItemIcon>
        <ListItemText primary="Menus" />
      </ListItem>
    </List>
  )
}
