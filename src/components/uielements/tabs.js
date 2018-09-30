import { Tabs } from "antd";
import AntTab from "./styles/tab.style";
import WithDirection from "../../settings/withDirection";

const WDTabs = AntTab(Tabs);
const TabPane = Tabs.TabPane;
const ovTabs = WithDirection(WDTabs);

export default ovTabs;
export { TabPane };
