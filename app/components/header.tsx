"use client";
import { useState } from "react";
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  Modal,
  Button
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLogout,
  IconLogin,
  IconChevronDown
} from "@tabler/icons-react";
import { MantineLogo } from "@mantine/ds";
import LoginForm from "./loginForm";
import Link from "next/link";

const useStyles = createStyles( ( theme ) => ( {
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    borderBottom: `${rem( 1 )} solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[2]
    }`,
    marginBottom: rem( 120 )
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
    },

    [theme.fn.smallerThan( "xs" )]: {
      display: "none"
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
  user: { name: string; image: string };
  tabs: string[];
}

export function HeaderTabs ( { user, tabs }: HeaderTabsProps ) {
  const { classes, theme, cx } = useStyles();
  const [ menuOpened, { toggle } ] = useDisclosure( false );
  const [ loginOpened, { open, close } ] = useDisclosure( false );
  const [ userMenuOpened, setUserMenuOpened ] = useState( false );
  const [ loginErrorMessage, setLoginErrorMessage ] = useState( "" );

  const login = async ( email: string, password: string ) => {
    //make a graphql call to login
    if( process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_KEY ) {
      const res = await fetch( process.env.NEXT_PUBLIC_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY
        },
        body: JSON.stringify( {
          query: `
            mutation Login($email: String!, $password: String!) {
              login(email: $email, password: $password) {
                access_token
                refresh_token
                name
                trello
                email
              }
            }
          `,
          variables: {
            email: email,
            password: password
          }
        } )
      } ).then( ( res ) => res.json() )
      if( res.errors ) {
        setLoginErrorMessage( res.errors[0].message );
        return res.errors[0].message;
      }
      else {  
        console.log( res.data.login );
        return res.data.login;
    }
  }};

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
          <MantineLogo size={28} />
          <Burger opened={menuOpened} onClick={toggle} className={classes.burger} size="sm" />
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
                  <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                    {user.name}
                  </Text>
                  <IconChevronDown size={rem( 12 )} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={ open } icon={<IconLogin size="0.9rem" stroke={1.5} />}>Login</Menu.Item>
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