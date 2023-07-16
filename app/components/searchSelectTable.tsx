import { useState } from "react";
import { createStyles, Table, Checkbox, ScrollArea, Group, Text, rem, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

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
  data: { fullName: string; username: string; id: string }[];
}
const SearchSelectTable = ( { data }: SearchSelectTableProps ) : JSX.Element => {
  const { classes, cx } = useStyles();
  const [ selection, setSelection ] = useState( [ "1" ] );
  const [ scrolled, setScrolled ] = useState( false );
  const [ search, setSearch ] = useState( "" );
  const toggleRow = ( id: string ) =>
    setSelection ( ( current ) =>
      current.includes ( id ) ? current.filter ( ( item ) => item !== id ) : [ ...current, id ]
    );
  const toggleAll = () =>
    setSelection( ( current ) => ( current.length === data.length ? [] : data.map( ( item ) => item.id ) ) );

  const rows = data.map( ( item ) => {
    const selected = selection.includes( item.id );
    return (
      <tr key={item.id} className={cx( { [classes.rowSelected]: selected } )}>
        <td>
          <Checkbox
            checked={selection.includes( item.id )}
            onChange={() => toggleRow( item.id )}
            transitionDuration={0}
          />
        </td>
        <td>
          <Group spacing="sm">
            <Text size="sm" weight={500}>
              {item.fullName}
            </Text>
          </Group>
        </td>
        <td>{item.username}</td>
      </tr>
    );
  } );

  const handleSearchChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    const { value } = event.currentTarget;
    setSearch( value );
  };

  return (
    <ScrollArea h={500} onScrollPositionChange={( { y } ) => setScrolled( y !== 0 )}>

      <TextInput
        placeholder="Search"
        mb="md"
        icon={<IconSearch size="0.9rem" stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} sx={{ tableLayout: "fixed" }}>
        <thead className={cx( classes.header, { [classes.scrolled]: scrolled } )}>
          <tr>
            <th style={{ width: rem ( 40 ) }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={selection.length > 0 && selection.length !== data.length}
                transitionDuration={0}
              />
            </th>
            <th>Full Name</th>
            <th>Username</th>
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
  );
};

export default SearchSelectTable;