//イベントcategory1

import EventList from "@components/EventList";

export const AllEventList = ({ route }) => {
  const { events } = route.params;

  return <EventList items={events} />;
};

export const EventList1 = ({ route }) => {
  const { category1 } = route.params;

  return <EventList items={category1} />;
};

export const EventList2 = ({ route }) => {
  const { category2 } = route.params;

  return <EventList items={category2} />;
};

export const EventList3 = ({ route }) => {
  const { category3 } = route.params;

  return <EventList items={category3} />;
};
