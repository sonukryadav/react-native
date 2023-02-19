import * as React from 'react';
import { 
  Text, View, StyleSheet, Platform,SafeAreaView, ScrollView,
  TextInput,Pressable, Alert
} from 'react-native';


const Pressable1 = ({title, bg})=>{
  return(
    <Pressable
    onPress={()=>Alert.alert(title)}
    style={({pressed})=>[
      {opacity:pressed ? 0.2 : 1,
      marginTop:30
      }
    ]}
    >
    {({pressed})=>(<Text style={{...styles.textPressable,backgroundColor:bg}}>{title}</Text>)}
    </Pressable>
  );
}

// password should be of 8 characters length
//     - password should contain 
//         - uppercase letter
//         - lowercase letter
//         - number
//         - special character


export default function App() {

  const [input, setInput] = React.useState({
    email:"",
    password:""
  })
  const[active, setActive] = React.useState(true);
  const invalid = `Your password is weak, it should have : \n- password should be of 8 characters length \n- password should contain\n- uppercase letter\n- lowercase letter\n- number\n- special character`;
  
  const inputs =(name, value)=>{
    setInput({...input, [name] : value});
  }

  React.useEffect(()=>{
    let password = input.password;

    let length = password.length;
    let upperCharLength = (()=>{
      let matches = password.match(/[A-Z]/g);
      return matches ? matches.length : 0;
    })();
    let lowerCharLength = (()=>{
      let matches = password.match(/[a-z]/g);
      return matches ? matches.length : 0;
    })();
    let digitLength = (()=>{
      let matches = password.match(/\d/g);
      return matches ? matches.length : 0;
    })();

    let specialCharLength = (()=>{
      let matches = password.match(/[^\w\s]/g);
      return matches ? matches.length : 0;
    })();

    if(length && upperCharLength  && lowerCharLength && digitLength  && specialCharLength ){
      setActive(false);
    }else{
      setActive(true)
    }
    // console.log(upperCharLength, lowerCharLength, digitLength, specialCharLength);
  },[input]);

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
    <Text style={styles.text1}>Login Page</Text>
    <TextInput 
    style={styles.input1}
    placeholder="Enter Email"
    value = {input.email}
    onChangeText={(email)=>inputs("email", email)}
    keyboardType="email-address"
    />
    <TextInput 
    style={styles.input1}
    placeholder="Enter Password"
    value = {input.password}
    onChangeText={(password)=>inputs("password", password)}
    secureTextEntry={true}
    />
    <Text style={{fontSize:14, marginHorizontal:20, marginVertical:-15, marginBottom:20}}>{active && invalid}</Text>
    <Pressable
    onPress={()=>Alert.alert("LOGIN clicked")}
    style={({pressed})=>[
      {opacity:pressed ? 0.2 : 1,
      }
    ]}
    disabled={active}
    >
    {({pressed})=>(<Text style={{...styles.textPressable,backgroundColor:!active ? "green":"grey"}}>LOGIN</Text>)}
    </Pressable>
    <Pressable1 title={"LOGIN WITH GOOGLE"} bg={"coral"}/>
    <Pressable1 title={"LOGIN WITH FACEBOOK"} bg={"lightblue"}/>
    </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'teal',
    marginTop:Platform.select({android:0, ios:0, web:0}),
    borderWidth:1,
    borderColor:"orange",
    paddingTop:50,
    padding:30,
  },
  input1 :{
    height:40,
    borderWidth:1.5,
    marginVertical:25,
    borderRadius:20,
    paddingLeft:20,
    fontSize:20,
    color:"white",
    placeholderTextColor:"grey",
  },
  text1:{
    fontSize:35,
    textAlign:"center",
    color:"white",
    fontWeight:"800",
  },
  textPressable:{
    borderWidth:1.5,
    borderRadius:20,
    padding:10,
    textAlign:"center",
    fontSize:20,
    fontWeight:500,
    overflow:"hidden"
  }
});
