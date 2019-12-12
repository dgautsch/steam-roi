import Vue from 'vue'
import {
  Aside,
  Container,
  Footer,
  Header,
  Main,
  Menu,
  MenuItem,
  PageHeader,
  Submenu
} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

export default () => {
  locale.use(lang)
  Vue.use(Aside)
  Vue.use(Container)
  Vue.use(Footer)
  Vue.use(Header)
  Vue.use(Main)
  Vue.use(Menu)
  Vue.use(MenuItem)
  Vue.use(PageHeader)
  Vue.use(Submenu)
}
