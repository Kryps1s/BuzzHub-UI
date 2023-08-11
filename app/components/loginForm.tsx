"use client";
import { Button, Group, TextInput, PasswordInput, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";

type LoginFormProps = {
  login: ( email: string, password: string ) => void;
  loginErrorMessage: string;
  loading: boolean;
};
//pass in login function as prop
const LoginForm = ( { login, loginErrorMessage, loading }: LoginFormProps ) : React.JSX.Element => {

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
      { loading && <Loader className="mx-auto mt-4" />}
      <Group position="right">
        <Button type="submit" disabled={ loading } variant="light" color="blue" onClick={() => login( form.values.email, form.values.password )}>Login</Button>
      </Group>
    </>
  );
};

export default LoginForm;