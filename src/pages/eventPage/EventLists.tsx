//イベントcategory1

import EventList from "@components/EventList";

export const AllEventList = ({ route }) => {
  const { events } = route.params;

  return <EventList items={events} bg={require("@assets/images/logo_3.png")} />;
};

export const EventList1 = ({ route }) => {
  const { category1 } = route.params;

  return (
    <EventList items={category1} bg={require("@assets/images/pokemon.png")} />
  );
};

export const EventList2 = ({ route }) => {
  const { category2 } = route.params;

  return <EventList items={category2} bg={require("@assets/images/gon.png")} />;
};

export const EventList3 = ({ route }) => {
  const { category3 } = route.params;

  return (
    <EventList items={category3} bg={require("@assets/images/singeki.png")} />
  );
};
