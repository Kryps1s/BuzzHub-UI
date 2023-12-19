"use client";
import { TrelloMember } from "@/app/lib/types/types";
import { Button, Modal } from "@mantine/core";
import { IconPencil, IconSpeakerphone, IconTool } from "@tabler/icons-react";
import { useState } from "react";
import { BuzzhubColors } from "@/app/lib/types/types";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import SelectTrelloMembersTable from "../selectTrelloMembersTable";

interface MeetingDetailsProps {
  details : {
    date: string;
    roles: { name: string; value: TrelloMember }[];
  },
  trelloMembers: TrelloMember[];
}

const MeetingDetails: React.FC<MeetingDetailsProps> = ( { details, trelloMembers } : MeetingDetailsProps ) => {
  const [ opened, { open, close } ] = useDisclosure( false );
  const isMobile = useMediaQuery( "(max-width: 50em)" );
  const [ selectedRole, setSelectedRole ] = useState( "" );
  const [ singleSelect, setSingleSelect ] = useState( "" );
  const getRoleIcon = ( name : string ) => {
    switch ( name.toLowerCase() ) {
    case "scribe":
      return <IconPencil color={BuzzhubColors.YELLOW} />;
    case "jockey":
      return <IconTool color={BuzzhubColors.YELLOW}/>;
    case "facilitator":
      return <IconSpeakerphone color={BuzzhubColors.YELLOW} />;
    }
  };

  const getAssigned = ( name : string ) => {
    const role = details.roles.find( role => role.name === name );
    if ( role ) {
      return [ role.value ];
    }
    return [];
  };

  const assignRole = () => {
    closeModal();
  };

  const closeModal = () => {
    close();
    setSingleSelect( "" );
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
        <section className="float-right">
          <Button className="mt-4 border bg-cyan-700 border-slate-200" onClick={closeModal}>Close</Button>
          <Button className="mt-4 border bg-cyan-700 border-slate-200" disabled={singleSelect === ""} onClick={assignRole}>Assign</Button>
        </section>

      </Modal>
      <div className="flex flex-col align-middle justify-center">
        <section className="mx-auto">
          <h1 >Next Meeting: {date}</h1>
        </section>
        <section className="mx-auto">
          <div className="mx-auto">
            <span className="flex">
              <h2 className="mr-2">Roles:</h2>
              {roles.map( ( role ) => (
                <>
                  <Button className="mr-2"
                    color={BuzzhubColors.GREEN_DARK}
                    variant="outline" key={role.value.id}
                    onClick={() => {open();setSelectedRole( role.name );}}>
                    {getRoleIcon( role.name )} {role.name} : {role.value.fullName}
                  </Button>
                </>

              ) )}
            </span>
          </div>
        </section>

      </div>
    </>

  );
};

export default MeetingDetails;
