import { useState, useEffect } from "react";
import { createStyles, Table, Checkbox, ScrollArea, Group, Text, rem, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { TrelloMember } from "../lib/types";

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

interface SearchSelectTableProps {
  data: TrelloMember[];
  formField: string;
  form: { values: { [key: string]: any }; setFieldValue: ( field: string, value: any ) => void };
}
const SearchSelectTable = ( { data, formField, form }: SearchSelectTableProps ) : JSX.Element => {
  const { classes, cx } = useStyles();
  const [ selection, setSelection ] = useState<string[]>( [] );
  const [ scrolled, setScrolled ] = useState<boolean>( false );
  const [ search, setSearch ] = useState<string>( "" );
  const [ localData, setLocalData ] = useState( data );
  const toggleRow = ( id: string ) =>
    setSelection ( ( current:string[] ) => current.includes ( id ) ? current.filter ( ( item ) => item !== id ) : [ ...current, id ]
    );
  const setFormField = () => {
    //get all values for each selected id
    const selected = selection.map( ( id ) => data.find( ( item ) => item.id === id )! );
    if ( selected.length === 0 ) {
      form.setFieldValue( formField, [] );
    }
    else{
      form.setFieldValue( formField, selected );
    }

  };
  useEffect( () => {
    setFormField();
  }, [ selection ] );

  //select rows that are already selected when the component mounts
  useEffect( () => {
    const selected = ( form.values[formField] as TrelloMember[] ).map( ( item ) => item.id );
    setSelection( selected );
  } );

  const rows = localData.map( ( item ) => {
    const selected = selection.includes( item.id );
    return (
      <tr key={item.id} className={cx( { [classes.rowSelected]: selected } )}>
        <td>
          <Checkbox
            checked={selection.includes( item.id )}
            onChange={() => toggleRow( item.id )}
          />
        </td>
        <td>
          <Group spacing="sm">
            <Text size="sm" weight={500}>
              {item.fullName}
            </Text>
          </Group>
        </td>
      </tr>
    );
  } );

  const handleSearchChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    const { value } = event.currentTarget;
    setSearch( value );
    setLocalData( data.filter( val => val.fullName.toLowerCase().includes( value.toLowerCase() ) || val.username.toLowerCase().includes( value.toLowerCase() ) ) );
  };

  return (
    <>
      <TextInput
        placeholder="Search"
        mb="md"
        icon={<IconSearch size="0.9rem" stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <ScrollArea h={500} onScrollPositionChange={( { y } ) => setScrolled( y !== 0 )}>
        <Table horizontalSpacing="md" verticalSpacing="xs" miw={100} sx={{ tableLayout: "fixed" }}>
          <thead className={`${cx( classes.header, { [classes.scrolled]: scrolled } )} z-[1]`}>
            <tr>
              <th style={{ width: rem ( 40 ) }}>
              </th>
              <th>Full Name</th>
            </tr>
          </thead>
          <tbody>
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
      </ScrollArea>
    </>
  );
};

export default SearchSelectTable;