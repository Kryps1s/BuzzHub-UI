"use client";
import { TrelloMember } from "@/app/lib/types/types";
import { Button, Loader, Modal } from "@mantine/core";
import { IconPencil, IconSpeakerphone, IconTool } from "@tabler/icons-react";
import { useState } from "react";
import { BuzzhubColors } from "@/app/lib/types/types";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import SelectTrelloMembersTable from "../selectTrelloMembersTable";
import { POST } from "@/app/api/graphql/route";

interface MeetingDetailsProps {
  details : {
    date: string;
    roles: { name: string; value: TrelloMember }[];
    id: string;
  },
  trelloMembers: TrelloMember[];
}

const MeetingDetails: React.FC<MeetingDetailsProps> = ( { details, trelloMembers } : MeetingDetailsProps ) => {
  const [ opened, { open, close } ] = useDisclosure( false );
  const isMobile = useMediaQuery( "(max-width: 50em)" );
  const [ selectedRole, setSelectedRole ] = useState( "" );
  const [ singleSelect, setSingleSelect ] = useState( "" );
  const [ loading, setLoading ] = useState( false );
  const [ error, setError ] = useState( "" );

  const getRoleIcon = ( name : string, emoji = false ) => {
    switch ( name.toLowerCase() ) {
    case "scribe":
      return emoji ? "✏️" : <IconPencil color={BuzzhubColors.YELLOW} />;
    case "jockey":
      return emoji ? "🔧" : <IconTool color={BuzzhubColors.YELLOW}/>;
    case "facilitator":
      return emoji? "📣" : <IconSpeakerphone color={BuzzhubColors.YELLOW} />;
    }
  };

  const getAssigned = ( name : string ) => {
    const role = details.roles.find( role => role.name === name );
    if ( role ) {
      return [ role.value ];
    }
    return [];
  };

  const assignRole = async () => {
    const newRoles = details.roles.map( role => {
      const emoji = getRoleIcon( role.name, true );
      if ( role.name === selectedRole ) {
        return `${emoji}${role.name}: @${singleSelect}`;
      } else {
        return `${emoji}${role.name}: @${role.value.username}`;
      }
    } );
    const resultString = newRoles.join( "\\n\\n" );

    const gql = `
    mutation MyMutation {
      updateEvent(eventId: "${details.id}", updates: {desc: "${resultString}"})
    }
    `;

    try {
      setLoading( true );
      const req = new Request( "http://buzzhub.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify( {
          query: gql
        } )
      } );

      const response = await POST( req );

      if ( !response.errors ) {
        //update the details prop
        details.roles[details.roles.findIndex( role => role.name === selectedRole )].value = trelloMembers.find( member => member.username === singleSelect ) as TrelloMember;

        close();
      } else {
        setError( response.errors ? response.errors[0].message : "Unknown error" );
      }
    } catch ( error ) {
      if ( error instanceof Error ) {
        setError( error.message );
      }
    } finally {
      setLoading( false );
    }
  };

  const closeModal = () => {
    close();
    setSingleSelect( "" );
  };

  const openModal = ( role : string ) : void => {
    setSelectedRole( role );
    setError( "" );
    open();
  };

  const { date, roles } = details;
  return(
    <>
      <Modal opened={opened} onClose={closeModal}
        fullScreen={isMobile}
        title={`Reassign ${selectedRole}`}>
        <SelectTrelloMembersTable
          data={trelloMembers}
          setFormValue={() => ""}
          formValueName={""}
          preselectedValues={getAssigned( selectedRole )}
          options={{ singleSelect, setSingleSelect }}/>
        <section className="flex flex-row-reverse gap-2">
          <Button id="assignModal" className="mt-4 border bg-cyan-700 border-slate-200" disabled={singleSelect === "" || loading} onClick={assignRole}>{loading ? <Loader className="my-auto" size={"sm"} /> : <p>Assign</p> }</Button>
          <Button id="closeModal" className="mt-4 border bg-cyan-700 border-slate-200" onClick={closeModal}>Close</Button>
          {error && <div>{error}</div>}
        </section>
      </Modal>

      <header className="flex flex-col align-middle justify-center">
        <section className="mx-auto">
          <h1 className="text-xl" >Next Meeting: {date}</h1>
        </section>
        <section className="mx-auto">
          <article className="mx-auto">
            <span className="flex">
              {roles.length === 0 ?
                <p>No roles found</p> :
                <>
                  <h2 className="mr-2">Roles:</h2>
                  {roles.map( ( role, index ) => (
                    <Button
                      className="mr-2"
                      color={BuzzhubColors.GREEN_DARK}
                      variant="outline"
                      key={index}
                      onClick={() => {
                        openModal( role.name );
                      }}
                    >
                      {getRoleIcon( role.name )} {role.name} : {role.value.fullName}
                    </Button>
                  ) )}
                </>
              }

            </span>
          </article>
        </section>

      </header>
    </>
  );
};

export default MeetingDetails;
