import styled from "styled-components";
import { palette } from "styled-theme";

const SaleWidgetWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: #ffffff;
  overflow: hidden;
  border: 1px solid ${palette("border", 2)};

  .tavSaleLabel {
    font-size: 14px;
    font-weight: 700;
    line-height: 1.2;
    text-transform: uppercase;
    color: ${palette("text", 0)};
    margin: 0 0 20px;
  }

  .tavSalePrice {
    font-size: 28px;
    font-weight: 300;
    line-height: 1.2;
    margin: 0 0 20px;
  }

  .tavSaleDetails {
    font-size: 13px;
    font-weight: 400;
    line-height: 1.5;
    color: ${palette("text", 2)};
    margin: 0;
  }
`;

export { SaleWidgetWrapper };
