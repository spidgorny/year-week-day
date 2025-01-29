import { Alert } from "react-bootstrap";

export function ErrorAlert(props: { error?: Error }) {
  if (!props.error) {
    return null;
  }
  return <Alert variant="danger">{props.error.message}</Alert>;
}
