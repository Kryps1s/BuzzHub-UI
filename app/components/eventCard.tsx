"use client";
import { createStyles, Paper, Text, Title, rem } from "@mantine/core";
import Link from "next/link";
import { EventCard } from "../lib/types";

const useStyles = createStyles( ( theme ) => ( {
  card: {
    height: rem( 150 ),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },

  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: rem( 32 ),
    marginTop: theme.spacing.xs
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase"
  }
} ) );

export function ArticleCardImage ( { image, name, jobs, eventId }: EventCard ) {
  const { classes } = useStyles();

  if ( jobs.includes( "INSPECT" ) ) {
    return (
      <Link href={`/event/${eventId}`}>
        <Paper
          shadow="md"
          p="xl"
          radius="md"
          sx={{ backgroundImage: `url(${image})` }}
          className={classes.card}
        >
          <div>
            <Text className={classes.category}>{jobs.join( ", " )}</Text>
            <Title order={3} className={classes.title}>
              {name}
            </Title>
          </div>
        </Paper>
      </Link>

    );
  }else
    return (
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        sx={{ backgroundImage: `url(${image})` }}
        className={classes.card}
      >
        <div>
          <Text className={classes.category}>{jobs.join( ", " )}</Text>
          <Title order={3} className={classes.title}>
            {name}
          </Title>
        </div>
      </Paper>
    );

}