"use client";
import { createStyles, Paper, Text, Title, rem } from "@mantine/core";
import Link from "next/link";
import { EventCard } from "../lib/types";

const stockImage = "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80";

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

export function ArticleCardImage ( { past, upcoming = null } : { past: EventCard, upcoming: EventCard | null} ) {
  let temp = upcoming;
  if ( temp === null ) temp = past;//this will be removed when we have global state management, bypassing ts error for now
  const { name, image = stockImage, jobs = [], hives = [], location = "", eventId } = past;
  const event = past;
  const { classes } = useStyles();
  let categoryText, titleText;
  switch ( event.type ) {
  case "BEEKEEPING":
    titleText = hives.length > 0 ? hives.join( ", " ) : name;
    categoryText = jobs.join( ", " );
    break;
  case "MEETING":
    titleText = name;
    categoryText = `${location} MEETING`;
  }
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
            <Text className={classes.category}>{categoryText}</Text>
            <Title order={3} className={classes.title}>
              {titleText}
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
          <Text className={classes.category}>{categoryText}</Text>
          <Title order={3} className={classes.title}>
            {titleText}
          </Title>
        </div>
      </Paper>
    );

}