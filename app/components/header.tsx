"use client";
import { useState, useEffect } from "react";
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  rem,
  Modal
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLogin,
  IconChevronDown,
  IconLogout
} from "@tabler/icons-react";
import LoginForm from "./loginForm";
import Link from "next/link";
import Image from "next/image";
import { POST } from "../api/graphql/route";
import { setCookie, getCookie, hasCookie, deleteCookie } from "cookies-next";

const useStyles = createStyles( ( theme ) => ( {
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    borderBottom: `${rem( 1 )} solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[2]
    }`,
    marginBottom: rem( 10 )
  },

  mainSection: {
    paddingBottom: theme.spacing.sm
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white
    }

  },

  burger: {
    [theme.fn.largerThan( "xs" )]: {
      display: "none"
    }
  },

  userActive: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white
  },

  tabs: {
    [theme.fn.smallerThan( "sm" )]: {
      display: "none"
    }
  },

  tabsList: {
    borderBottom: "0 !important"
  },

  tab: {
    fontWeight: 500,
    height: rem( 38 ),
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    },

    "&[data-active]": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      borderColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    }
  }
} ) );

interface HeaderTabsProps {
  tabs: string[];
}

export function HeaderTabs ( { tabs }: HeaderTabsProps ) {
  const { classes, cx } = useStyles();
  const [ loginOpened, { open, close } ] = useDisclosure( false );
  const [ userMenuOpened, setUserMenuOpened ] = useState( false );
  const [ loginErrorMessage, setLoginErrorMessage ] = useState( "" );
  const [ displayName, setDisplayName ] = useState( "" );
  useEffect( () => {
    // This effect runs after the component is mounted on the client
    if ( hasCookie( "name" ) ) {
      const name = getCookie( "name" );
      if ( typeof name === "string" ) {
        setDisplayName( "admin" );
      }
    }
    else{
      setDisplayName( "Guest" );
    }
  }, [] );
  const login = async ( email: string, password: string ) => {
    const req = new Request( "", {
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
      const res = await POST( req );
      //set a cookie with the access token, refresh token, and email, name, and trello
      setCookie( "access_token", res.login.access_token );
      setCookie( "name", "admin" );
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
  };

  const handleLoginClick = () => {
    setLoginErrorMessage( "" );
    open();
  };

  const logout = () => {
    deleteCookie( "access_token" );
    deleteCookie( "refresh_token" );
    deleteCookie( "email" );
    deleteCookie( "name" );
    deleteCookie( "trello" );
    setDisplayName( "Guest" );
  };
  const items = tabs.map( ( tab ) => {
    if ( tab === "home" ) {
      return (

        <Link key={tab} href="/">
          <Tabs.Tab value={tab} id={tab} key={tab}>{tab}</Tabs.Tab>
        </Link>

      );
    } else {
      return (

        <Link key={tab} href={`/${tab}`}>
          <Tabs.Tab value={tab} id={tab} key={tab}>
            {tab}
          </Tabs.Tab>
        </Link>

      );
    }
  } );

  return (
    <>
      <div className={classes.header}>
        <Container className={classes.mainSection}>
          <Group position="apart">
            <Link href="/">
              <Image
                src="/images/Buzzhub_Logo.svg"
                alt="Logo"
                width={75}
                height={75}
              />
            </Link>

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
                  className={cx( classes.user, { [classes.userActive]: userMenuOpened } )}
                >
                  <Group spacing={7}>
                    <Avatar radius="xl" size={20} />
                    <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                      {displayName}
                    </Text>
                    <IconChevronDown size={rem( 12 )} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                {hasCookie( "access_token" ) ? (
                  <Menu.Item onClick={ logout } icon={<IconLogout size="0.9rem" stroke={1.5} />}>Logout</Menu.Item>
                ) : (
                  <Menu.Item onClick={ handleLoginClick } icon={<IconLogin size="0.9rem" stroke={1.5} />}>Login</Menu.Item>
                )}
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Container>
        <Container>
          <Tabs
            defaultValue="Home"
            variant="outline"
            classNames={{
              root: classes.tabs,
              tabsList: classes.tabsList,
              tab: classes.tab
            }}
          >
            <Tabs.List>{items}</Tabs.List>
          </Tabs>
        </Container>
      </div>
      <Modal opened={loginOpened} onClose={close} title="Login to BuzzHub">
        <LoginForm loginErrorMessage={ loginErrorMessage } login={ login }/>
      </Modal>
    </>
  );
}