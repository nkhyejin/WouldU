import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      background: string;
      nav: string;
      purpleBox: string;
      grayBox: string;
      button: string;
      buttonHover: string;
      point: string;
      border: string;
      borderPoint: string;
      fontMain: string;
      fontSub: string;
      white: string;
      fontPoint: string;
    };
    fontSize: {
      textXl: string;
      textLg: string;
      textMd: string;
      textMain: string;
      textSm: string;
      textXs: string;
    };
    borderSize: {
      borderMd: string;
      borderSm: string;
    };
  }
}
