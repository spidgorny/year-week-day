import { Repository } from "@lib/pg/repository.ts";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { EditEventPane } from "@/app/[userId]/[year]/new-event.tsx";
import { IEvent } from "@components/TBodySelection.tsx";

export default async function EventList({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const repo = await Repository.init(userId);
  const events = await repo.fetchEvents();
  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Event name</th>
          </tr>
        </thead>
        <tbody>
          {events.map((x) => (
            <tr key={x.id}>
              <td>
                <EditEventPane
                  userId={userId}
                  event={x.toJSON() as unknown as IEvent}
                />
              </td>
              <td>{new Date(x.startDate).toISOString().substring(0, 10)}</td>
              <td>{new Date(x.endDate).toISOString().substring(0, 10)}</td>
              <td>{x.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
