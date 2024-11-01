import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index"
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#8bc34a'
           } }
        } />
    </Stack>
  );
}