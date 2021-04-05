export type ThemeType = typeof light;

export const light = {
  text: '#2F2E2E',
  background: '#efefef',
  borderRadius: '4px',
  border: '1px solid #afafaf',
}

export const dark: ThemeType = {
  text: '#fff',
  background: '#404040',
  borderRadius: '4px',
  border: '1px solid #404040',
}

const theme = light;
export default theme;