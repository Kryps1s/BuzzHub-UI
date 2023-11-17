"use client";
import { Accordion } from "@mantine/core";
import TaskForm from "./task";
import { Agenda, Category } from "@/app/lib/types/types";

const MeetingAgenda = () =>
{
    const demoAgenda : Agenda = {

        "BEEKEEPING": {
          "unassigned": [
            {
              "eventId": "pNrBjQIH",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "Éducation/Education",
                "Newbees"
              ],
              "name": "Atelier 2.C. Avoiding/managing diseases and pests",
              "participants": [],
              "start": "2023-05-26T22:00:00.000Z"
            },
            {
              "eventId": "x2szAWl8",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:LAVANDE",
                "job:INSPECT"
              ],
              "name": "#hive Lavande - 29/05/2023: full inspection",
              "participants": [
                "626194d4c9873f601f82fd0f"
              ],
              "start": "2023-05-29T15:36:00.000Z"
            },
            {
              "eventId": "QyX49MHb",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "Éducation/Education",
                "Newbees"
              ],
              "name": "Atelier 2.D. Managing swarms",
              "participants": [],
              "start": "2023-06-13T22:00:00.000Z"
            },
            {
              "eventId": "m20cg13a",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:VIOLETTE",
                "job:INSPECT"
              ],
              "name": "#hive TOURNESOL - 18/06/2023: partial inspection",
              "participants": [],
              "start": "2023-06-18T15:36:00.000Z"
            },
            {
              "eventId": "WT9l6UFi",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:ROSE",
                "job:INSPECT"
              ],
              "name": "#hive ROSE - 23/06/2023: partial inspection",
              "participants": [],
              "start": "2023-06-23T15:36:00.000Z"
            },
            {
              "eventId": "fOuM6KBX",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "Éducation/Education",
                "Newbees"
              ],
              "name": "Atelier 2.E. Splitting a hive and requeening",
              "participants": [],
              "start": "2023-06-29T22:00:00.000Z"
            },
            {
              "eventId": "hyx3c5to",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:VIOLETTE",
                "job:INSPECT"
              ],
              "name": "#hive VIOLETTE - 30/06/2023: partial inspection",
              "participants": [],
              "start": "2023-06-30T15:36:00.000Z"
            },
            {
              "eventId": "Kb9TNufr",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:LAVANDE",
                "hive:TOURNESOL",
                "job:INSPECT"
              ],
              "name": "#hive LAVANDE/TOURNESOL - 03/07/2023: Check to see if the merge was successful",
              "participants": [],
              "start": "2023-07-03T15:36:00.000Z"
            },
            {
              "eventId": "HlNCk5KV",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:ROSE",
                "job:INSPECT"
              ],
              "name": "#hive Rose - 03/07/2023: partial inspection",
              "participants": [],
              "start": "2023-07-03T15:36:00.000Z"
            },
            {
              "eventId": "6SF3KMaE",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [],
              "name": "Pollinisateur Hôtel - Formation pour la fabrication et placer dans un endroit approprié",
              "participants": [],
              "start": "2023-07-04T22:00:00.000Z"
            },
            {
              "eventId": "eFzj34L4",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:VIOLETTE",
                "job:EXTRACT"
              ],
              "name": "#hive VIOLETTE - 09/07/2023: full inspection",
              "participants": [],
              "start": "2023-07-09T15:36:00.000Z"
            },
            {
              "eventId": "dbyvjZDE",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:TOURNESOL",
                "job:INSPECT"
              ],
              "name": "#hive TOURNESOL - 10-13/07/2023: full inspection",
              "participants": [],
              "start": "2023-07-12T15:36:00.000Z"
            },
            {
              "eventId": "Mera6fhV",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [],
              "name": "#hive ROSE - 14/07/2023: full inspection",
              "participants": [
                "626194d4c9873f601f82fd0f"
              ],
              "start": "2023-07-14T16:00:00.000Z"
            },
            {
              "eventId": "jLk0G5bA",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "job:EQUIPMENT"
              ],
              "name": "Fix screen door on roof",
              "participants": [],
              "start": "2023-07-18T16:00:00.000Z"
            },
            {
              "eventId": "CqTqMJ91",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "Éducation/Education",
                "Newbees"
              ],
              "name": "Atelier 2.F. Atelier sur l'hôtel des pollinisateurs",
              "participants": [],
              "start": "2023-07-19T22:00:00.000Z"
            },
            {
              "eventId": "J7DVi5hr",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:VIOLETTE",
                "job:INSPECT",
                "job:HARVEST"
              ],
              "name": "#hive VIOLETTE - 23/07/2023: partial inspection and harvest",
              "participants": [
                "626194d4c9873f601f82fd0f"
              ],
              "start": "2023-07-23T17:00:00.000Z"
            },
            {
              "eventId": "iCl1CZdf",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:TOURNESOL",
                "job:INSPECT"
              ],
              "name": "#hive Tournesol - 26/07/2023: partial inspection",
              "participants": [],
              "start": "2023-07-26T16:30:00.000Z"
            },
            {
              "eventId": "TSI9PHqa",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:VIOLETTE",
                "job:INSPECT",
                "job:HARVEST"
              ],
              "name": "#hive VIOLETTE - 29/07/2023: partial inspection and harvest",
              "participants": [],
              "start": "2023-07-29T19:30:00.000Z"
            },
            {
              "eventId": "WDOZMsrw",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "job:EXTRACT"
              ],
              "name": "1re extraction",
              "participants": [
                "626194d4c9873f601f82fd0f"
              ],
              "start": "2023-07-29T22:00:00.000Z"
            },
            {
              "eventId": "Rnw1qT4o",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "job:INSPECT",
                "hive:ROSE"
              ],
              "name": "Full Inspection: ROSE",
              "participants": [],
              "start": "2023-10-16T12:00:00.000Z"
            },
            {
              "eventId": "ZavT8DY9",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:ROSE",
                "job:INSPECT"
              ],
              "name": "Full Inspection: ROSE",
              "participants": [],
              "start": "2023-10-19T12:00:00.000Z"
            },
            {
              "eventId": "Q99vFTN4",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:ROSE",
                "job:INSPECT"
              ],
              "name": "Full Inspection: ROSE",
              "participants": [],
              "start": "2023-10-19T12:00:00.000Z"
            },
            {
              "eventId": "3Thz3DZW",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:ROSE",
                "job:INSPECT"
              ],
              "name": "Full Inspection: ROSE",
              "participants": [],
              "start": "2023-10-19T12:00:00.000Z"
            },
            {
              "eventId": "28UM1cHJ",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "job:INSPECT",
                "hive:ROSE"
              ],
              "name": "Full Inspection: ROSE",
              "participants": [],
              "start": "2023-10-19T12:00:00.000Z"
            },
            {
              "eventId": "QMW9TOYL",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "job:INSPECT",
                "hive:ROSE"
              ],
              "name": "Full Inspection: ROSE",
              "participants": [],
              "start": "2023-10-19T12:00:00.000Z"
            },
            {
              "eventId": "znDHtOy5",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "job:INSPECT",
                "hive:ROSE"
              ],
              "name": "Full Inspection: ROSE",
              "participants": [],
              "start": "2023-10-20T12:00:00.000Z"
            },
            {
              "eventId": "HGI87AxP",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "job:INSPECT",
                "hive:ROSE"
              ],
              "name": "Partial Inspection: ROSE",
              "participants": [],
              "start": "2023-10-20T12:00:00.000Z"
            },
            {
              "eventId": "3KpSlZHO",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "job:INSPECT",
                "hive:ROSE"
              ],
              "name": "Full Inspection: ROSE",
              "participants": [],
              "start": "2023-10-21T12:00:00.000Z"
            },
            {
              "eventId": "i9UxFigj",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "job:INSPECT",
                "hive:ROSE"
              ],
              "name": "Full Inspection: ROSE",
              "participants": [],
              "start": "2023-11-02T00:00:00.000Z"
            },
            {
              "eventId": "ZhAwTTj3",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "job:INSPECT",
                "hive:ROSE"
              ],
              "name": "Full Inspection: ROSE",
              "participants": [],
              "start": "2023-11-02T12:00:00.000Z"
            },
            {
              "eventId": "Qyuye0Lv",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:ROSE"
              ],
              "name": "#hive -ROSE - Décompte des varroas et traitement",
              "participants": [],
              "start": null
            },
            {
              "eventId": "VwZuv2S4",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:VIOLETTE"
              ],
              "name": "#hive LAVANDE - 18/06/2023: partial inspection",
              "participants": [],
              "start": null
            },
            {
              "eventId": "TJ5CAcfa",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:LAVANDE"
              ],
              "name": "#hive LAVANDE - 22/05/2023: inspection to check on the queen",
              "participants": [],
              "start": null
            },
            {
              "eventId": "cvTZNEEr",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:VIOLETTE"
              ],
              "name": "#hive LAVANDE- 10/06/2023: full inspection vérifier l'état de la ou les reines (hausse 1 et hausse 2).",
              "participants": [],
              "start": null
            },
            {
              "eventId": "vQBXXjON",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:LAVANDE"
              ],
              "name": "#hive Lavande 02/06/2023: Création d'un nucléi sur le dessus de Lavande pour y insérer une nouvelle reine",
              "participants": [],
              "start": null
            },
            {
              "eventId": "k39UB2Kv",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:ROSE"
              ],
              "name": "#hive ROSE - 02/06/2023: Order a new queen ASAP et introduire dans la ruche orpheline",
              "participants": [
                "626194d4c9873f601f82fd0f"
              ],
              "start": null
            },
            {
              "eventId": "65h7snpN",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:ROSE"
              ],
              "name": "#hive ROSE - 14/05/2023: partial inspection",
              "participants": [
                "626194d4c9873f601f82fd0f"
              ],
              "start": null
            },
            {
              "eventId": "Z1a6VB7r",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:ROSE"
              ],
              "name": "#hive ROSE - 19/05/2023: full inspection",
              "participants": [],
              "start": null
            },
            {
              "eventId": "2lrS4hyk",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:ROSE"
              ],
              "name": "#hive ROSE - 22/04/2023: partial inspection et MERGE ROSE",
              "participants": [],
              "start": null
            },
            {
              "eventId": "qP4Zp2MQ",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:ROSE"
              ],
              "name": "#hive ROSE - 28/04/2023: partial inspection ROSE",
              "participants": [],
              "start": null
            },
            {
              "eventId": "F3aSFokn",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:ROSE"
              ],
              "name": "#hive ROSE - 29/05/2023: full inspection",
              "participants": [
                "626194d4c9873f601f82fd0f"
              ],
              "start": null
            },
            {
              "eventId": "rkS22N3R",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:TOURNESOL"
              ],
              "name": "#hive TOURNESOL - 16/04/2023: full inspection",
              "participants": [],
              "start": null
            },
            {
              "eventId": "sPEkte4K",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:VIOLETTE"
              ],
              "name": "#hive VIOLETTE - 03/06/2023: partial inspection",
              "participants": [],
              "start": null
            },
            {
              "eventId": "cVZOmvRF",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:VIOLETTE"
              ],
              "name": "#hive VIOLETTE - 07/05/2023: partial inspection : divise or add box",
              "participants": [],
              "start": null
            },
            {
              "eventId": "8ALFue83",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:VIOLETTE"
              ],
              "name": "#hive VIOLETTE - 19/05/2023: full inspection",
              "participants": [],
              "start": null
            },
            {
              "eventId": "lccfibTP",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:VIOLETTE"
              ],
              "name": "#hive VIOLETTE - 19/06/2023: full inspection",
              "participants": [],
              "start": null
            },
            {
              "eventId": "U0Q4DYcH",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "hive:VIOLETTE"
              ],
              "name": "#hive VIOLETTE - 22/04/2023: full or partial inspection",
              "participants": [],
              "start": null
            },
            {
              "eventId": "I0hUHGSt",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "Éducation/Education",
                "Newbees"
              ],
              "name": "Atelier 1.A. Honey Bee Biology and Society",
              "participants": [],
              "start": null
            },
            {
              "eventId": "SOC3IuXy",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "Éducation/Education",
                "Newbees"
              ],
              "name": "Atelier 1.B. Beekeeping Equipment",
              "participants": [],
              "start": null
            },
            {
              "eventId": "WRuLGDaf",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "Éducation/Education",
                "Newbees"
              ],
              "name": "Atelier 2.A. Unwrapping the hives",
              "participants": [],
              "start": null
            },
            {
              "eventId": "fe5GvHe0",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "Éducation/Education",
                "Newbees"
              ],
              "name": "Atelier 2.B. The first full inspection",
              "participants": [],
              "start": null
            },
            {
              "eventId": "aeaHeuXy",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [],
              "name": "Check for disease when temperatures reach 10 degrees",
              "participants": [],
              "start": null
            },
            {
              "eventId": "9HWsFJ6I",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [],
              "name": "Check snow conditions on hive through winter",
              "participants": [],
              "start": null
            },
            {
              "eventId": "o3K7NprR",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "job:EQUIPMENT"
              ],
              "name": "Commande de matériel",
              "participants": [],
              "start": null
            },
            {
              "eventId": "t8mA0dw6",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [],
              "name": "First feeding/unwrapping hives",
              "participants": [],
              "start": null
            },
            {
              "eventId": "N33Qz2Ly",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [],
              "name": "Frequent partial inspections - swarm control *Reminder*",
              "participants": [],
              "start": null
            },
            {
              "eventId": "HtGe9m2N",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "Éducation/Education"
              ],
              "name": "Gabriel hive monitoring workshop on May 18 2023 (20 mins)",
              "participants": [],
              "start": null
            },
            {
              "eventId": "DhH4ikO8",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [],
              "name": "Gabriel's hive tracking system - Workshop #1",
              "participants": [],
              "start": null
            },
            {
              "eventId": "sHL0WnqP",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [],
              "name": "Install drone frame *Reminder*",
              "participants": [],
              "start": null
            },
            {
              "eventId": "ZJ1y51F6",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "job:EQUIPMENT"
              ],
              "name": "Install water source",
              "participants": [],
              "start": null
            },
            {
              "eventId": "qBxmQY4o",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "job:EQUIPMENT"
              ],
              "name": "Inventaire + clean-up",
              "participants": [],
              "start": null
            },
            {
              "eventId": "Uamm77pM",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [],
              "name": "Nourrissage printannier/Spring feeding (1:1)",
              "participants": [],
              "start": null
            },
            {
              "eventId": "x2iey5Gc",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "job:EQUIPMENT"
              ],
              "name": "One veil to repair and one suit to replace",
              "participants": [],
              "start": null
            },
            {
              "eventId": "DxK4TOJ5",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "job:EQUIPMENT"
              ],
              "name": "Order nucs and queens",
              "participants": [],
              "start": null
            },
            {
              "eventId": "Qb7iccfF",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [],
              "name": "Remove tiroir apinovar *Reminder*",
              "participants": [],
              "start": null
            },
            {
              "eventId": "qSHk0Hke",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "job:EQUIPMENT"
              ],
              "name": "Rendre beeswax into blocks",
              "participants": [],
              "start": null
            },
            {
              "eventId": "fVIZRdhL",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [],
              "name": "Rotate old frames *Reminder*",
              "participants": [],
              "start": null
            },
            {
              "eventId": "z3eRxVxE",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "job:EQUIPMENT"
              ],
              "name": "Spring Cleaning (Frames)",
              "participants": [],
              "start": null
            },
            {
              "eventId": "qSxNX6r9",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [
                "job:EQUIPMENT"
              ],
              "name": "Spring Cleaning (Suits)",
              "participants": [],
              "start": null
            },
            {
              "eventId": "BO1UgZbX",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [],
              "name": "The first visit - unwrapping and checking on the hives",
              "participants": [],
              "start": null
            },
            {
              "eventId": "KXyzMagq",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [],
              "name": "Trello update and discussion",
              "participants": [],
              "start": null
            },
            {
              "eventId": "jwdaucxR",
              "idList": "64da66bfdfc9d4cfe0c97b0e",
              "labels": [],
              "name": "Varroa count and treatment - Violette",
              "participants": [],
              "start": null
            }
          ],
      
          "inProgress": [
            {
              "eventId": "KsXq7S0R",
              "idList": "626194dbe7010d258db382cd",
              "labels": [
                "hive:TOURNESOL",
                "job:INSPECT"
              ],
              "name": "#hive Tournesol - 15-19/08/2023: full/partial inspection",
              "participants": [
                "626194d4c9873f601f82fd0f",
                "64df9d1a033d3f5a90e76b9e",
                "64389a7ea19830af9c915dd9"
              ],
              "start": "2023-08-20T18:49:00.000Z"
            },
            {
              "eventId": "Bziq481c",
              "idList": "626194dbe7010d258db382cd",
              "labels": [
                "hive:ROSE",
                "job:INSPECT"
              ],
              "name": "#hive ROSE - 15-19/08/2023 Partial inspection",
              "participants": [
                "626194d4c9873f601f82fd0f"
              ],
              "start": "2023-08-25T21:54:00.000Z"
            },
            {
              "eventId": "zDQMIfjK",
              "idList": "626194dbe7010d258db382cd",
              "labels": [],
              "name": "test2",
              "participants": [],
              "start": null
            }
          ],
          "completed": [
            {
              "eventId": "w8u8BQCL",
              "idList": "64beb3f0205aede5e00af059",
              "labels": [
                "hive:ROSE",
                "job:INSPECT",
                "job:HARVEST"
              ],
              "name": "newName",
              "participants": [
                "626194d4c9873f601f82fd0f"
              ],
              "start": "2023-07-24T16:04:00.000Z"
            },
            {
              "eventId": "0lgUFzPZ",
              "idList": "64beb3f0205aede5e00af059",
              "labels": [
                "hive:VIOLETTE",
                "job:INSPECT"
              ],
              "name": "#hive [violette] Aout 12 full inspection",
              "participants": [
                "626194d4c9873f601f82fd0f"
              ],
              "start": "2023-08-12T17:00:00.000Z"
            },
            {
              "eventId": "764VvreH",
              "idList": "64beb3f0205aede5e00af059",
              "labels": [
                "hive:ROSE",
                "job:INSPECT"
              ],
              "name": "ROSE - 30/07/2023 : partial inspection",
              "participants": [
                "64df9d1a033d3f5a90e76b9e"
              ],
              "start": "2023-08-18T15:00:00.000Z"
            },
            {
              "eventId": "pBXYJrHz",
              "idList": "64beb3f0205aede5e00af059",
              "labels": [
                "job:INSPECT",
                "hive:ROSE"
              ],
              "name": "Full Inspection: ROSE",
              "participants": [
                "626194d4c9873f601f82fd0f"
              ],
              "start": "2023-10-19T07:00:00.000Z"
            },
            {
              "eventId": "hp11wDiI",
              "idList": "64beb3f0205aede5e00af059",
              "labels": [
                "hive:ROSE",
                "job:INSPECT"
              ],
              "name": "CYPRESS E2E",
              "participants": [
                "626194d4c9873f601f82fd0f"
              ],
              "start": "2023-10-19T11:00:00.000Z"
            },
            {
              "eventId": "fQQg66tl",
              "idList": "64beb3f0205aede5e00af059",
              "labels": [
                "job:INSPECT",
                "hive:ROSE"
              ],
              "name": "Partial Inspection: ROSE",
              "participants": [
                "626194d4c9873f601f82fd0f"
              ],
              "start": "2023-10-20T12:00:00.000Z"
            },
            {
              "eventId": "YBo0WGxr",
              "idList": "64beb3f0205aede5e00af059",
              "labels": [
                "job:INSPECT",
                "hive:ROSE"
              ],
              "name": "#hive [Rose] Aout 13 full inspection",
              "participants": [
                "626194d4c9873f601f82fd0f"
              ],
              "start": "2023-10-23T17:00:00.000Z"
            },
            {
              "eventId": "BOBg3l3d",
              "idList": "64beb3f0205aede5e00af059",
              "labels": [],
              "name": "inspection",
              "participants": [],
              "start": null
            }
          ]
      
        },
        "COLLECTIVE": {
          "completed": [],
          "unassigned": [],
          "inProgress": []
        }
      
      };
      
  const accordionItems = ( Object.keys( demoAgenda ) as Array<keyof typeof demoAgenda> ).map( ( category ) => (

    <Accordion key={category}>
      <Accordion.Item id={`agenda-category-${category}`} value={`${category}`}>
        <Accordion.Control>{category}</Accordion.Control>
        <Accordion.Panel>
          <Accordion>
            {Object.keys( demoAgenda[category] as Category ).map( ( subCategory, subIndex: number ) => (
              <Accordion.Item
                id={`agenda-subcategory-${category}-${subIndex}`}
                value={`${subIndex}`}
                key={`${subIndex}`}
              >
                <Accordion.Control>{subCategory}</Accordion.Control>
                <Accordion.Panel>
                  {demoAgenda[category][subCategory].map( ( event, eventIndex: number ) => (
                    <Accordion.Item
                      id={`agenda-event-${category}-${subCategory}-${eventIndex}`}
                      value={`${eventIndex}`}
                      key={`${eventIndex}`}
                    >
                      <Accordion.Control>{event.name}</Accordion.Control>
                      <Accordion.Panel>
                        <TaskForm task={event} />
                      </Accordion.Panel>
                    </Accordion.Item>
                  ) )}
                </Accordion.Panel>
              </Accordion.Item>
            ) )}
          </Accordion>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>

  ) );

  return (
    <Accordion className='overflow-scroll max-h-96'>
      {accordionItems}
    </Accordion>
  );
};

export default MeetingAgenda;


