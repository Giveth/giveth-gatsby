import giveth from './sites/giveth'
import co2ken from './sites/co2ken'

let theme
if (process.env.NEXT_PUBLIC_SITE_ID === 'giveth') {
  theme = giveth
} else {
  theme = co2ken
}
export default theme
