import Button from 'antd/lib/button';
import { Buttons, ButtonsGroup } from './styles/button.style';
import WithDirection from '../../settings/withDirection';

const AntButton = Buttons(Button);
const ovButton = WithDirection(AntButton);
const AntButtonGroup = ButtonsGroup(Button.Group);
const ButtonGroup = WithDirection(AntButtonGroup);

export default ovButton;
export { ButtonGroup };
