import styled from "styled-components";
import { palette } from "styled-theme";
import WithDirection from "../../../settings/withDirection";

const SignUpStyleWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
  background: url(/images/work.jpg) no-repeat center center;
  background-size: cover;

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    display: flex;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    z-index: 1;
    top: 0;
    left: ${props => (props["data-rtl"] === "rtl" ? "inherit" : "0")};
    right: ${props => (props["data-rtl"] === "rtl" ? "0" : "inherit")};
  }

  .tavSignUpContentWrapper {
    width: 500px;
    height: 100%;
    overflow-y: auto;
    z-index: 10;
    position: relative;
  }

  .tavSignUpContent {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    padding: 70px 50px;
    position: relative;
    background-color: #ffffff;

    @media only screen and (max-width: 767px) {
      width: 100%;
      padding: 70px 20px;
    }

    .tavLogoWrapper {
      width: 100%;
      display: flex;
      margin-bottom: 50px;
      justify-content: center;
      flex-shrink: 0;

      a {
        font-size: 24px;
        font-weight: 300;
        line-height: 1;
        text-transform: uppercase;
        color: ${palette("secondary", 2)};
      }
    }

    .tavSignUpForm {
      width: 100%;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;

      .tavInputWrapper {
        margin-bottom: 15px;

        &:last-child {
          margin-bottom: 0;
        }

        input {
          &::-webkit-input-placeholder {
            color: ${palette("grayscale", 0)};
          }

          &:-moz-placeholder {
            color: ${palette("grayscale", 0)};
          }

          &::-moz-placeholder {
            color: ${palette("grayscale", 0)};
          }
          &:-ms-input-placeholder {
            color: ${palette("grayscale", 0)};
          }
        }
      }

      .tavLeftRightComponent {
        input {
          width: calc(100% - 10px);

          &:first-child {
            margin-right: ${props =>
              props["data-rtl"] === "rtl" ? "inherit" : "20px"};
            margin-left: ${props =>
              props["data-rtl"] === "rtl" ? "20px" : "inherit"};
          }
        }
      }

      .tavHelperWrapper {
        margin-top: 35px;
        flex-direction: column;
      }

      .tavForgotPass {
        font-size: 12px;
        color: ${palette("text", 2)};
        margin-bottom: 10px;

        &:hover {
          color: ${palette("primary", 0)};
        }
      }

      button {
        font-weight: 500;
        width: 100%;
        height: 42px;
        border: 0;

        &.btnFacebook {
          background-color: ${palette("color", 7)};

          &:hover {
            background-color: ${palette("color", 8)};
          }
        }

        &.btnGooglePlus {
          background-color: ${palette("color", 9)};
          margin-top: 15px;

          &:hover {
            background-color: ${palette("color", 10)};
          }
        }

        &.btnAuthZero {
          background-color: ${palette("color", 11)};
          margin-top: 15px;

          &:hover {
            background-color: ${palette("color", 12)};
          }
        }

        &.btnFirebase {
          background-color: ${palette("color", 5)};
          margin-top: 15px;

          &:hover {
            background-color: ${palette("color", 6)};
          }
        }
      }
    }
  }
`;

export default WithDirection(SignUpStyleWrapper);
