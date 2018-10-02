import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, LocaleProvider } from "antd";
import { IntlProvider } from "react-intl";
import { Debounce } from "react-throttle";
import WindowResizeListener from "react-window-size-listener";
import { ThemeProvider } from "styled-components";
import appActions from "../actions";
import Sidebar from "containers/Sidebar/Sidebar";
import Topbar from "containers/Topbar/Topbar";
import ThemeSwitcher from "containers/ThemeSwitcher/index";
import PrivateRoutes from "src/privateRoutes";
import { siteConfig } from "settings/index";
import { language } from "settings";
import { AppLocale } from "../baseLayout";
import themes from "settings/themes/index";
import AppHolder from "./commonStyle";
import "settings/styles/antd/global.less";
import {toJS} from 'utils/higherOrderComponents/toJsHoc';

const { Content, Footer } = Layout;
const { toggleAll } = appActions;
export class App extends Component {
  render() {
    const { url } = this.props.match;
    const { locale = language, selectedTheme = "themedefault", height } = this.props;
    const currentAppLocale = AppLocale[locale];
    return (
      <LocaleProvider locale={currentAppLocale.antd}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <ThemeProvider theme={themes[selectedTheme]}>
            <AppHolder>
              <Layout style={{ height: "100vh" }}>
                <Debounce time="1000" handler="onResize">
                  <WindowResizeListener
                    onResize={windowSize =>
                      this.props.toggleAll(
                        windowSize.windowWidth,
                        windowSize.windowHeight
                      )
                    }
                  />
                </Debounce>
                <Topbar url={url} />
                <Layout style={{ flexDirection: "row", overflowX: "hidden" }}>
                  <Sidebar url={url} />
                  <Layout
                    className="ovContentMainLayout"
                    style={{
                      height: height
                    }}
                  >
                    <Content
                      className="ovmorphicContent"
                      style={{
                        padding: "70px 0 0",
                        flexShrink: "0",
                        background: "#f1f3f6",
                        position: "relative"
                      }}
                    >
                      <PrivateRoutes url={url} />
                    </Content>
                    <Footer
                      style={{
                        background: "#ffffff",
                        textAlign: "center",
                        borderTop: "1px solid #ededed"
                      }}
                    >
                      {siteConfig.footerText}
                    </Footer>
                  </Layout>
                </Layout>
                {/*<ThemeSwitcher />*/}
              </Layout>
            </AppHolder>
          </ThemeProvider>
        </IntlProvider>
      </LocaleProvider>
    );
  }
}

const mapStateToProps = state => ({
    selectedTheme: state.getIn(["ThemeSwitcher","changeThemes","themeName"]),
    locale: state.getIn(["LanguageSwitcher","language","locale"]),
    height: state.getIn(["App","height"])
});

const mapDispatchToProps = { toggleAll };

export default connect(mapStateToProps, mapDispatchToProps)(toJS(App));
