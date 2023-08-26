"use client";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  IconLogin,
  IconChevronDown,
  IconLogout
} from "@tabler/icons-react";
import { POST } from "@/app/api/graphql/route";
import { getCookie, hasCookie, deleteCookie } from "cookies-next";
import LoginForm from "./loginForm";
import {
  UnstyledButton,
  Group,
  Text,
  Menu,
  rem,
  Modal
} from "@mantine/core";

const LoginButton = () => {
  const [ displayName, setDisplayName ] = useState( "Log In" );
  const [ loading, setLoading ] = useState( false );
  const [ loginErrorMessage, setLoginErrorMessage ] = useState( "" );
  const [ loginOpened, { open, close } ] = useDisclosure( false );
  const [ userMenuOpened, setUserMenuOpened ] = useState( false );
  useEffect( () => {
    // This effect runs after the component is mounted on the client
    if ( hasCookie( "name" ) ) {
      const name = getCookie( "name" );
      if ( typeof name === "string" ) {
        setDisplayName( "admin" );
      }
    }
    else{
      setDisplayName( "Log In" );
    }
  }, [] );
  const handleLoginClick = () => {
    setLoginErrorMessage( "" );
    open();
  };

  const login = async ( email: string, password: string ) => {
    const req = new Request( "http://buzzhub.com", {
      method: "POST",
      body: JSON.stringify( {
        query: `
          mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              access_token
            }
          }
        `,
        variables: {
          email: email,
          password: password
        }
      } )
    } );
    try{
      setLoading( true );
      await POST( req );
      setDisplayName( "admin" );
      close();
    }
    catch( err : unknown ) {
      if( err instanceof Error )
      {
        setLoginErrorMessage( err.message );
      }else{
        console.error( err );
        setLoginErrorMessage( "Unknown error" );
      }
    }
    finally{
      setLoading( false );
    }
  };
  const logout = () => {
    deleteCookie( "access_token" );
    deleteCookie( "name" );
    setDisplayName( "Log In" );
  };

  return (
    <>
      {displayName === "admin" ?
        <Menu
          width={260}
          position="bottom-end"
          transitionProps={{ transition: "pop-top-right" }}
          onClose={() => setUserMenuOpened( false )}
          onOpen={() => setUserMenuOpened( true )}
          withinPortal
        >
          <Menu.Target>
            <UnstyledButton
              className="text-black my-auto h-6 px-2 py-1 rounded-md flex align-middle justify-center hover:bg-gray-200 radius-sm transition-colors duration-100 ease-linear">
              <Group spacing={7}>
                <Image src="/images/SR_avatar_transparent.png" alt="Avatar" className="h-5 w-5" width={20} height={20}/>
                <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                  {displayName}
                </Text>
                <IconChevronDown size={rem( 12 )} stroke={1.5} />
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={ logout } icon={<IconLogout className="h-4 w-4" stroke={1.5} />}>Logout</Menu.Item>
          </Menu.Dropdown>
        </Menu>
        :
        <UnstyledButton
          id="loginModalOpen"
          className="text-black px-2 py-1 rounded-md hover:bg-gray-200 radius-sm transition-colors duration-100 ease-linear"
          onClick={ handleLoginClick }
        >
          <Group spacing={7}>

            <IconLogin className="h-4 w-4" stroke={1.5} />
            <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
              {displayName}
            </Text>
          </Group>
        </UnstyledButton>
      }
      <Modal opened={loginOpened} onClose={close} title="Login to BuzzHub">
        <LoginForm loginErrorMessage={ loginErrorMessage } login={ login } loading={ loading }/>
      </Modal>
    </>
  );
};
export default LoginButton;