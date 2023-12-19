import { useState, useEffect } from "react";
import { createStyles, Table, Checkbox, ScrollArea, Group, Text, rem, TextInput, Radio } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { TrelloMember } from "../lib/types/types";

const useStyles = createStyles( ( theme ) => ( {
  header: {
    position: "sticky",
    top: 0,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: "\"\"",
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem( 1 )} solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[2]
      }`
    }
  },
  scrolled: {
    boxShadow: theme.shadows.sm
  },
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba( theme.colors[theme.primaryColor][7], 0.2 )
        : theme.colors[theme.primaryColor][0]
  }
} ) );

interface SelectTrelloMembersTableProps {
  data: TrelloMember[];
  setFormValue: ( type: string, value: TrelloMember[] ) => void;
  formValueName: string;
  preselectedValues: TrelloMember[];
  options?: {
    leader?: {
      leader: string;
      setLeader: ( value: string ) => void;
    }
    singleSelect?: boolean | string;
    setSingleSelect?: ( value: string ) => void;
  };
}
const SelectTrelloMembersTable = ( { data, setFormValue, formValueName, preselectedValues, options }: SelectTrelloMembersTableProps ) : JSX.Element => {
  const { classes, cx } = useStyles();
  const [ selection, setSelection ] = useState<string[]>( preselectedValues.map( ( value ) => value.id ) );
  const [ scrolled, setScrolled ] = useState<boolean>( false );
  const [ search, setSearch ] = useState<string>( "" );
  const [ localData, setLocalData ] = useState( data );
  const toggleRow = ( id: string ) =>
    setSelection ( ( current:string[] ) => current.includes ( id ) ? current.filter ( ( item ) => item !== id ) : [ ...current, id ]
    );

  useEffect( () => {
    const selected = data.filter( ( item ) => selection.includes( item.id ) );
    if ( selected.length === 0 ) {
      setFormValue( formValueName, [] );
    }
    else{
      setFormValue( formValueName, selected );
    }
  }, [ selection, data, formValueName, setFormValue ] );

  const rows = localData.map( ( item ) => {
    const selected = selection.includes( item.id );
    return (
      <tr key={item.id} className={cx( { [classes.rowSelected]: selected } )}>
        <td>
          { options?.singleSelect !== undefined ? <Radio
            value={item.fullName}
            onClick={() => options?.setSingleSelect?.( "assigned" ) ?? undefined}
            disabled={selection.includes( item.id )} id={`radio-${item.id}`}></Radio>
            :
            <Checkbox id={`checkbox-${item.id}`}
              checked={selection.includes( item.id )}
              onChange={() => toggleRow( item.id )}
            />
          }
        </td>
        <td>
          <Group spacing="sm">
            <Text size="sm" weight={500}>
              {item.fullName}
            </Text>
          </Group>
        </td>
        {options?.leader &&
        <td>
          <Radio value={item.fullName} id={`radio-${item.id}`}
          ></Radio>
        </td>}
      </tr>
    );
  } );

  const handleSearchChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    const { value } = event.currentTarget;
    setSearch( value );
    setLocalData( data.filter( val => val.fullName.toLowerCase().includes( value.toLowerCase() ) || val.username.toLowerCase().includes( value.toLowerCase() ) ) );
  };

  return (
    <div className="flex flex-col h-full">
      <TextInput
        placeholder="Search"
        mb="md"
        icon={<IconSearch size="0.9rem" stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <ScrollArea className="flex-grow" onScrollPositionChange={( { y } ) => setScrolled( y !== 0 )}>

        <Radio.Group
          value={options?.leader?.leader}
          onChange={( value ) => options?.leader?.setLeader( value )}
        >
          <Table horizontalSpacing="md" verticalSpacing="xs" miw={50} sx={{ tableLayout: "fixed" }}>
            <thead className={`${cx( classes.header, { [classes.scrolled]: scrolled } )} z-[1]`}>
              <tr>
                <th style={{ width: rem ( 40 ) }}>
                </th>
                <th>Full Name</th>
                {options?.leader && <th style={{ width: rem ( 70 ) }}>Leader</th>}
              </tr>
            </thead>
            <tbody className="overflow-y-scroll">
              {rows.length > 0 ? (
                rows
              ) : (
                <tr>
                  <td colSpan={Object.keys ( data[0] ).length}>
                    <Text weight={500} align="center">
                    Nothing found
                    </Text>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Radio.Group>

      </ScrollArea>
    </div>
  );
};

export default SelectTrelloMembersTable;