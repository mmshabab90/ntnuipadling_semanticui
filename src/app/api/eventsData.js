import cuid from "cuid";

export const eventsData = [
  {
    id: "5f77005ffc13ae2559000014",
    created_at: "2019-11-27 00:56:09",
    start_date_time: new Date("2020-08-25"),
    end_date_time: new Date("2020-08-25"),
    name: "GoldenEye",
    description: "blah blah",
    signed_participants: 6,
    total_participants: 10,
    status: "false",
    category: "film",
    hosted_by: "User_1",
    hostPhotoURL:
      "https://picsum.photos/id/" +
      Math.floor(Math.random() * 50 + 1) +
      "/200/300",
    city: "Trondheim",
    venue: "Trondheim",
    attendees: [
      {
        id: cuid(),
        displayName: "User_3",
        photoURL:
          "https://picsum.photos/id/" +
          Math.floor(Math.random() * 50 + 1) +
          "/200/300",
      },
      {
        id: cuid(),
        displayName: "User_2",
        photoURL:
          "https://picsum.photos/id/" +
          Math.floor(Math.random() * 50 + 1) +
          "/200/300",
      },
      {
        id: cuid(),
        displayName: "User_4",
        photoURL:
          "https://picsum.photos/id/" +
          Math.floor(Math.random() * 50 + 1) +
          "/200/300",
      },
    ],
  },
  {
    id: "5f77005ffc13ae2559000015",
    created_at: "2020-06-24 14:26:39",
    start_date_time: new Date("2020-08-27"),
    end_date_time: new Date("2020-08-29"),
    name: "Loose Change: Second Edition",
    description: "blah blah blah blah blah blah blah",
    signed_participants: 19,
    total_participants: 24,
    status: "true",
    category: "travel",
    hosted_by: "User_2",
    hostPhotoURL:
      "https://picsum.photos/id/" +
      Math.floor(Math.random() * 50 + 1) +
      "/200/300",
    city: "Oslo",
    venue: "Oslo",
    attendees: [
      {
        id: cuid(),
        displayName: "User_3",
        photoURL:
          "https://picsum.photos/id/" +
          Math.floor(Math.random() * 50 + 1) +
          "/200/300",
      },
    ],
  },
  // {
  //   id: "5f77005ffc13ae2559000016",
  //   created_at: "2020-09-11 05:09:37",
  //   start_date: "2020-08-25 22:32:20",
  //   end_date: "2020-08-25 22:32:20 UTC",
  //   name: "Death Warrant",
  //   signed_participants: 4,
  //   total_participants: 9,
  //   status: true,
  //   start_time: "9:15:27",
  //   end_time: "10:15:27",
  // },
  // {
  //   id: "5f77005ffc13ae2559000017",
  //   created_at: "2020-04-25 16:36:24",
  //   start_date: "2020-06-02 19:03:00",
  //   end_date: "2020-06-02 19:03:00 UTC",
  //   name: "Second Wind (Le deuxième souffle) (Second Breath)",
  //   signed_participants: 20,
  //   total_participants: 21,
  //   status: true,
  //   start_time: "20:52:29",
  //   end_time: "21:52:29",
  // },
  // {
  //   id: "5f77005ffc13ae2559000018",
  //   created_at: "2020-02-18 01:41:10",
  //   start_date: "2020-01-09 11:41:23",
  //   end_date: "2020-01-09 11:41:23 UTC",
  //   name: "Bad Boy (Story of Danny Lester, The)",
  //   signed_participants: 1,
  //   total_participants: 4,
  //   status: true,
  //   start_time: "7:26:22",
  //   end_time: "08:26:22",
  // },
  // {
  //   id: "5f77005ffc13ae2559000019",
  //   created_at: "2020-01-20 13:07:05",
  //   start_date: "2020-02-21 14:59:35",
  //   end_date: "2020-02-22 14:59:35 UTC",
  //   name: "Strange Bedfellows",
  //   signed_participants: 7,
  //   total_participants: 11,
  //   status: true,
  //   start_time: "0:42:18",
  //   end_time: "01:42:18",
  // },
  // {
  //   id: "5f77005ffc13ae255900001a",
  //   created_at: "2020-01-05 23:00:05",
  //   start_date: "2020-03-26 13:30:09",
  //   end_date: "2020-03-27 13:30:09 UTC",
  //   name: "Closing the Ring",
  //   signed_participants: 1,
  //   total_participants: 5,
  //   status: true,
  //   start_time: "3:47:15",
  //   end_time: "04:47:15",
  // },
  // {
  //   id: "5f77005ffc13ae255900001b",
  //   created_at: "2019-12-14 18:04:11",
  //   start_date: "2020-03-17 09:04:56",
  //   end_date: "2020-03-18 09:04:56 UTC",
  //   name: "Beautiful Creatures",
  //   signed_participants: 3,
  //   total_participants: 7,
  //   status: false,
  //   start_time: "3:30:07",
  //   end_time: "04:30:07",
  // },
  // {
  //   id: "5f77005ffc13ae255900001c",
  //   created_at: "2020-05-31 06:39:22",
  //   start_date: "2020-06-11 20:06:15",
  //   end_date: "2020-06-11 20:06:15 UTC",
  //   name: "Milius",
  //   signed_participants: 5,
  //   total_participants: 9,
  //   status: false,
  //   start_time: "2:11:06",
  //   end_time: "03:11:06",
  // },
  // {
  //   id: "5f77005ffc13ae255900001d",
  //   created_at: "2020-07-02 21:44:27",
  //   start_date: "2019-12-13 10:31:19",
  //   end_date: "2019-12-14 10:31:19 UTC",
  //   name: "Killing Me Softly",
  //   signed_participants: 18,
  //   total_participants: 20,
  //   status: false,
  //   start_time: "13:26:03",
  //   end_time: "14:26:03",
  // },
];
