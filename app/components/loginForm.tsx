"use client";
import { Button, Group, TextInput, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";

type LoginFormProps = {
  login: ( email: string, password: string ) => void;
  loginErrorMessage: string;
};
//pass in login function as prop
const LoginForm = ( { login, loginErrorMessage }: LoginFormProps ) : React.JSX.Element => {

  const form = useForm ( {
    initialValues: {
      password: "",
      email: ""
    }
  } );

  return (
    <>
      <TextInput mt="md" label="Username" placeholder="Username" {...form.getInputProps ( "email" ) } />
      <PasswordInput label="Password" placeholder="Password" mt="md" { ...form.getInputProps ( "password" )}/>
      <p> {loginErrorMessage} </p>
      <Group position="right">
        <Button type="submit" variant="light" color="blue" onClick={() => login( form.values.email, form.values.password )}>Login</Button>
      </Group>
    </>
  );
};

export default LoginForm;