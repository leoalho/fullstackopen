import { Platform } from 'react-native';

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6',
      secondary: '#ff1414',
      appBar: '#FFFFFF'
    },
    fontSizes: {
      body: 14,
      subheading: 16,
    },
    fonts: Platform.select({
        android: 'green',
        ios: 'blue',
        default: 'black',
    }),
    fontWeights: {
      normal: '400',
      bold: '700',
    },
  };
  
  export default theme;