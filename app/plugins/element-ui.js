import Vue from 'vue'
import {
  Aside,
  Button,
  Col,
  Container,
  Drawer,
  Footer,
  Form,
  FormItem,
  Input,
  Header,
  Link,
  Main,
  Menu,
  MenuItem,
  PageHeader,
  Row,
  Submenu
} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

export default () => {
  locale.use(lang)
  Vue.use(Aside)
  Vue.use(Button)
  Vue.use(Col)
  Vue.use(Container)
  Vue.use(Drawer)
  Vue.use(Footer)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Header)
  Vue.use(Input)
  Vue.use(Link)
  Vue.use(Main)
  Vue.use(Menu)
  Vue.use(MenuItem)
  Vue.use(PageHeader)
  Vue.use(Row)
  Vue.use(Submenu)
}
