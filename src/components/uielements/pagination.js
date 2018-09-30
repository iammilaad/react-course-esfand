import { Pagination } from "antd";
import AntPagination from "./styles/pagination.style";
import WithDirection from "../../settings/withDirection";

const Paginations = AntPagination(Pagination);
const ovPagination = WithDirection(Paginations);

export default ovPagination;
