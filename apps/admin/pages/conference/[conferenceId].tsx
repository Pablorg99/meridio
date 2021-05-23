import { useRouter } from 'next/dist/client/router';

export default function ViewConference() {
  const router = useRouter();
  const { conferenceId } = router.query;

  return <h1>View page for conference with id: {conferenceId}</h1>;
}
