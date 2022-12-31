# Some helpful packages

- UI : https://docs.nativebase.io/getting-started
- UI : https://callstack.github.io/react-native-paper/getting-started.html
- Location : @react-native-community/geolocation
- PDF : [react-native-pdf](https://www.npmjs.com/package/react-native-pdf)
- WebView: https://www.npmjs.com/package/react-native-webview
- Toast: https://www.npmjs.com/package/react-native-easy-toast
- https://www.npmjs.com/package/react-native-toast-message
- Device Info: https://www.npmjs.com/package/react-native-device-info
- Date: https://www.npmjs.com/package/react-native-date-picker
- Dropdown: https://www.npmjs.com/package/react-native-element-dropdown
- Date Utility Library: https://www.npmjs.com/package/date-fns
- Image Resizer: https://www.npmjs.com/package/@bam.tech/react-native-image-resizer
- NetInfo : https://www.npmjs.com/package/@react-native-community/netinfo
- Camera: https://www.npmjs.com/package/react-native-camera-kit
- Video Call: https://www.npmjs.com/package/@telnyx/video-react-native
- Video Player: https://github.com/MatrixFrog/react-native-video#11ca8a6799f932a5f24da85dfe68c696ad13a753
- Video Player: https://docs.expo.dev/versions/latest/sdk/av/
- Slider: https://www.npmjs.com/package/@react-native-community/slider
- Switch Selector: https://www.npmjs.com/package/react-native-switch-selector
- Encryption: @dhairyasharma/react-native-encryption
- Bottom Sheet: https://gorhom.github.io/react-native-bottom-sheet/

# Use of Custom Components

```js
import { useState } from "react";
import { View, Text, Platform } from "react-native";
import { MazicTextInput, MazicButton } from "react-native-mazic-components";


export default function App() {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(true);
  const [mobile, setMobile] = useState("");
  const [mobErr, setMobErr] = useState(true);

  const onSubmitPress = () => {
    alert("Clicked");
  };
  return (
    <View
      className="App"
      style={{
        alignItems: "center",
        marginTop: Platform.OS === 'android' ? 25 : 64
      }}
    >
      <Text style={{fontSize:18, margin:10}}>Mazic Text Input Example</Text>
      <MazicTextInput
        value={mobile}
        setValue={setMobile}
        err={mobErr}
        setErr={setMobErr}
        errorPosition="normal"
        hideTitle={true}
        placeholder="Mobile No"
        validation={["no-space", "only-digits", "min", "max"]}
        min={10}
        max={10}
        mb={20}
      />
      <MazicTextInput
        value={email}
        setValue={setEmail}
        err={emailErr}
        setErr={setEmailErr}
        placeholder="Email"
        validation={["valid-email"]}
        mb={20}
        style={{ borderRadius: 20, borderColor: "green" }}
      />
      <MazicButton
        title={"SUBMIT"}
        onPressFn={onSubmitPress}
        disabled={emailErr || mobErr}
        bgc="tomato"
        sc="tomato"
      />
    </View>
  );
}
```
