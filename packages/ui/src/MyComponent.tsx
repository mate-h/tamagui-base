import { styled, Stack } from 'tamagui'

export const MyComponent = styled(Stack, {
  name: 'MyComponent',
  backgroundColor: 'red',

  variants: {
    blue: {
      true: {
        backgroundColor: 'blue',
      },
    },
  } as const,
})
