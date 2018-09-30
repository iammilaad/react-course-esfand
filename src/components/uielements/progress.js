import { Progress } from "antd";
import AntProgress from "./styles/progress.style";
import WithDirection from "../../settings/withDirection";

const WDProgress = AntProgress(Progress);
const ovProgress = WithDirection(WDProgress);

export default ovProgress;
