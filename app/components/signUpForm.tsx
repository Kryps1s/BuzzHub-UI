"use client";
import { useState } from "react";
import { Stepper, Button, Group, TextInput, Code } from "@mantine/core";
import { useForm } from "@mantine/form";
import PasswordStrength from "./passwordStrength";
import SelectTrelloMembersTable from "./selectTrelloMembersTable";
import { TrelloMember } from "../lib/types/types";

interface SignUpFormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  trello: TrelloMember[];
  code: string;
}

const SignUpForm = ( { } ) : React.JSX.Element => {

  const trelloData = [
    {
      "id": "5e6a57617b6a8f865837b846",
      "fullName": "Aleksandra K",
      "username": "aleksandrak39"
    },
    {
      "id": "64205f5e3e4ed46f0013bd51",
      "fullName": "Asmaa Beaury",
      "username": "asmaabeaury"
    },
    {
      "id": "6425c215cc9f00da98155c45",
      "fullName": "Audrey Steiner",
      "username": "audreysteiner"
    },
    {
      "id": "625cca736c2f058c546c8111",
      "fullName": "Bakar Amara",
      "username": "bakaramara"
    },
    {
      "id": "625f6e9e6922e141bf05fae2",
      "fullName": "Camille",
      "username": "camillethompson8"
    },
    {
      "id": "585a7e82c8a3142c77cfb22e",
      "fullName": "Collectif d'apiculture du Santropol Roulant Beekeeping Collective",
      "username": "collectifdapiculturedusantropolroulantbeekeepingcollective1"
    },
    {
      "id": "6429847ad18a08f04c401fb7",
      "fullName": "Doug Turner",
      "username": "dougturner45"
    },
    {
      "id": "626194d4c9873f601f82fd0f",
      "fullName": "Elliot O'Reilly",
      "username": "elliotoreilly"
    },
    {
      "id": "62602ead27ba1a4f5b2a1828",
      "fullName": "e.dimanche",
      "username": "elyse_dimanche"
    },
    {
      "id": "605337f45554c43240c8da2f",
      "fullName": "Ginette Petit",
      "username": "ginettepetit3"
    },
    {
      "id": "644ae24c906fa0b6c72e76b8",
      "fullName": "Izzy",
      "username": "izzy24768109"
    },
    {
      "id": "64260e49b694bbb2b4e31501",
      "fullName": "James Mourani",
      "username": "jmourani1"
    },
    {
      "id": "5e5fc0313e86098bb5574363",
      "fullName": "Johanna Tzountzouris",
      "username": "johannatzountzouris1"
    },
    {
      "id": "5fb5273568132b0e5531682d",
      "fullName": "Johnny",
      "username": "jox62981167"
    },
    {
      "id": "59c3f0792c3f1559de773372",
      "fullName": "Lafortune Arnaud",
      "username": "lafortunearnaud1"
    },
    {
      "id": "5f808652cb6e1333694ea129",
      "fullName": "Marie-Anne Viau",
      "username": "marieanneviau"
    },
    {
      "id": "6425bff72cbde0711abd4ec2",
      "fullName": "Nicola McColl",
      "username": "nicolamccoll"
    },
    {
      "id": "64389a7ea19830af9c915dd9",
      "fullName": "Sarah Breger",
      "username": "sbreg2"
    },
    {
      "id": "6260cc2fcd6e1f7c16ca5bdf",
      "fullName": "Viv Walz",
      "username": "vivwalz"
    },
    {
      "id": "535028c0831f2d8c5a6e12ca",
      "fullName": "marleym",
      "username": "marleym"
    }
  ];

  const [ active, setActive ] = useState ( 0 );
  const [ password, setPassword ] = useState( "" );

  const form = useForm ( {
    initialValues: {
      firstName: "",
      lastName: "",
      password: password,
      email: "",
      trello: [],
      code: ""
    } as SignUpFormProps,

    validate:  ( values ) => {
      if ( active === 0 ) {
        return {
          firstName:
            values.firstName.trim().length < 3
              ? "first name must include at least 3 characters"
              : null,
          lastName:
            values.lastName.trim().length < 3
              ? "last name must include at least 3 characters"
              : null,
          email: /^\S+@\S+$/.test ( values.email ) ? null : "Invalid email"
        };
      }

      if ( active === 1 ) {
        return {
          trello:null
        };
      }

      return {};
    }
  } );

  const nextStep = () =>
    setActive ( ( current ) => {
      if ( form.validate().hasErrors ) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    } );

  const prevStep = () => setActive ( ( current ) => ( current > 0 ? current - 1 : current ) );

  return (
    <>
      <Stepper active={active} breakpoint="sm">
        <Stepper.Step label="First step" description="Profile settings">
          <TextInput label="First Name" placeholder="First Name" {...form.getInputProps ( "firstName" )} />
          <TextInput mt="md"label="Last Name" placeholder="Last Name" {...form.getInputProps ( "lastName" )} />
          <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps ( "email" ) } />
          <PasswordStrength password={password} setPassword={setPassword} setFieldValue={form.setFieldValue} />
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Trello Linking">
          <SelectTrelloMembersTable data={ trelloData } setFormValue={form.setFieldValue} preselectedValues={form.values.trello} formValueName="trello"/>
        </Stepper.Step>

        <Stepper.Step label="Final step" description="Access Code">
          <p className="text-sm">BuzzHub is currently invitation only. please provide
                        the access code given to you by a BuzzHub admin</p>
          <TextInput
            mt="md"
            label="Access Code"
            placeholder="access code"
            {...form.getInputProps ( "code" ) }
          />
        </Stepper.Step>
        <Stepper.Completed>
          Completed! Form values:
          <Code block mt="xl">
            {JSON.stringify( form.values, null, 2 ) }
          </Code>
        </Stepper.Completed>
      </Stepper>

      <Group position="right" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
      </Group>
    </>
  );
};

export default SignUpForm;