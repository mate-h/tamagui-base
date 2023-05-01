import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Provider } from 'app/provider'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'
import Inter from '@tamagui/font-inter/otf/Inter-Medium.otf'
import InterBold from '@tamagui/font-inter/otf/Inter-Bold.otf'

export default function HomeLayout() {
  console.log('HomeLayout', {Inter, InterBold})
  const [loaded] = useFonts({
    Inter,
    InterBold,
  })
  const scheme = useColorScheme()

  if (!loaded) {
    return null
  }
  return (
    <Provider>
      <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack />
      </ThemeProvider>
    </Provider>
  )
}
